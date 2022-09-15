import { ID } from '../../types/types';

export interface ReservationSearchOptions {
  user: ID;
  dateStart: Date;
  dateEnd: Date;
}
