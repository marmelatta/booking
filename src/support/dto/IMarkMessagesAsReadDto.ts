import { ID } from '../../types/types';

export interface MarkMessagesAsReadDto {
  user: string; //ID;
  supportRequest: ID;
  createdBefore: Date;
}