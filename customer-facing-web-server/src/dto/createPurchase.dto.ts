import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePurchaseDto {
    
    @ApiProperty({ description: 'The product name' })
    @IsString()
    @IsNotEmpty()
    readonly productName: string;
    
    @ApiProperty({ description: 'The name of the person who made the purchase'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @ApiProperty({ description: 'The total amount price of the purchase' })
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    
    @ApiProperty({ description: 'The age of the person who made the purchase' })
    @IsNumber()
    @IsNotEmpty()
    readonly age: number;
}