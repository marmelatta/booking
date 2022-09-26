import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dto/CreateUserDto';

@Controller('client')
export class ClientController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.create({ ...user, role: 'client' });
  }
}
