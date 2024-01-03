import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from 'src/show/entities/show.entity';
import { Reservation } from './entity/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from './entity/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Reservation, User, Seat])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
