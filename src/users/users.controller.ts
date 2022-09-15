import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { ISearchUserParams } from './dto/ISerachUserParams';
import { ID } from '../types/types';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Post()
  async findAll(@Body() params: ISearchUserParams) {
    return await this.userService.findAll(params);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findById(email);
  }

  @Get(':id')
  async findById(@Param('id') id: ID) {
    return await this.userService.findById(id);
  }
}
