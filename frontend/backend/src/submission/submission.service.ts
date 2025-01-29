import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from '../mongo.service'; // Adjust the import path as necessary
import { ObjectId } from 'mongodb';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionService {
  constructor(private readonly mongoService: MongoService) {}

  private getCollection() {
    return this.mongoService.getDb().collection('submissions'); // Ensure this matches your MongoDB collection name
  }

  // Create a new submission
  async create(createSubmissionDto: CreateSubmissionDto) {
    const submission = {
      ...createSubmissionDto,
      date: new Date(), // Add a date field if needed
    };

    const result = await this.getCollection().insertOne(submission);
    
    if (!result.insertedId) {
      throw new Error('Failed to create submission');
    }

    return { message: 'Submission created successfully', submissionId: result.insertedId };
  }
}