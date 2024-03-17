import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '@app/entity/domain/BaseEntity';
import { Instructor } from '@app/entity/domain/instructor/Instructor.entity';
import { CourseStatus } from '@app/entity/domain/course/type/enum/CourseStatus';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { LocalDateTimeTransformer } from '@app/entity/transformer/LocalDateTimeTransformer';
import { LocalDateTime } from '@js-joda/core';

@Entity()
@Unique('uni_course_1', ['title'])
export class Course extends BaseEntity {
  @Column('varchar', { nullable: true, length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true, length: 50 })
  status: CourseStatus;

  @Column('varchar', { nullable: true, length: 50 })
  category: CourseCategory;

  @Column({
    type: 'timestamptz',
    transformer: new LocalDateTimeTransformer(),
  })
  publishedAt: LocalDateTime;

  @ManyToOne(() => Instructor, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'instructor_id', referencedColumnName: 'id' })
  instructor: Instructor;

  static create(
    title: string,
    description: string,
    category: CourseCategory,
    instructorId: number,
  ) {
    const course = new Course();
    course.title = title;
    course.description = description;
    course.category = category;
    course.status = CourseStatus.DRAFT;
    course.instructor = new Instructor();
    course.instructor.id = instructorId;

    return course;
  }

  update(
    title: string,
    description: string,
    status: CourseStatus,
    category: CourseCategory,
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.category = category;
  }

  publish() {
    this.status = CourseStatus.PUBLISH;
  }
}
