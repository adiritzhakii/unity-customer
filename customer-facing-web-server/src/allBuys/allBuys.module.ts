import { Module } from '@nestjs/common';
import { AllBuysService } from './allBuys.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AllBuysService],
  exports: [AllBuysService],
})
export class AllBuysModule {}