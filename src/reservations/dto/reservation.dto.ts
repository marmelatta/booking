import { ID } from '../../hotels/hotels.service';

export interface IReservationDto {
  hotel: ID;
  room: ID;
  dateStart: Date;
  dateEnd: Date;
}
