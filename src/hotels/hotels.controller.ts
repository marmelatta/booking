import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel-dto.interface';
import { Hotel } from './entities/hotel.entity';
import { ID } from '../types/types';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HasRoles } from '../auth/roles.decorator';
import { Role } from '../users/dto/Role.enum';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelService: HotelsService) {}

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<Hotel | any> {
    return this.hotelService.findById(id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createHotelDto: CreateHotelDto) {
    return await this.hotelService.create(createHotelDto);
  }

  @Post('search')
  async search(@Body() body: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return this.hotelService.search(body);
  }
}
