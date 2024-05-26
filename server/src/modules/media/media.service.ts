import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class MediaService {
	constructor(private storageService: StorageService) {}

	uploadMedia(file: Express.Multer.File, mediaName?: string) {
		const mediaId = mediaName || file.originalname;

		return this.storageService.save('uploads/' + mediaId, file.mimetype, file.buffer, [
			{ mediaId }
		]);
	}
}
