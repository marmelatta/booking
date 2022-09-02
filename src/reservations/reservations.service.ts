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
  addReservation(data: IReservationDto): Promise<Reservation>;
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

  addReservation(data: IReservationDto): Promise<Reservation> {
    // todo: проверка доступен ли номер на заданную дату
    return Promise.resolve(undefined);
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
