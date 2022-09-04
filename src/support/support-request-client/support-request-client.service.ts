import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../entities/message.entity';
import { ID } from '../../types/types';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../entities/support-request.entity';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
}

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequest: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private Message: Model<MessageDocument>,
  ) {}

  createSupportRequest(
    data: ICreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const supportRequest = new this.SupportRequest(data);
    return supportRequest.save();
  }

  getUnreadCount(supportRequest: ID): Promise<Message[]> {
    const messages = this.Message.find({
      _id: supportRequest,
      // todo: фильтрануть по типу сотрудника
      readAt: { $ne: null },
    }).exec();
    return messages;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  markMessagesAsRead(params: MarkMessagesAsReadDto) {}
}
