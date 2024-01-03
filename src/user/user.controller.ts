import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body,
  Controller,
  Get,
  Param,
  //   Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { createUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() loginDto: createUserDto) {
    return await this.userService.register(
      loginDto.email,
      loginDto.password,
      loginDto.nickname,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @Get(':nickname')
  async profile(@Param('nickname') nickname: string) {
    return await this.userService.profile(nickname);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check/email')
  getEmail(@UserInfo() user: User) {
    return { email: user };
  }
}
