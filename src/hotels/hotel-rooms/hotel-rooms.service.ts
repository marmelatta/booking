import { Injectable } from '@nestjs/common';
import { HotelRoom, HotelRoomDocument } from '../entities/hotel-room.entity';
import { ID } from '../hotels.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: string;
  isEnabled?: true;
}

interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

@Injectable()
export class HotelRoomsService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = new this.HotelRoomModel(data);
    return hotelRoom.save();
  }

  findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    return this.HotelRoomModel.findOne({ _id: id, isEnabled }).exec();
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.HotelRoomModel.find({ params }).exec();
  }

  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findOneAndUpdate({ _id: id }, data).exec();
  }
}
