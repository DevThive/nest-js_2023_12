import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { showDate } from './entities/showtime.entity';
import { Seat } from 'src/reservation/entity/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, showDate, Seat])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
