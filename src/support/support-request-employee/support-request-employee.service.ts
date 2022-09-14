import { Injectable } from '@nestjs/common';
import { ID } from '../../types/types';
import { Message, MessageDocument } from '../entities/message.entity';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../entities/support-request.entity';
import { Connection, Model, now } from 'mongoose';

interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
  closeRequest(supportRequest: ID): Promise<SupportRequest>;
}

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequest: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private Message: Model<MessageDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  closeRequest(supportRequest: ID): Promise<SupportRequest> {
    return this.SupportRequest.findByIdAndUpdate(supportRequest, {
      isActive: false,
    }).exec();
  }

  getUnreadCount(supportRequest: ID): Promise<Message[]> {
    //todo: отправлены пользователем
    return this.Message.find({
      _id: supportRequest,
      readAt: { $ne: null },
    }).exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    //todo: отправлены пользователем
    const { createdBefore, ...otherParams } = params;
    return this.Message.updateMany(
      { ...otherParams, createdAt: { $lt: new Date(createdBefore) } },
      { readAt: now() },
      {
        returnNewDocument: true,
      },
    ).find();
  }
}
