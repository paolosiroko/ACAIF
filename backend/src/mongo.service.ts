import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    this.client = new MongoClient("mongodb+srv://admin:Kwendo2025@cluster0.oge5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await this.client.connect();
    this.db = this.client.db('trendai');
    console.log('Connected to MongoDB');
  }

  getDb() {
    return this.db;
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }
}