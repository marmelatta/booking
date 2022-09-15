import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { IReservationDto } from './dto/reservation.dto';
import { ReservationSearchOptions } from './dto/reservation-search-options.dto';
import { ID } from '../types/types';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  async addReservation(@Body() data: IReservationDto) {
    return await this.reservationsService.addReservation(data);
  }

  @Get()
  async getReservations(@Query() filter: ReservationSearchOptions) {
    return await this.reservationsService.getReservations(filter);
  }

  @Delete(':id')
  async removeReservation(@Param() id: ID) {
    return await this.reservationsService.removeReservation(id);
  }
}
