import { Body, Controller, Post } from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client.service';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';
import { ICreateMessageDto } from '../dto/ICreateMessageDto';

@Controller('support-request-client')
export class SupportRequestClientController {
  constructor(
    private supportRequestClientService: SupportRequestClientService,
  ) {}

  @Post()
  async create(@Body() data: ICreateSupportRequestDto) {
    return await this.supportRequestClientService.createSupportRequest(data);
  }

  @Post('/message')
  async createMessage(@Body() data: ICreateMessageDto) {
    return await this.supportRequestClientService.createMessage(data);
  }
}