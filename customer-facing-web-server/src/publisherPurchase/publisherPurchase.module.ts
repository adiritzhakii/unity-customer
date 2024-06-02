import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublisherPurchaseService } from './publisherPurchase.service';

const kafkaURL = process.env["KAFKA_URL"] == undefined ? "localhost:9092" : process.env["KAFKA_URL"]


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WEB_SERVER_PUBLISHER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [kafkaURL],
          },
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  providers: [PublisherPurchaseService],
  exports: [PublisherPurchaseService],
})
export class PublisherPurchaseModule {}
