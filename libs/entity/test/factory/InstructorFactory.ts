import { Instructor } from '@app/entity/domain/instructor/Instructor.entity';
import { DeepPartial } from 'typeorm';
import { BaseFactory } from './BaseFactory';

export class InstructorFactory extends BaseFactory<Instructor> {
  override entity = Instructor;

  toEntity(entity?: DeepPartial<Instructor>): Instructor {
    return Object.assign(new Instructor(), {
      ...this.fakeColumns(Instructor),
      ...entity,
    });
  }

  override makeOne(entity?: DeepPartial<Instructor>): Instructor {
    return this.toEntity(entity);
  }
}
