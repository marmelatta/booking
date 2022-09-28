import { Injectable } from '@nestjs/common';
import { IReservationDto } from './dto/reservation.dto';
import {
  Reservation,
  ReservationDocument,
} from './entities/reservation.entity';
import { ReservationSearchOptions } from './dto/reservation-search-options.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../types/types';

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
    const dateStartIso = new Date(data.dateStart);
    const dateFinishIso = new Date(data.dateFinish);
    const isReserved = reservations.some(
      (x) =>
        (dateStartIso >= x.dateStart && dateStartIso <= x.dateFinish) ||
        (dateFinishIso >= x.dateStart && dateFinishIso <= x.dateFinish),
    );
    if (isReserved) {
      return 'Этот номер уже занят на даты';
    }

    const reservation = new this.ReservationModel(data);
    return reservation.save();
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>> {
    const { dateStart, dateFinish, ...otherFilters } = filter;
    const reservations = await this.ReservationModel.find({
      otherFilters,
    }).exec();
    const dateStartIso = new Date(dateStart);
    const dateFinishIso = new Date(dateFinish);
    return reservations.filter(
      (x) =>
        (dateStartIso >= x.dateStart && dateStartIso <= x.dateFinish) ||
        (dateFinishIso >= x.dateStart && dateFinishIso <= x.dateFinish),
    );
  }

  async getUserReservations(userId: ID): Promise<Reservation[]> {
    return await this.ReservationModel.find({
      user: userId,
    }).exec();
  }

  removeReservation(id: ID): Promise<ReservationDocument> {
    return this.ReservationModel.findByIdAndDelete({ _id: id }).exec();
  }
}
