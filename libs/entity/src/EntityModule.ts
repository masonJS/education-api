import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrolment } from '@app/entity/domain/course-student/Enrolment.entity';
import { Instructor } from '@app/entity/domain/instructor/Instructor.entity';
import { Student } from '@app/entity/domain/student/Student.entity';
import { Course } from '@app/entity/domain/course/Course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrolment, Instructor, Student])],
  exports: [TypeOrmModule],
})
export class EntityModule {}
