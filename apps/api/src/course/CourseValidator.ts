import { Injectable } from '@nestjs/common';
import { DomainException } from '@app/web-common/res/exception/DomainException';
import { CourseRepository } from './CourseRepository';

@Injectable()
export class CourseValidator {
  constructor(private readonly courseRepository: CourseRepository) {}

  async duplicateCourseTitle(title: string) {
    const course = await this.courseRepository.findOneByTitle(title);

    if (course) {
      throw DomainException.BadRequest({
        message: '이미 존재하는 강의명입니다.',
      });
    }
  }
}
