import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ required: true, default: 'client' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
