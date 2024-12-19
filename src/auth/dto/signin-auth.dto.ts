import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { Max, Min } from 'sequelize-typescript';

export class SignInAuthDto {
  @ApiProperty({
    type: String,
    description: 'User username',
  })
  @IsString()
  @Min(3)
  @Max(50)
  username: string;

  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
