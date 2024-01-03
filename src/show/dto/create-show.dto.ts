// import { Transform } from 'class-transformer';
import {
  //   IsArray,
  //   IsDate,
  //   IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { showdateDto } from './showdate.dto';

export class createShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  showDate: showdateDto[];

  //   @IsString()
  //   creator: string;

  @IsInt()
  @IsNotEmpty({ message: '공연 금액을 입력해주세요' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  venue: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장르를 입력해주세요.' })
  category: string;
}
