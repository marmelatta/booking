import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  HotelRoomsService,
  SearchRoomsParams,
} from '../hotel-rooms/hotel-rooms.service';
import { ID } from '../../types/types';

@Controller('common')
export class CommonController {
  constructor(private hotelRoomsService: HotelRoomsService) {}

  @Post('hotel-rooms')
  async search(@Body() params: SearchRoomsParams) {
    return this.hotelRoomsService.search(params);
  }

  @Get('hotel-rooms/:id')
  async findById(@Param('id') id: ID) {
    return this.hotelRoomsService.findById(id);
  }
}
