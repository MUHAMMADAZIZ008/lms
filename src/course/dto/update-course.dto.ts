import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category_id:number
}

