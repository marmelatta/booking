import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './message.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

export class SupportRequest {
  @Prop()
  user: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Message',
  })
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
