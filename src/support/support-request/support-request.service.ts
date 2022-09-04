import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';
import { ID } from '../../types/types';
import { ISendMessageDto } from '../dto/ISendMessageDto';
import { SupportRequest } from '../entities/support-request.entity';
import { IGetChatListParams } from '../dto/IGetChatListParams';

interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: ISendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

@Injectable()
export class SupportRequestService {}
