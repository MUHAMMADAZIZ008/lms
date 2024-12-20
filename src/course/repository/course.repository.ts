import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class courseRepository {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseModel: typeof Course,
  ) {}

  async create(CreateCourseDto) {
    return this.courseModel.create(CreateCourseDto);
  }

  async findAll(page: number, limit: number) {
    const offsate = (page - 1) * limit;
    return this.courseModel.findAll({ offset: offsate, limit: limit });
  }

  async findOne(id: number) {
    const course = await this.courseModel.findOne({ where: { id } });
    if (!course) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, data: course };
  }

  async update(id: number, updateCouresDto: UpdateCourseDto) {
    const course = await this.courseModel.findOne({ where: { id } });
    if (!course) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.courseModel.update(updateCouresDto, { where: { id } });
    return { status: HttpStatus.OK, id };
  }

  async remove(id: number) {
    const course = await this.courseModel.findOne({ where: { id } });
    if (!course) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.courseModel.destroy({ where: { id } });
    return { status: HttpStatus.OK, id };
  }
}
