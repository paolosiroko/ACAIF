import { Module } from '@nestjs/common';
import { CampaignsController } from './campaign.controller';
import { CampaignsService } from './campaign.service';
import { MongoService } from '../mongo.service'; // Ensure MongoService is provided
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, MongoService], // Ensure MongoService is included as a provider
  exports: [CampaignsService], // Export if needed in other modules
})
export class CampaignsModule {}
