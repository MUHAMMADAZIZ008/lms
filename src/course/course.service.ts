import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courseRepository } from './repository/course.repository';

@Injectable()
export class CourseService {
  constructor(private courseRepository:courseRepository){}
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.create(createCourseDto)
  }

  findAll(page:number , limit:number) {
    return this.courseRepository.findAll(page , limit)
  }

  findOne(id: number) {
    return this.courseRepository.findOne(id)
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id , updateCourseDto)
  }

  remove(id: number) {
    return this.courseRepository.remove(id)
  }
}
