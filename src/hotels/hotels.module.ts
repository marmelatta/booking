import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entities/hotel.entity';
import { HotelRoom, HotelRoomSchema } from './entities/hotel-room.entity';
import { HotelRoomsService } from './hotel-rooms/hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';
import { CommonController } from './common/common.controller';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hotel.name,
        schema: HotelSchema,
      },
      {
        name: HotelRoom.name,
        schema: HotelRoomSchema,
      },
    ]),
  ],
  controllers: [
    HotelsController,
    HotelRoomsController,
    CommonController,
    AdminController,
  ],
  providers: [HotelsService, HotelRoomsService],
  exports: [HotelsService, HotelRoomsService],
})
export class HotelsModule {}
