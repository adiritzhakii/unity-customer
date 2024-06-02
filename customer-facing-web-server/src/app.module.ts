import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AllBuysModule } from './allBuys/allBuys.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsMiddleware } from './metrics.middleware';
import { PublisherPurchaseModule } from './publisherPurchase/publisherPurchase.module';

@Module({
  imports: [PublisherPurchaseModule, AllBuysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricsMiddleware)
      .forRoutes('*');
  }
}

