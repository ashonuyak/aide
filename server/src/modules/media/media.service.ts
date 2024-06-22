import sharp from 'sharp';
import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class MediaService {
	private logger = new Logger(MediaService.name);

	constructor(private storageService: StorageService) {}

	async uploadMedia(file: Express.Multer.File, mediaName?: string): Promise<string> {
		const mediaId = mediaName || file.originalname;

		try {
			const compressedBuffer = await sharp(file.buffer)
				.webp({ quality: 80 })
				.toBuffer();

			return await this.storageService.save(
				'uploads/' + mediaId,
				file.mimetype,
				compressedBuffer,
				[{ mediaId }]
			);
		} catch (error) {
			this.logger.error('Failed to compress and upload the file:', error);
			throw new Error('Failed to compress and upload the file');
		}
	}
}
