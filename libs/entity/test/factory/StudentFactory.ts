import { Student } from '@app/entity/domain/student/Student.entity';
import { DeepPartial } from 'typeorm';
import { BaseFactory } from './BaseFactory';

export class StudentFactory extends BaseFactory<Student> {
  override entity = Student;

  toEntity(entity?: DeepPartial<Student>): Student {
    return Object.assign(new Student(), {
      ...this.fakeColumns(Student),
      ...entity,
    });
  }

  override makeOne(entity?: DeepPartial<Student>): Student {
    return this.toEntity(entity);
  }
}
