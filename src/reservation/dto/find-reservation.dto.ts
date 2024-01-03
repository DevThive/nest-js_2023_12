import { IsNotEmpty, IsString } from 'class-validator';

export class findreservationDto {
  //   @IsString()
  //   @IsNotEmpty({ message: '공연명을 입력해주세요' })
  //   showTitle: string;

  @IsString()
  @IsNotEmpty({ message: '사용자 이름을 입력해주세요' })
  username: string;
}
