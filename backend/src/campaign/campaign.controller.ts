import { Controller, Get, Param, Patch, Body, BadRequestException } from '@nestjs/common';
import { CampaignsService } from './campaign.service';

@Controller('/api/campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async getCampaigns() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id/approve')
  async approveSubmission(@Param('id') id: string, @Body() body: { approved?: boolean }) {
    if (typeof body.approved !== 'boolean') {
      throw new BadRequestException('Invalid "approved" value. Expected a boolean.');
    }
    
    return this.campaignsService.approveSubmission(id, body.approved);
  }
}
