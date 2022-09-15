import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { HotelRoom } from '../../hotels/entities/hotel-room.entity';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  })
  hotel: Hotel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRoom',
    required: true,
  })
  room: HotelRoom;

  @Prop()
  dateStart: Date;

  @Prop()
  dateFinish: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
