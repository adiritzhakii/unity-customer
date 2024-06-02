import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PublisherPurchaseService {
  constructor(
    @Inject('WEB_SERVER_PUBLISHER') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.connect();
  }

  async sendMessage(message: any) {
    return this.kafkaClient.emit('purchaseCreated', message);
  }
}