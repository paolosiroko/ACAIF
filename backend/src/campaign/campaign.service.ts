import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from '../mongo.service';
import { ObjectId } from 'mongodb'; 

@Injectable()
export class CampaignsService {
  constructor(private readonly mongoService: MongoService) {}

  private getCollection() {
    return this.mongoService.getDb().collection('campaign');
  }

  async findAll() {
    return this.getCollection().find().toArray();
  }

  async findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid campaign ID: ${id}`);
    }

    const campaign = await this.getCollection().findOne({ _id: new ObjectId(id) });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async approveSubmission(id: string, approved: boolean) {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid campaign ID: ${id}`);
    }

    const result = await this.getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { approved } }
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return { message: `Campaign ${id} approval status updated successfully` };
  }
}
