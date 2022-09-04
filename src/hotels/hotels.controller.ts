import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel-dto.interface';
import { Hotel } from './entities/hotel.entity';
import { ID } from '../types/types';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelService: HotelsService) {}

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<Hotel | any> {
    return this.hotelService.findById(id);
  }

  @Post()
  async create(@Body() createHotelDto: CreateHotelDto) {
    return await this.hotelService.create(createHotelDto);
  }

  @Post('search')
  async search(@Body() body: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return this.hotelService.search(body);
  }
}
