import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SupportRequest } from './support-request.entity';
import { User } from '../../users/entities/user.entity';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: User;

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
