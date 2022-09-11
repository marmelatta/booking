import { Injectable, NotFoundException } from '@nestjs/common';
import { Message, MessageDocument } from '../entities/message.entity';
import { ID } from '../../types/types';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../entities/support-request.entity';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, now } from 'mongoose';
import { ICreateMessageDto } from '../dto/ICreateMessageDto';
import { log } from "util";

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
    @InjectConnection() private connection: Connection,
  ) {}

  createSupportRequest(
    data: ICreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const supportRequest = new this.SupportRequest(data);
    return supportRequest.save();
  }

  getUnreadCount(supportRequest: ID): Promise<Message[]> {
    return this.Message.find({
      _id: supportRequest,
      // todo: фильтрануть по типу сотрудника
      readAt: { $ne: null },
    }).exec();
    //.populate('User', {type: 'client'})
  }

  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    return this.Message.updateMany(params, { readAt: now() }).exec();
  }

  async createMessage(data: ICreateMessageDto) {
    const message = await new this.Message(data).save();
    const supportReq = await this.SupportRequest.findById(
      data.supportRequest,
    ).exec();
    if (!supportReq) {
      throw new NotFoundException();
    }
    supportReq.messages.push(message);
    return supportReq.save();
    /*
    const message = await new this.Message(data).save();
    console.log('message', message);
    return message;
     */
  }

  //helpers
  async getMessages(data: MarkMessagesAsReadDto) {
    const { createdBefore, ...a } = data;
    console.log('createBefore', createdBefore);
    console.log('remain', a);
    const t = await this.Message.find().exec();
    t.map(x => {
      if (x.createdAt <= new Date(createdBefore)) {
        console.log('true', x.createdAt);
      } else {
        console.log('false', x.createdAt);
      }
    });
    return this.Message.find().exec();
  }
}
