import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Hotel } from './hotel.entity';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  //@Prop({ isRequired: true })
  //hotelId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  })
  hotel: Hotel;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ isRequired: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
