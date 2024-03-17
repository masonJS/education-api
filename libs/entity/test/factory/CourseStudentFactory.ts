import { Enrolment } from '@app/entity/domain/course-student/Enrolment.entity';
import { DeepPartial } from 'typeorm';
import { BaseFactory } from './BaseFactory';

export class EnrolmentFactory extends BaseFactory<Enrolment> {
  override entity = Enrolment;

  toEntity(entity?: DeepPartial<Enrolment>): Enrolment {
    return Object.assign(new Enrolment(), {
      ...this.fakeColumns(Enrolment),
      ...entity,
    });
  }

  override makeOne(entity?: DeepPartial<Enrolment>): Enrolment {
    return this.toEntity(entity);
  }
}
