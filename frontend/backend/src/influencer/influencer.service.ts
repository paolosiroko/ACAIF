import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from '../mongo.service'; // Adjust the import path as necessary
import { ObjectId } from 'mongodb';

@Injectable()
export class InfluencerService {
  constructor(private readonly mongoService: MongoService) {}

  private getCollection() {
    return this.mongoService.getDb().collection('influencer'); // Ensure this matches your MongoDB collection name
  }

  // Create a new influencer
  async createInfluencer(name: string, email: string) {
    const newInfluencer = {
      name,
      email,
      campaigns: [],
      submissions: [],
    };

    const result = await this.getCollection().insertOne(newInfluencer);
    
    if (!result.insertedId) {
      throw new Error('Failed to create influencer');
    }

    return { message: 'Influencer created successfully', influencerId: result.insertedId };
  }

  // Add influencer to a campaign
  async addInfluencerToCampaign(influencerId: string, campaignId: string) {
    if (!ObjectId.isValid(influencerId)) {
      throw new NotFoundException(`Invalid influencer ID: ${influencerId}`);
    }

    const result = await this.getCollection().updateOne(
      { _id: new ObjectId(influencerId) },
      { $addToSet: { campaigns: campaignId } } // Use $addToSet to avoid duplicates
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException(`Influencer with ID ${influencerId} not found`);
    }

    return { message: `Influencer ${influencerId} added to campaign ${campaignId} successfully` };
  }

  // Fetch all campaigns joined by the influencer
  async getCampaignsByInfluencer(influencerId: string) {
    if (!ObjectId.isValid(influencerId)) {
      throw new NotFoundException(`Invalid influencer ID: ${influencerId}`);
    }

    const influencer = await this.getCollection().findOne({ _id: new ObjectId(influencerId) });
    
    if (!influencer) {
      throw new NotFoundException(`Influencer with ID ${influencerId} not found`);
    }

    return influencer.campaigns; // Return the campaigns array
  }

  // Fetch all influencers
  async getAllInfluencers() {
    const influencers = await this.getCollection().find().toArray();
    return influencers;
  }

  // Submit content for a campaign
  async submitCampaignContent(
    influencerId: string,
    campaignId: string,
    submissionUrl: string,
  ) {
    if (!ObjectId.isValid(influencerId)) {
      throw new NotFoundException(`Invalid influencer ID: ${influencerId}`);
    }

    const influencer = await this.getCollection().findOne({ _id: new ObjectId(influencerId) });
    
    if (!influencer) {
      throw new NotFoundException(`Influencer with ID ${influencerId} not found`);
    }

    // Add submission to the influencer's submissions array
    influencer.submissions.push({ campaignId, submissionUrl, date: new Date() });
    
    // Update the influencer document in the database
    const result = await this.getCollection().updateOne(
      { _id: new ObjectId(influencerId) },
      { $set: { submissions: influencer.submissions } }
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException(`Failed to update submissions for influencer with ID ${influencerId}`);
    }

    return { message: `Submission for campaign ${campaignId} added successfully` };
  }
}