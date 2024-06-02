import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LifecycleService } from './lifecycle/lifecycle.service';
import { CustomerPurchaseModule } from './customer-purchase/customer-purchase.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env['MONGO_URL']}/unity-project`),
    CustomerPurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, LifecycleService],
})
export class AppModule {}
