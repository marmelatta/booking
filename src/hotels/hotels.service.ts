import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './entities/hotel.entity';
import { Connection, Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel-dto.interface';
import { ID } from '../types/types';
import { IHotelFilterDto } from './dto/IHotelFilterDto';
import { IHotelUpdateDto } from './dto/IHotelUpdate.dto';

interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
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

  findById(id: ID): Promise<Hotel> {
    return this.HotelModel.findById({ _id: id }).exec();
  }

  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return this.HotelModel.find({ params }).exec();
  }

  findAll(params: IHotelFilterDto): Promise<Hotel[]> {
    return this.HotelModel.find()
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }

  update(id: ID, data: IHotelUpdateDto): Promise<Hotel> {
    return this.HotelModel.findOneAndUpdate({ _id: id }, { ...data }).exec();
  }
}
