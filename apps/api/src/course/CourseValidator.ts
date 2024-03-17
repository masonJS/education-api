import { Injectable } from '@nestjs/common';
import { DomainException } from '@app/web-common/res/exception/DomainException';
import { CourseRepository } from './CourseRepository';
import { InstructorRepository } from '../instructor/InstructorRepository';

@Injectable()
export class CourseValidator {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly instructorRepository: InstructorRepository,
  ) {}

  async duplicateCourseTitle(title: string) {
    const course = await this.courseRepository.findOneByTitle(title);

    if (course) {
      throw DomainException.BadRequest({
        message: '이미 존재하는 강의명입니다.',
      });
    }
  }

  async existInstructor(instructorId: number) {
    const instructor = await this.instructorRepository.findOneById(
      instructorId,
    );

    if (!instructor) {
      throw DomainException.BadRequest({
        message: '존재하지 않는 강사입니다.',
      });
    }
  }
}
