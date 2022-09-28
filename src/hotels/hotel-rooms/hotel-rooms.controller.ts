import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HotelRoomsService, SearchRoomsParams } from './hotel-rooms.service';
import { ID } from '../../types/types';
import { HasRoles } from '../../auth/roles.decorator';
import { Role } from '../../users/dto/Role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { IHotelRoomUpdateDto } from '../dto/IHotelRoomUpdate.dto';

@Controller('hotel-rooms')
export class HotelRoomsController {
  constructor(private hotelRoomsService: HotelRoomsService) {}

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
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

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: ID, @Body() body: IHotelRoomUpdateDto) {
    return this.hotelRoomsService.update(id, body);
  }
}
