import { ID } from '../../types/types';

export interface ICreateMessageDto {
  supportRequest: ID;
  text: string;
  user: ID;
}
