import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SoapResponse extends Document {
  @Prop({ required: true })
  responseData: object;

  @Prop()
  createdAt: Date;
}

export const SoapResponseSchema = SchemaFactory.createForClass(SoapResponse);
