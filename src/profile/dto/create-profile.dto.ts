// import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';
import { UserStatus } from 'src/common/enums/user.status';
import { Roles } from 'src/decorator/role.decorator';

export class CreateProfileDto {
  // @ApiProperty({
  //   type: String,
  //   description: 'User name',
  // })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'User username',
  // })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'User email',
  // })
  @IsString()
  email: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'User password',
  // })
  @IsString()
  password: string;

  // @ApiProperty({
  //   type: Number,
  //   description: "User's age",
  // })
  @IsNumber()
  age: number;

  // @ApiProperty({
  //   type: String,
  //   description: 'User gender',
  //   enum: ['MALE', 'FEMALE'],
  // })
  gender: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'User status',
  //   enum: UserStatus,
  // })
  @IsEnum(UserStatus)
  status: UserStatus;

  // @ApiProperty({
  //   type: String,
  //   description: 'User role (default student)',
  //   enum: Roles,
  // })
  @IsEnum(Roles)
  role: string;

  // @ApiProperty({
  //   type: String,
  //   description: `User's picture`,
  // })
  // @IsOptional()
  @IsString()
  avatar: string;
}
