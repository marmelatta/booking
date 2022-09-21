import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ICreateMessageDto } from '../dto/ICreateMessageDto';
import { SupportRequestService } from '../support-request/support-request.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  constructor(private supportRequestService: SupportRequestService) {}
  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: ICreateMessageDto) {
    console.log(message.supportRequest.toString());
    this.wss
      .to(message.supportRequest.toString())
      .emit('chatToClient', message.text);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    const messages = await this.supportRequestService.getMessages(room);
    client.emit('joinedRoom', room, messages);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  afterInit() {
    this.logger.log('Init');
  }
}
