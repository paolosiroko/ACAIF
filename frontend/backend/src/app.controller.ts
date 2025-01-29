import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSubmissionDto } from './submission/dto/create-submission.dto'; // Adjust the import path as necessary

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/campaigns')
  async getAllCampaigns() {
    return this.appService.getAllCampaigns();
  }

  @Get('/api/campaigns/:id')
  async getCampaign(@Param('id') id: string) {
    return this.appService.getCampaignById(id);
  }

  @Patch('/api/campaigns/:id/approve')
  async approveCampaign(@Param('id') id: string, @Body('approved') approved: boolean) {
    return this.appService.approveCampaign(id, approved);
  }

  @Get('/api/influencers')
  async getAllInfluencers() {
    return this.appService.getAllInfluencers();
  }

  @Get('/api/influencers/:id/campaigns')
  async getCampaignsByInfluencer(@Param('id') influencerId: string) {
    return this.appService.getCampaignsByInfluencer(influencerId);
  }

  @Post('/api/influencers/:influencerId/join/:campaignId')
  async joinCampaign(
    @Param('influencerId') influencerId : string,
    @Param('campaignId') campaignId: string
  ) {
    return this.appService.addInfluencerToCampaign(influencerId, campaignId);
  }

  @Post('/api/influencers/:id/campaigns/:campaignId/submit')
  async submitCampaignContent(
    @Param('id') influencerId: string,
    @Param('campaignId') campaignId: string,
    @Body('submissionUrl') submissionUrl: string,
  ) {
    return this.appService.submitCampaignContent(influencerId, campaignId, submissionUrl);
  }

  @Post('/api/submissions')
  async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.appService.createSubmission(createSubmissionDto);
  }

  @Post('/api/influencers')
  async createInfluencer(@Body('name') name: string, @Body('email') email: string) {
    return this.appService.createInfluencer(name, email);
  }
}