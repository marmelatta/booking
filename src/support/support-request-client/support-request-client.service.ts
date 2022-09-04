import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';
import { ID } from '../../types/types';
import { SupportRequest } from '../entities/support-request.entity';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';

interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
}

@Injectable()
export class SupportRequestClientService {}
