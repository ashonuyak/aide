import { Body, Controller, Delete, Logger } from '@nestjs/common';

import { DeleteCampaignDto } from '../campaign/dtos/delete-campaign.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
	logger = new Logger(SessionController.name);

	constructor(private readonly sessionService: SessionService) {}

    @Delete('/all')
    clearAllUserSessions(@Body() { _id }: DeleteCampaignDto) {
        return this.sessionService.deleteMany({ userId: _id });
    }

}
