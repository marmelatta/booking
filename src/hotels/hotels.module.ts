import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entities/hotel.entity';
import { HotelRoom, HotelRoomSchema } from './entities/hotel-room.entity';
import { HotelRoomsService } from './hotel-rooms/hotel-rooms.service';

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
  controllers: [HotelsController],
  providers: [HotelsService, HotelRoomsService],
  // exports: [HotelsService],
})
export class HotelsModule {}
