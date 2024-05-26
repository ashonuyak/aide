export class CreateCampaignFilesDto {
	readonly mainImage!: Express.Multer.File[];
	readonly media?: Express.Multer.File[];
    readonly qrCode?: Express.Multer.File[];
}
