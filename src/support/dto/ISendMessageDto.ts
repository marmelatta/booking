import { ID } from '../../types/types';

export interface ISendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}
