import { Schema, Document } from 'mongoose';

export const SubmissionSchema = new Schema({
  influencer: { type: Schema.Types.ObjectId, ref: 'Influencer' },
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  contentLink: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'] },
});

export interface Submission extends Document {
  influencer: string;
  campaign: string;
  contentLink: string;
  status: string;
}
