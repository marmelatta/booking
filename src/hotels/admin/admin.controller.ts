import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { HasRoles } from '../../auth/roles.decorator';
import { Role } from '../../users/dto/Role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { CreateHotelDto } from '../dto/create-hotel-dto.interface';
import { HotelsService } from '../hotels.service';
import { Hotel } from '../entities/hotel.entity';
import { ID } from '../../types/types';
import { HotelRoom } from '../entities/hotel-room.entity';

@Controller('admin')
export class AdminController {
  constructor(
    private hotelRoomsService: HotelRoomsService,
    private hotelService: HotelsService,
  ) {}

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('hotels')
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    return await this.hotelService.create(createHotelDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('hotels')
  async findAllHotels(): Promise<Hotel[]> {
    return await this.hotelService.findAll();
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('hotels/:id')
  async updateHotel(@Param('id') id: ID, @Body() body: Partial<Hotel>) {
    return await this.hotelService.update(id, body);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('hotel-rooms')
  async createHotelRoom(@Body() createHotelRoomDto: any) {
    return this.hotelRoomsService.create(createHotelRoomDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('hotel-rooms/:id')
  async updateHotelRoom(@Param('id') id: ID, @Body() body: Partial<HotelRoom>) {
    return this.hotelRoomsService.update(id, body);
  }
}
