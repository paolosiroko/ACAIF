import { Schema, Document } from 'mongoose';

export interface Influencer extends Document {
  name: string;
  email: string;
  campaigns: string[]; // Array of campaign IDs
  submissions: { campaignId: string; submissionUrl: string; date: Date }[];
}

export const InfluencerSchema = new Schema<Influencer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
  submissions: [
    {
      campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
      submissionUrl: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});
