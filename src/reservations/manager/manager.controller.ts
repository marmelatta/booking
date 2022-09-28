import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ReservationsService } from '../reservations.service';
import { ID } from '../../types/types';
import { Reservation } from '../entities/reservation.entity';
import { HasRoles } from '../../auth/roles.decorator';
import { Role } from '../../users/dto/Role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';

@Controller('manager')
export class ManagerController {
  constructor(private reservationsService: ReservationsService) {}

  @HasRoles(Role.Manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findById(@Param('id') id: ID): Promise<Reservation[]> {
    return this.reservationsService.getUserReservations(id);
  }

  @HasRoles(Role.Manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':userId/:id')
  async removeReservation(@Param() userId: ID, @Param() id: ID) {
    return await this.reservationsService.removeReservation(id);
  }
}
