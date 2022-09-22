import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { IReservationDto } from './dto/reservation.dto';
import { ReservationSearchOptions } from './dto/reservation-search-options.dto';
import { ID } from '../types/types';
import { HasRoles } from '../auth/roles.decorator';
import { Role } from '../users/dto/Role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @HasRoles(Role.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async addReservation(@Body() data: IReservationDto) {
    return await this.reservationsService.addReservation(data);
  }

  @HasRoles(Role.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async getReservations(@Query() filter: ReservationSearchOptions) {
    return await this.reservationsService.getReservations(filter);
  }

  @HasRoles(Role.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async removeReservation(@Param() id: ID) {
    return await this.reservationsService.removeReservation(id);
  }
}
