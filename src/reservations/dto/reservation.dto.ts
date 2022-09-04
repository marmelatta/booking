import { ID } from '../../types/types';

export interface IReservationDto {
  hotel: ID;
  room: ID;
  dateStart: Date;
  dateEnd: Date;
}
