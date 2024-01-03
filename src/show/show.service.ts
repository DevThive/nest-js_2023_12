import { Repository } from 'typeorm';
import _ from 'lodash';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

import {
  Injectable,
  //   UnauthorizedException,
  //   ConflictException,
  //   Inject,
  BadRequestException,
  //   Inject,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { createShowDto } from './dto/create-show.dto';
import { showDate } from './entities/showtime.entity';
import { Seat } from 'src/reservation/entity/seat.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(showDate)
    private timeRepository: Repository<showDate>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // 공연 조회
  async findAll() {
    // const cachedShows = await this.cacheManager.get('name');
    // if (!_.isNil(cachedShows)) {
    //   return cachedShows;
    // }

    const shows = await this.showRepository.find({
      where: { deletedAt: null },
      select: ['title', 'venue', 'price', 'state'],
    });
    // await this.cacheManager.set('shows', shows);
    return shows;
  }

  // 공연 생성
  async createShow(
    createDto: createShowDto,
    adminNickname: string,
  ): Promise<Show> {
    const existShow = await this.findOneByShow(createDto.title);
    if (existShow) {
      throw new BadRequestException('이미 같은 이름에 공연이 존재합니다.');
    }

    const show = new Show();
    show.title = createDto.title;
    show.description = createDto.description;
    show.price = createDto.price;
    show.creator = adminNickname;
    show.venue = createDto.venue;
    show.category = createDto.category;

    const savedShow = await this.showRepository.save(show);

    // console.log(createDto.showDate);

    for (const showdateDto of createDto.showDate) {
      //   console.log(showdateDto);
      const date = new showDate();
      date.date = String(showdateDto);
      date.show = savedShow;
      await this.timeRepository.save(date);
    }

    await this.addSeats(show.id);
    // console.log(savedShow);

    return savedShow;
  }

  async findOneByShow(title: string) {
    return await this.showRepository.findOneBy({ title });
  }

  //공연 좌석 생성
  async addSeats(showid: number) {
    for (let i = 1; i <= 50; i++) {
      const seat = new Seat();
      seat.setnum = i;
      seat.isReserved = false;
      seat.showid = showid;
      await this.seatRepository.save(seat);
    }
  }

  //공연 검색
  async showSearch(keyword: string) {
    if (_.isNaN(keyword)) {
      throw new BadRequestException('검색결과가 존재하지 않습니다.');
    }

    const resultShow = await this.showRepository
      .createQueryBuilder('show')
      .where('show.title LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return resultShow;
  }

  //공연 상세보기
  async showDetail(title: string): Promise<Show> {
    if (_.isNaN(title)) {
      throw new BadRequestException('공연이 존재하지 않습니다.');
    }
    // const show = await this.showRepository.findOneBy({ title });
    // const showDate = this.findByDates();

    return await this.showRepository.findOne({
      where: { title },
      relations: ['showDate'],
    });
  }
}

// 'title',
//         'description',
//         'venue',
//         // 'showDate',
//         'price',
//         'state',
//         'category',
