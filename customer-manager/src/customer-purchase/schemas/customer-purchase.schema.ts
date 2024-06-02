import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid'

@Schema()
export class CustomerPurchase extends Document {
  @Prop({default: v4})
  _id: string

  @Prop()
  productName: string

  @Prop()
  price: number;

  @Prop()
  name: string;

  @Prop()
  age: number;

}

export const CustomerPurchaseSchema = SchemaFactory.createForClass(CustomerPurchase);