import { Injectable } from '@nestjs/common';
import { CampaignsService } from './campaign/campaign.service'; // Adjust the import path as necessary
import { InfluencerService } from './influencer/influencer.service'; // Adjust the import path as necessary
import { SubmissionService } from './submission/submission.service'; // Adjust the import path as necessary
import { CreateSubmissionDto } from './submission/dto/create-submission.dto'; // Adjust the import path as necessary

@Injectable()
export class AppService {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly influencerService: InfluencerService,
    private readonly submissionService: SubmissionService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllCampaigns() {
    return this.campaignsService.findAll();
  }

  async getCampaignById(id: string) {
    return this.campaignsService.findOne(id);
  }

  async approveCampaign(id: string, approved: boolean) {
    return this.campaignsService.approveSubmission(id, approved);
  }

  async getCampaignsByInfluencer(influencerId: string) {
    return this.influencerService.getCampaignsByInfluencer(influencerId);
  }

  async submitCampaignContent(influencerId: string, campaignId: string, submissionUrl: string) {
    return this.influencerService.submitCampaignContent(influencerId, campaignId, submissionUrl);
  }

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.create(createSubmissionDto);
  }

  async addInfluencerToCampaign(influencerId: string, campaignId: string) {
    return this.influencerService.addInfluencerToCampaign(influencerId, campaignId);
  }

  
  async createInfluencer(name: string, email: string) {
    return this.influencerService.createInfluencer(name, email);
  }
  
  async getAllInfluencers() {
    return this.influencerService.getAllInfluencers();
  }
}