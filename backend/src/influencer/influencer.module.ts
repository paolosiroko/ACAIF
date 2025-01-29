import { Module } from '@nestjs/common';
import { MongoService } from '../mongo.service'; // Ensure MongoService is provided
import { DatabaseModule } from '../database.module';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { InfluencerSchema } from './influencer.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [InfluencerController],
  providers: [InfluencerService, MongoService],
  exports: [InfluencerService],
})
export class InfluencerModule {}






