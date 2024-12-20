import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseProviders } from './course.providers';
import { courseRepository } from './repository/course.repository';

@Module({
  controllers: [CourseController],
  providers: [CourseService , ...CourseProviders ,courseRepository],
})
export class CourseModule {}
