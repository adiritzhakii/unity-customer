import { Injectable, OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import mongoose from 'mongoose';
import { Consumer, Kafka } from 'kafkajs';
import { CustomerPurchaseService } from 'src/customer-purchase/customer-purchase.service';
import { CreateCustomerPurchaseInterface } from 'src/customer-purchase/types/createCustomerPurchase';

const kafkaURL = process.env["KAFKA_URL"] == undefined ? "localhost:9092" : process.env["KAFKA_URL"]
const mongoURL = process.env["MONGO_URL"] == undefined ? "localhost:27017" : process.env["MONGO_URL"]

@Injectable()
export class LifecycleService implements OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown, OnModuleInit {
  
  private consumer: Consumer;
  private kafka: Kafka;

  constructor(
    private readonly customerPurchaseService: CustomerPurchaseService
  ) {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: [kafkaURL], // Adjust this to your Kafka broker address
    });
    this.consumer = this.kafka.consumer({groupId: "my-group"})
  }

  async onModuleInit() {
    console.log('All module initials')
  }

  async onApplicationBootstrap() {
    // Initialize MongoDB connection
    await this.initMongo();
    console.log('MongoDB connection initialized');
    await this.consumer.connect();
    console.log(`KafkaConnection is ${kafkaURL}`)
    console.log('Kafka connection initialized')
    await this.consumer.subscribe({ topic: 'purchaseCreated', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const eventPayload: CreateCustomerPurchaseInterface = JSON.parse(message.value.toString());
        await this.customerPurchaseService.create(eventPayload);
        console.log('Sent item to kafka')
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect()
    console.log('Kafka client disconnected');      
  }
  async onModuleDestroy() {
  }

  private async initMongo() {
    console.log(mongoURL)
    await mongoose.connect(`mongodb://${mongoURL}/unity-project`);
  }
}