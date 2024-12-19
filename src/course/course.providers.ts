import { Course } from './entities/course.entity';

export const CourseProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useValue: Course,
  },
];
