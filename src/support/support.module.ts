import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestClientService } from './support-request-client/support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import {
  SupportRequest,
  SupportRequestSchema,
} from './entities/support-request.entity';
import { SupportRequestClientController } from './support-request-client/support-request-client.controller';
import { SupportRequestController } from './support-request/support-request.controller';
import { AppGateway } from './gateway/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: SupportRequest.name,
        schema: SupportRequestSchema,
      },
    ]),
  ],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
    AppGateway,
  ],
  controllers: [SupportRequestClientController, SupportRequestController],
})
export class SupportModule {}
