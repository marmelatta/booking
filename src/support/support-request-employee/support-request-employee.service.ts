import { Injectable } from '@nestjs/common';
import { ID } from '../../types/types';
import { Message } from '../entities/message.entity';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';

interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
  closeRequest(supportRequest: ID): Promise<void>;
}

@Injectable()
export class SupportRequestEmployeeService {}
