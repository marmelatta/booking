import { Body, Controller, Post } from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client.service';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';
import { ICreateMessageDto } from '../dto/ICreateMessageDto';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';

@Controller('support-request-client')
export class SupportRequestClientController {
  constructor(
    private supportRequestClientService: SupportRequestClientService,
  ) {}

  @Post()
  async getMessages(@Body() data: MarkMessagesAsReadDto) {
    return await this.supportRequestClientService.getMessages(data);
  }

  @Post()
  async create(@Body() data: ICreateSupportRequestDto) {
    return await this.supportRequestClientService.createSupportRequest(data);
  }

  @Post('/message')
  async createMessage(@Body() data: ICreateMessageDto) {
    return await this.supportRequestClientService.createMessage(data);
  }

  @Post('/mark-messages-as-read')
  async markMessagesAsRead(@Body() data: MarkMessagesAsReadDto) {
    return await this.supportRequestClientService.markMessagesAsRead(data);
  }
}
