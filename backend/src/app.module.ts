import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CampaignsModule } from './campaign/campaign.module'; 
import { InfluencerModule } from './influencer/influencer.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [CampaignsModule, InfluencerModule, SubmissionModule],
  providers: [AppService],
})
export class AppModule {}
