import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerPurchase } from './schemas/customer-purchase.schema';
import { CreateCustomerPurchaseInterface } from './types/createCustomerPurchase';

@Injectable()
export class CustomerPurchaseService {
    constructor(@InjectModel(CustomerPurchase.name) private customerPurchaseModel: Model<CustomerPurchase> ){
    }

    async create(createCustomerPurchaseDto: CreateCustomerPurchaseInterface): Promise<CustomerPurchase>{
        const createdCP = new this.customerPurchaseModel(createCustomerPurchaseDto)
        return createdCP.save()
    }

    async findAll(): Promise<CustomerPurchase[]> {
        return this.customerPurchaseModel.find().exec();
      }
    
    async findById(id: string): Promise<CustomerPurchase> {
      const purchase = await this.customerPurchaseModel.findById(id).exec();
      if (!purchase) {
        throw new NotFoundException(`CustomerPurchase with id ${id} not found`);
      }
      return purchase;
    }
}
