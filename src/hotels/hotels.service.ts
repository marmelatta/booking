import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './entities/hotel.entity';
import { Connection, Model } from 'mongoose';
import { HotelRoom } from './entities/hotel-room.entity';
import { CreateHotelDto } from './dto/create-hotel-dto.interface';

interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: string;
  isEnabled?: true;
}

interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: number, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: number, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: number): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
}

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(data: CreateHotelDto): Promise<Hotel> {
    const hotel = new this.HotelModel(data);
    return hotel.save();
  }

  findById(id: number): Promise<Hotel> {
    return this.HotelModel.findById({ _id: id }).exec();
  }

  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return this.HotelModel.find({ params }).exec();
  }
}
