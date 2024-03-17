import { Course } from '@app/entity/domain/course/Course.entity';
import { DeepPartial } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BaseFactory } from './BaseFactory';

export class CourseFactory extends BaseFactory<Course> {
  override entity = Course;

  toEntity(entity?: DeepPartial<Course>): Course {
    return Object.assign(new Course(), {
      ...this.fakeColumns(Course),
      title: faker.lorem.word(),
      ...entity,
    });
  }

  override makeOne(entity?: DeepPartial<Course>): Course {
    return this.toEntity(entity);
  }
}
