import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './message.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop()
  user: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Message',
  })
  messages: Message[];

  @Prop({ default: true })
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
