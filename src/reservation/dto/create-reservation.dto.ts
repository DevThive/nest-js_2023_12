import { IsNotEmpty, IsString } from 'class-validator';

export class createReservationDto {
  //   @IsString()
  //   @IsNotEmpty({ message: '공연명을 입력해주세요' })
  //   showTitle: string;

  @IsString()
  @IsNotEmpty({ message: '예약자 이름을 입력해주세요' })
  reservationName: string;
}
