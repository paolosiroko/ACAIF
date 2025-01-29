import { Module } from '@nestjs/common';
import { MongoService } from '../mongo.service'; // Ensure MongoService is provided
import { DatabaseModule } from '../database.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SubmissionSchema } from './submission.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, MongoService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
