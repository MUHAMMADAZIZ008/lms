import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;
  @IsString()
  @IsNotEmpty()
  room: string;
  @IsNumber()
  @IsNotEmpty()
  student_id: number;
  @IsNumber()
  @IsNotEmpty()
  teacher_id: number;
}
