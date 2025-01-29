import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InfluencerService } from './influencer.service';

@Controller('/api/influencers')
export class InfluencerController {
  constructor(private readonly influencerService: InfluencerService) {}

  @Post()
  async createInfluencer(
    @Body('name') name: string,
    @Body('email') email: string
  ) {
    return await this.influencerService.createInfluencer(name, email);
  }

  @Post(':influencerId/join/:campaignId')
  async joinCampaign(
    @Param('influencerId') influencerId: string,
    @Param('campaignId') campaignId: string
  ) {
    return await this.influencerService.addInfluencerToCampaign(influencerId, campaignId);
  }

  @Get()
  async getAllInfluencers() {
    return this.influencerService.getAllInfluencers();
  }

  // Endpoint to get all campaigns joined by an influencer
  @Get(':id/campaigns')
  async getCampaigns(@Param('id') influencerId: string) {
    return await this.influencerService.getCampaignsByInfluencer(influencerId);
  }

  // Endpoint to submit content for a campaign
  @Post(':id/campaigns/:campaignId/submit')
  async submitCampaignContent(
    @Param('id') influencerId: string,
    @Param('campaignId') campaignId: string,
    @Body('submissionUrl') submissionUrl: string,
  ) {
    return await this.influencerService.submitCampaignContent(
      influencerId,
      campaignId,
      submissionUrl,
    );
  }
}
