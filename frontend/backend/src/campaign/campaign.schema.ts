import { Schema, Document } from 'mongoose';

export interface Campaign extends Document {
  name: string;
  status: string;
  deadline: Date;
  approved: boolean;
}

export const CampaignSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  deadline: { type: Date, required: true },
  approved: { type: Boolean, default: false },
});