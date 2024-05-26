import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthSession } from 'src/common/decorators/session.decorator';
import { ParseJsonInterceptor } from 'src/common/interceptors/parse-json.interceptor';
import { Session } from 'src/common/interfaces/session.interface';
import { ParamObjectIdPipe } from 'src/common/pipes/param-object-id.pipe';
import { Role } from '../auth/enums/roles.enum';
import { CampaignService } from './campaign.service';
import { CampaignResponseDto } from './dtos/campaign-response.dto';
import { CreateCampaignFilesDto } from './dtos/create-campaign-files.dto';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { DeleteCampaignDto } from './dtos/delete-campaign.dto';
import { FundraiserCampaignResponseDto } from './dtos/fundraiser-campaign-response.dto';
import { UpdateCampaignFilesDto } from './dtos/update-campaign-files.dto';
import { UpdateCampaignStatusDto } from './dtos/update-campaign-status.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignStatus } from './enums/campaign-status.enum';

@Controller('campaign')
export class CampaignController {
	logger = new Logger(CampaignController.name);

	constructor(private readonly campaignService: CampaignService) {}

	@Post()
	@Roles(Role.Fundraiser)
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'mainImage', maxCount: 1 },
			{ name: 'media', maxCount: 100 },
			{ name: 'qrCode', maxCount: 1 },
			{ name: 'body', maxCount: 1 }
		]),
		ParseJsonInterceptor
	)
	async createCampaign(
		@AuthSession() session: Session,
		@UploadedFiles() files: CreateCampaignFilesDto,
		@Body() body: CreateCampaignDto
	): Promise<FundraiserCampaignResponseDto> {
		try {
			return await this.campaignService.create(files, body, session.userId);
		} catch (error) {
			console.error('Failed to create campaign:', error);
			throw new HttpException('Failed to create campaign', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Patch()
	@Roles(Role.Fundraiser)
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'mainImage', maxCount: 1 },
			{ name: 'media', maxCount: 100 },
			{ name: 'qrCode', maxCount: 1 },
			{ name: 'body', maxCount: 1 }
		]),
		ParseJsonInterceptor
	)
	async updateCampaign(
		@AuthSession() session: Session,
		@UploadedFiles() files: UpdateCampaignFilesDto,
		@Body() body: UpdateCampaignDto
	) {
		try {
			return await this.campaignService.update(files, body, session.userId);
		} catch (error) {
			console.error('Failed to update campaign:', error);
			throw new HttpException('Failed to update campaign', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('/fundraiser')
	@Roles(Role.Fundraiser)
	getMyCampaigns(
		@AuthSession() session: Session,
		@Query('search') search?: string,
		@Query('status') status?: string
	): Promise<FundraiserCampaignResponseDto[]> {
		return this.campaignService.find({
			fundraiserId: session.userId,
			...(status ? { status } : { status: { $ne: CampaignStatus.Deleted } }),
			$or: [
				{
					title: { $regex: search, $options: 'i' }
				},
				{
					subtitle: { $regex: search, $options: 'i' }
				},
				{
					description: { $regex: search, $options: 'i' }
				}
			]
		});
	}

	@Get('/handle')
	getCampaignsByCategoryHandle(
		@Query('category-handle') categoryHandle: string,
		@Query('search') search?: string
	): Promise<CampaignResponseDto[]> {
		return this.campaignService.findByCategoryHandle(
			{
				status: CampaignStatus.Active,
				$or: [
					{
						title: { $regex: search, $options: 'i' }
					},
					{
						subtitle: { $regex: search, $options: 'i' }
					},
					{
						description: { $regex: search, $options: 'i' }
					}
				]
			},
			categoryHandle
		);
	}

	@Get()
	getCampaignById(@Query('id') _id: string): Promise<CampaignResponseDto> {
		return this.campaignService.findById(new ObjectId(_id));
	}

	@Delete()
	@Roles(Role.Fundraiser)
	deleteCampaign(@Body() { _id }: DeleteCampaignDto) {
		return this.campaignService.updateStatus({ _id }, CampaignStatus.Deleted);
	}

	@Patch('/postman')
	updateCampaigns(@Body() body: any) {
		return this.campaignService.updateMany(body.filter, body.payload);
	}

	@Patch('/status')
	@Roles(Role.Fundraiser)
	updateCampaignStatus(@Body() { _id, status }: UpdateCampaignStatusDto) {
		return this.campaignService.updateStatus({ _id }, status);
	}

	@Get('/all')
	@Roles(Role.Admin)
	getAllCampaigns(@Query('search') search: string): Promise<FundraiserCampaignResponseDto[]> {
		return this.campaignService.find({
			$or: [
				{
					title: { $regex: search, $options: 'i' }
				},
				{
					subtitle: { $regex: search, $options: 'i' }
				},
				{
					description: { $regex: search, $options: 'i' }
				}
			]
		});
	}
}
