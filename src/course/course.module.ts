import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseProviders } from './course.providers';
import { courseRepository } from './repository/course.repository';
import { GruardModule } from 'src/guard/guard.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), GruardModule],
  controllers: [CourseController],
  providers: [CourseService, ...CourseProviders, courseRepository],
})
export class CourseModule {}
