import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '@app/entity/domain/BaseEntity';

@Entity()
@Unique('uni_student_1', ['name'])
export class Student extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;
}
