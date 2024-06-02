import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AllBuysService } from './allBuys/allBuys.service';
import { CreatePurchaseDto } from './dto/createPurchase.dto';
import { PublisherPurchaseService } from './publisherPurchase/publisherPurchase.service';
import {register, collectDefaultMetrics} from 'prom-client'

const CUSTOMER_SERVER_URL = process.env['CUSTOMER_SERVER_URL'] == undefined ? 'localhost:3000' : process.env['CUSTOMER_SERVER_URL'] 

collectDefaultMetrics();

@Controller()
export class AppController {
  constructor(private readonly publisherPurchaseService: PublisherPurchaseService, private readonly allBuys: AllBuysService) {}

  @Get('metrics')
  getMetrics(){
    return register.metrics();
  }
  
  @ApiOperation({ summary: 'Create example data' })
  @ApiBody({ type: CreatePurchaseDto })
  @ApiResponse({ status: 201, description: 'The purchase sent to the server.', type: CreatePurchaseDto })
  @Post('buy')
  async publishMessage(@Body() message: CreatePurchaseDto) {
    await this.publisherPurchaseService.sendMessage(message);
    return { status: 'Message published' };
  }

  @ApiOperation({ summary: 'Get example data' })
  @ApiResponse({ status: 200, description: 'Successful response', type: [CreatePurchaseDto] })
  @Get('getAllUserBuys')
  async getAllBuysFromServer(): Promise<Observable<any>> {
    const url = `http://${CUSTOMER_SERVER_URL}/customer-purchase/getAll`;
    return this.allBuys.get(url); 
  }
}
