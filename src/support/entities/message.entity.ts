import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from "mongoose";
import { SupportRequest } from './support-request.entity';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ request: true })
  author: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportRequest',
    isRequired: true,
  })
  supportRequest: SupportRequest;

  @Prop()
  sentAt: Date;

  @Prop({ request: true })
  text: string;

  @Prop()
  readAt: Date;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
