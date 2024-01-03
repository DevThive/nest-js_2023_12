import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { RolesGuard } from 'src/auth/roles.guard';
import { ShowService } from './show.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { createShowDto } from './dto/create-show.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
// import { UserInfo } from 'src/utils/userInfo.decorator';
// import { User } from 'src/user/entities/user.entity';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  //상세보기
  @Get('detail/:title')
  async showDetail(@Param('title') title: string) {
    return await this.showService.showDetail(title);
  }

  //검색하기
  @Get('search')
  async showSearch(@Query('keyword') keyword: string) {
    return await this.showService.showSearch(keyword);
  }

  //공연 등록
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @Post()
  async createShow(@Body() createDto: createShowDto, @UserInfo() user: User) {
    return await this.showService.createShow(createDto, user.nickname);
  }
}
