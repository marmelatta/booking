import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { HotelRoomsService, SearchRoomsParams } from './hotel-rooms.service';
import { HotelRoom } from '../entities/hotel-room.entity';
import { ID } from '../../types/types';

@Controller('hotel-rooms')
export class HotelRoomsController {
  constructor(private hotelRoomsService: HotelRoomsService) {}

  @Post()
  async create(@Body() createHotelRoomDto: any) {
    return this.hotelRoomsService.create(createHotelRoomDto);
  }

  @Get(':id')
  async findById(@Param('id') id: ID) {
    return this.hotelRoomsService.findById(id);
  }

  @Post('search')
  async search(@Body() params: SearchRoomsParams) {
    return this.hotelRoomsService.search(params);
  }

  @Put(':id')
  async update(@Param('id') id: ID, @Body() body: Partial<HotelRoom>) {
    return this.hotelRoomsService.update(id, body);
  }
}
