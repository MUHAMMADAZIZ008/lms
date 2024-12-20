import { IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @IsString()
  otp_code: string;

  @IsNumber()
  user_id: number;

  @IsString()
  type: string;
}
