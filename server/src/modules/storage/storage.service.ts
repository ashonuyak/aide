import { DownloadResponse, Storage } from '@google-cloud/storage';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageFile } from './classes/storage-file.class';

@Injectable()
export class StorageService {
	logger = new Logger(StorageService.name);

	private storage: Storage;
	private bucket: string;

	constructor(private configService: ConfigService) {
		this.storage = new Storage({
			projectId: this.configService.get('google-cloud-storage.project_id'),
			credentials: {
				client_email: this.configService.get('google-cloud-storage.client_email'),
				private_key: this.configService.get('google-cloud-storage.private_key').split(String.raw`\n`).join('\n')
			}
		});

		this.bucket = this.configService.get<string>('google-cloud-storage.media_bucket') || '';
	}

	async save(
		path: string,
		contentType: string,
		media: Buffer,
		metadata: { [key: string]: string }[]
	): Promise<string> {
		const bucket = this.storage.bucket(this.bucket);
		const file = bucket.file(path);

		try {
			await file.save(media, {
				metadata: {
					contentType: contentType,
					metadata: metadata.reduce((obj, item) => Object.assign(obj, item), {})
				}
			});

			return `https://storage.googleapis.com/${this.bucket}/${path}`;
		} catch (error) {
			this.logger.error('Failed to upload the file:', error);
			throw new Error('Failed to upload the file to Google Cloud Storage');
		}
	}

	async delete(path: string) {
		await this.storage.bucket(this.bucket).file(path).delete({ ignoreNotFound: true });
	}

	async get(path: string): Promise<StorageFile> {
		const fileResponse: DownloadResponse = await this.storage
			.bucket(this.bucket)
			.file(path)
			.download();
		const [buffer] = fileResponse;
		const storageFile = new StorageFile();
		storageFile.buffer = buffer;
		storageFile.metadata = new Map<string, string>();
		return storageFile;
	}

	async getWithMetaData(path: string): Promise<StorageFile> {
		const [metadata] = await this.storage.bucket(this.bucket).file(path).getMetadata();
		const fileResponse: DownloadResponse = await this.storage
			.bucket(this.bucket)
			.file(path)
			.download();
		const [buffer] = fileResponse;

		const storageFile = new StorageFile();
		storageFile.buffer = buffer;
		storageFile.metadata = new Map<string, string>(
			Object.entries(metadata || {}).map(([k, v]) => [k, String(v)])
		);
		storageFile.contentType = storageFile.metadata.get('contentType');
		return storageFile;
	}
}
