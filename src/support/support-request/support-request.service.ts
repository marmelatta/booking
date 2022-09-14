import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../entities/message.entity';
import { ID } from '../../types/types';
import { ISendMessageDto } from '../dto/ISendMessageDto';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../entities/support-request.entity';
import { IGetChatListParams } from '../dto/IGetChatListParams';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Expression, Model } from 'mongoose';

interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: ISendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  // subscribe(
  //   handler: (supportRequest: SupportRequest, message: Message) => void,
  // ): () => void;
}

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequest: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private Message: Model<MessageDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    return this.SupportRequest.find(params).exec();
  }

  getMessages(supportRequest: ID): Promise<Message[]> {
    return this.Message.find({ supportRequest: supportRequest }).exec();
  }

  sendMessage(data: ISendMessageDto): Promise<Message> {
    const message = new this.Message(data);
    return message.save();
  }

  // subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
  //   return function() {
  //   };
  // }
}
