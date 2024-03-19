import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from '@app/entity/domain/course/Course.entity';
import { BigintTransformer } from '@app/entity/transformer/BigintTransformer';
import { Student } from '@app/entity/domain/student/Student.entity';

@Entity()
export class Enrolment {
  @PrimaryColumn({
    type: 'bigint',
    transformer: new BigintTransformer(),
  })
  courseId: number;

  @PrimaryColumn({
    type: 'bigint',
    transformer: new BigintTransformer(),
  })
  studentId: number;

  @ManyToOne(() => Course, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;

  @ManyToOne(() => Student, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  static create(courseId: number, studentId: number): Enrolment {
    const enrolment = new Enrolment();
    enrolment.courseId = courseId;
    enrolment.studentId = studentId;

    return enrolment;
  }
}
