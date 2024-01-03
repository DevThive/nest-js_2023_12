import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from 'src/show/entities/show.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservation.entity';
import { createReservationDto } from './dto/create-reservation.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
    @InjectRepository(Reservation)
    private reservationRpository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 특정 유저 예약 현황 확인
  async userReservationCheck(username: string) {
    console.log(username);
    const userResultRes = await this.reservationRpository.find({
      where: { username: username },
      select: ['showtitle', 'reservationname', 'time', 'venue'],
    });

    return userResultRes;
  }

  // 특정 공연 예약자 확인
  async showReservationCheck(showid: number) {
    const existReservationShowid = this.findReservationShowid(showid);
    if (!existReservationShowid) {
      throw new BadRequestException('예약을 확인해주세요.');
    }

    const resultRes = await this.reservationRpository.find({
      where: { showid: showid },
      select: ['reservationname', 'venue', 'time'],
    });
    return resultRes;
  }

  async findReservationName(userName: string) {
    return await this.reservationRpository.findOneBy({ username: userName });
  }

  async findReservationShowid(showId: number) {
    return await this.reservationRpository.findOneBy({ showid: showId });
  }

  async reservation(
    reservationDto: createReservationDto,
    showId: number,
    user: User,
  ) {
    return this.userRepository.manager.transaction(async (entityManager) => {
      const show = await entityManager.findOne(Show, { id: showId });

      if (!show) {
        throw new BadRequestException('공연을 확인해주세요');
      }

      if (show.state !== 'Res_poss') {
        throw new BadRequestException('예매가 불가능합니다');
      }

      const seat = await entityManager.findOne(Seat, { id: seatId });

      if (!seat || seat.isReserved) {
        throw new BadRequestException(
          '선택한 좌석이 이미 예약되었거나 존재하지 않습니다',
        );
      }

      if (user.point < show.price) {
        throw new BadRequestException('금액을 확인해주세요');
      }

      seat.isReserved = true;
      await entityManager.save(Seat, seat);

      user.point -= show.price;
      await entityManager.save(User, user);

      const reservation = new Reservation();
      reservation.showid = showId;
      reservation.showtitle = show.title;
      reservation.username = user.nickname;
      reservation.reservationname = reservationDto.reservationName;
      reservation.venue = show.venue;
      reservation.time = show.showDate;
      reservation.seatId = seatId;

      return await entityManager.save(Reservation, reservation);
    });
  }
  //   async showInfo(id: number) {
  //     return await this.showRepository.findOneBy({ id });
  //   }
  //   async userInfo(nickname: string) {
  //     return await this.userRepository.findOneBy({ nickname });
  //   }
}
