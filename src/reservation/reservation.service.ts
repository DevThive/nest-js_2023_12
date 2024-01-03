import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from 'src/show/entities/show.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservation.entity';
import { createReservationDto } from './dto/create-reservation.dto';
import { User } from 'src/user/entities/user.entity';
import { Seat } from './entity/seat.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
    @InjectRepository(Reservation)
    private reservationRpository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
  ) {}

  // 특정 유저 예약 현황 확인
  // async userReservationCheck(username: string) {
  //   console.log(username);
  //   const userResultRes = await this.reservationRpository.find({
  //     where: { username: username },
  //     select: ['showtitle', 'reservationname', 'venue'],
  //   });

  //   return userResultRes;
  // }

  // 특정 공연 예약자 확인
  async showReservationCheck(showid: number) {
    const existReservationShowid = this.findReservationShowid(showid);
    if (!existReservationShowid) {
      throw new BadRequestException('예약을 확인해주세요.');
    }

    const resultRes = await this.reservationRpository.find({
      relations: ['showdate'],
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
      const show = await entityManager.findOne(Show, { where: { id: showId } });

      if (!show) {
        throw new BadRequestException('공연을 확인해주세요');
      }

      if (show.state !== 'Res_poss') {
        throw new BadRequestException('예매가 불가능합니다');
      }

      const totalSeats = await entityManager.count(Seat, {
        where: { showid: showId },
      });
      const reservedSeats = await entityManager.count(Seat, {
        where: { showid: showId, isReserved: true },
      });
      const remainingSeats = totalSeats - reservedSeats;

      if (remainingSeats <= 0) {
        throw new BadRequestException('남은 좌석이 없습니다');
      }

      const seat = await entityManager.findOne(Seat, {
        where: { id: reservationDto.seats },
      });

      if (!seat || seat.isReserved) {
        throw new BadRequestException(
          '선택한 좌석이 이미 예약되었거나 존재하지 않습니다',
        );
      }
      // 남은 좌석 확인 console
      console.log(remainingSeats);

      if (user.point < show.price) {
        throw new BadRequestException('금액을 확인해주세요');
      }

      seat.isReserved = true;
      seat.reserv = user;
      await entityManager.save(Seat, seat);

      user.point -= show.price;
      await entityManager.save(User, user);

      const reservation = new Reservation();
      reservation.showid = showId;
      reservation.showtitle = show.title;
      reservation.username = user.nickname;
      reservation.reservationname = reservationDto.reservationName;
      reservation.venue = show.venue;
      reservation.showdate = show.showDate;
      reservation.show = show;
      reservation.seatid = reservationDto.seats;

      return await entityManager.save(Reservation, reservation);
    });
  }

  // 예약 취소
  async cancel(showid: number, reservid: number, user: User) {
    return this.userRepository.manager.transaction(async (entityManager) => {
      const show = await entityManager.findOne(Show, { where: { id: showid } });
      const reserv = await entityManager.findOne(Reservation, {
        where: { seatid: reservid, username: user.nickname },
      });

      console.log((user.point += Number(show.price)));

      if (!show) {
        throw new BadRequestException('공연을 확인해주세요.');
      }

      if (!reserv) {
        throw new BadRequestException('예약 상태를 확인해주세요.');
      }

      const seat = await entityManager.findOne(Seat, {
        where: { id: reserv.seatid },
      });

      if (seat.isReserved == false) {
        throw new BadRequestException('좌석이 비어있습니다.');
      }

      seat.isReserved = false;
      seat.reserv = null;
      await entityManager.save(Seat, seat);

      user.point += Number(show.price);
      await entityManager.save(User, user);

      const result = '취소가 완료되었습니다.';

      return result;
    });
  }
  //   async showInfo(id: number) {
  //     return await this.showRepository.findOneBy({ id });
  //   }
  //   async userInfo(nickname: string) {
  //     return await this.userRepository.findOneBy({ nickname });
  //   }
}
