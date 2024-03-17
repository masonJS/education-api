import { BaseEntity } from '@app/entity/domain/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Instructor extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;
}
