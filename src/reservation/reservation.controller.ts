import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { createReservationDto } from './dto/create-reservation.dto';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { findreservationDto } from './dto/find-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 특정 유저 예약 확인
  // @Post()
  // async userResrvationCheck(@Body() findreservation: findreservationDto) {
  //   return await this.reservationService.userReservationCheck(
  //     findreservation.username,
  //   );
  // }

  //로그인 유저 예약 현황
  //   @Get('/reservation/check')
  //   async loginReservationCheck(@UserInfo() user: User) {
  //     return await this.reservationService.loginReservationCheck(user);
  //   }

  //예약확인
  @Get(':showid/check')
  async reservationCheck(@Param('showid') showid: number) {
    return await this.reservationService.showReservationCheck(showid);
  }

  //예약하기
  @UseGuards(AuthGuard('jwt'))
  @Post('showid/:showid')
  async reservation(
    @Body() reservationDto: createReservationDto,
    @Param('showid') showid: number,
    @UserInfo() user: User,
  ) {
    return await this.reservationService.reservation(
      reservationDto,
      showid,
      user,
    );
  }

  //예약취소
  @UseGuards(AuthGuard('jwt'))
  @Post('showid/:showid/:reservid')
  async cancel(
    @Param('showid') showid: number,
    @Param('reservid') reservid: number,
    @UserInfo() user: User,
  ) {
    return await this.reservationService.cancel(showid, reservid, user);
  }
}
