import { Injectable } from '@nestjs/common';
import { HotelRoom, HotelRoomDocument } from '../entities/hotel-room.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, now } from 'mongoose';
import { ID } from '../../types/types';

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
    const filter = isEnabled ? { _id: id, isEnabled } : { _id: id };
    return this.HotelRoomModel.findOne(filter).exec();
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { offset, limit, ...otherFilter } = params;
    return this.HotelRoomModel.find({ otherFilter })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findOneAndUpdate(
      { _id: id },
      { ...data, updatedAt: now() },
    ).exec();
  }
}
