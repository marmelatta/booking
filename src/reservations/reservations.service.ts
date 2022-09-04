import { Injectable } from '@nestjs/common';
import { IReservationDto } from './dto/reservation.dto';
import {
  Reservation,
  ReservationDocument,
} from './entities/reservation.entity';
import { ID } from '../hotels/hotels.service';
import { ReservationSearchOptions } from './dto/reservation-search-options.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

interface IReservation {
  addReservation(data: IReservationDto): Promise<Reservation | string>;
  removeReservation(id: ID): Promise<ReservationDocument>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}

@Injectable()
export class ReservationsService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<ReservationDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addReservation(data: IReservationDto): Promise<Reservation | string> {
    const reservations = await this.ReservationModel.find().exec();
    const isFree = reservations.some(
      (x) =>
        !(data.dateStart < x.dateStart && data.dateEnd < x.dateFinish) ||
        !(data.dateStart > data.dateEnd && data.dateEnd > data.dateEnd),
    );
    if (!isFree) {
      return 'Этот номер уже занят на даты';
    }

    const reservation = new this.ReservationModel(data);
    return reservation.save();
  }

  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>> {
    return this.ReservationModel.find({ filter }).exec();
  }

  removeReservation(id: ID): Promise<ReservationDocument> {
    return this.ReservationModel.findByIdAndDelete({ _id: id }).exec();
  }
}
