import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client.service';
import { ICreateSupportRequestDto } from '../dto/ICreateSupportRequestDto';
import { ICreateMessageDto } from '../dto/ICreateMessageDto';
import { MarkMessagesAsReadDto } from '../dto/IMarkMessagesAsReadDto';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../users/dto/Role.enum';
import { HasRoles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('support-request-client')
export class SupportRequestClientController {
  constructor(
    private supportRequestClientService: SupportRequestClientService,
  ) {}

  @HasRoles(Role.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() data: ICreateSupportRequestDto) {
    return await this.supportRequestClientService.createSupportRequest(data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/message')
  async createMessage(@Body() data: ICreateMessageDto) {
    return await this.supportRequestClientService.createMessage(data);
  }

  @Put('/mark-messages-as-read')
  async markMessagesAsRead(@Body() data: MarkMessagesAsReadDto) {
    return this.supportRequestClientService.markMessagesAsRead(data);
  }
  // https://wanago.io/2021/09/27/api-nestjs-put-patch-mongodb-mongoose/
}
