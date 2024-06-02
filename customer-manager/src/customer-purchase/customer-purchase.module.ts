import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerPurchaseController } from './customer-purchase.controller';
import { CustomerPurchase, CustomerPurchaseSchema } from './schemas/customer-purchase.schema';
import {CustomerPurchaseService} from './customer-purchase.service'

@Module({
  imports: [MongooseModule.forFeature([{name: CustomerPurchase.name, schema: CustomerPurchaseSchema}])],
  controllers: [CustomerPurchaseController],
  providers: [CustomerPurchaseService],
  exports: [CustomerPurchaseService]
})
export class CustomerPurchaseModule {}
