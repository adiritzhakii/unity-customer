import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {CustomerPurchaseService} from './customer-purchase.service'

@Controller('customer-purchase')
export class CustomerPurchaseController {
    constructor(private readonly customerPurchaseService:CustomerPurchaseService){
    }

    @Get('getAll')
    async findAll() {
        return this.customerPurchaseService.findAll();
    }
    
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.customerPurchaseService.findById(id);
    }
}
