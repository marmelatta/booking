import { ID } from '../../types/types';

export interface IReservationDto {
  user: ID;
  hotel: ID;
  room: ID;
  dateStart: Date;
  dateFinish: Date;
}
