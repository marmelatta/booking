import { ID } from '../../types/types';

export interface ISendMessageDto {
  author: string;
  supportRequest: ID;
  text: string;
}
