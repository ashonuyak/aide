import { Injectable, Logger } from '@nestjs/common';

import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { MediaService } from '../media/media.service';
import { CampaignRepository } from './campaign.repository';
import { CampaignDocument } from './campaign.schema';
import { CampaignResponseDto } from './dtos/campaign-response.dto';
import { CreateCampaignFilesDto } from './dtos/create-campaign-files.dto';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignFilesDto } from './dtos/update-campaign-files.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignStatus } from './enums/campaign-status.enum';

@Injectable()
export class CampaignService {
	logger = new Logger(CampaignService.name);

	constructor(
		private readonly campaignRepository: CampaignRepository,
		private readonly mediaService: MediaService,
		private readonly categoryService: CategoryService
	) {}

	async create(
		files: CreateCampaignFilesDto,
		body: CreateCampaignDto,
		fundraiserId: ObjectId
	): Promise<CampaignDocument> {
		const mainImagePromise = this.mediaService.uploadMedia(files.mainImage[0]);
		const mediaPromises = files.media
			? Promise.all(files.media.map((file) => this.mediaService.uploadMedia(file)))
			: Promise.resolve([]);
		const qrCodePromise = files.qrCode
			? this.mediaService.uploadMedia(files.qrCode[0])
			: Promise.resolve(null);

		const [mainImage, media, qrCode] = await Promise.all([
			mainImagePromise,
			mediaPromises,
			qrCodePromise
		]);

		return this.campaignRepository.create({
			...body,
			mainImage,
			media,
			qrCode,
			fundraiserId
		});
	}

	async update(
		files: UpdateCampaignFilesDto,
		{ _id, ...body }: UpdateCampaignDto,
		fundraiserId: ObjectId
	) {
		const mainImagePromise = files.mainImage
			? this.mediaService.uploadMedia(files.mainImage[0])
			: Promise.resolve(null);
		const mediaPromises = files.media
			? Promise.all(files.media.map((file) => this.mediaService.uploadMedia(file)))
			: Promise.resolve([]);
		const qrCodePromise = files.qrCode
			? this.mediaService.uploadMedia(files.qrCode[0])
			: Promise.resolve(null);

		const [mainImage, media, qrCode] = await Promise.all([
			mainImagePromise,
			mediaPromises,
			qrCodePromise
		]);

		return this.campaignRepository.updateOne(
			{ _id },
			{
				...body,
				fundraiserId,
				...(mainImage && { mainImage }),
				...(media && { media }),
				...(qrCode && { qrCode })
			}
		);
	}

	find(filter: FilterQuery<CampaignDocument>) {
		const $lookup = {
			from: 'user',
			let: { fundraiserId: '$fundraiserId' },
			pipeline: [
				{
					$match: {
						$expr: { $eq: ['$_id', '$$fundraiserId'] }
					}
				},
				{
					$project: {
						firstName: 1,
						lastName: 1,
						avatarUrl: 1,
						username: 1,
						email: 1
					}
				}
			],
			as: 'fundraiser'
		};

		const $unwind = '$fundraiser';

		return this.campaignRepository.aggregate<CampaignResponseDto>([
			{ $match: filter },
			{ $lookup },
			{ $unwind },
			{ $sort: { updatedAt: -1 } }
		]);
	}

	async findByCategoryHandle(filter: FilterQuery<CampaignDocument>, categoryHandle: string) {
		const $lookup = {
			from: 'user',
			let: { fundraiserId: '$fundraiserId' },
			pipeline: [
				{
					$match: {
						$expr: { $eq: ['$_id', '$$fundraiserId'] }
					}
				},
				{
					$project: {
						firstName: 1,
						lastName: 1,
						avatarUrl: 1,
						username: 1,
						email: 1
					}
				}
			],
			as: 'fundraiser'
		};

		const $unwind = '$fundraiser';

		if (!categoryHandle)
			return this.campaignRepository.aggregate<CampaignResponseDto>([
				{ $match: filter },
				{ $lookup },
				{ $unwind }
			]);

		const category = await this.categoryService.findOne({ handle: categoryHandle });

		if (!category)
			return this.campaignRepository.aggregate<CampaignResponseDto>([
				{ $match: filter },
				{ $lookup },
				{ $unwind }
			]);

		return this.campaignRepository.aggregate<CampaignResponseDto>([
			{ $match: { ...filter, categoryId: category._id } },
			{ $lookup },
			{ $unwind }
		]);
	}

	async findById(_id: ObjectId) {
		const $lookup = {
			from: 'user',
			let: { fundraiserId: '$fundraiserId' },
			pipeline: [
				{
					$match: {
						$expr: { $eq: ['$_id', '$$fundraiserId'] }
					}
				},
				{
					$project: {
						firstName: 1,
						lastName: 1,
						avatarUrl: 1,
						username: 1,
						email: 1,
						createdAt: 1
					}
				}
			],
			as: 'fundraiser'
		};

		const $unwind = '$fundraiser';

		const [campaign] = await this.campaignRepository.aggregate<CampaignResponseDto>([
			{ $match: { _id, status: CampaignStatus.Active } },
			{ $lookup },
			{ $unwind }
		]);

		const closedCampaignsCount = await this.campaignRepository.countDocuments({
			fundraiserId: campaign.fundraiserId,
			status: CampaignStatus.Closed
		});

		return { ...campaign, closedCampaignsCount };
	}

	updateMany(filter: any, payload: any) {
		return this.campaignRepository.updateMany(filter, payload);
	}

	updateStatus(filter: FilterQuery<CampaignDocument>, status: CampaignStatus) {
		return this.campaignRepository.updateOne(filter, { status });
	}

	block(_id: any) {
		return this.campaignRepository.updateOne({ _id }, { blocked: true });
	}

	unblock(_id: any) {
		return this.campaignRepository.updateOne({ _id }, { blocked: false });
	}

	async getTopCampaigns() {
		
	}
}
