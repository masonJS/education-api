import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '@app/entity/domain/course/Course.entity';
import { Repository } from 'typeorm';
import { CourseStatus } from '@app/entity/domain/course/type/enum/CourseStatus';
import { CourseSearchCondition } from './service/dto/CourseSearchCondition';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {}

  async findOneByTitle(title: string): Promise<Course | null> {
    return await this.repository.findOneBy({
      title,
    });
  }

  async findAll(condition: CourseSearchCondition) {
    const queryBuilder = this.repository
      .createQueryBuilder('course')
      .select(['course', 'instructor.name'])
      .innerJoin('course.instructor', 'instructor')
      .where('course.status = :status', { status: CourseStatus.PUBLISH });

    if (condition.hasCategory) {
      queryBuilder.andWhere('course.category = :category', {
        category: condition.category,
      });
    }

    if (condition.hasInstructorName) {
      queryBuilder.andWhere('instructor.name = :instructorName', {
        instructorName: condition.searchKeyword,
      });
    }

    if (condition.hasCourseTitle) {
      queryBuilder.andWhere('course.title = :courseTitle', {
        courseTitle: condition.searchKeyword,
      });
    }

    return queryBuilder
      .offset(condition.offset)
      .limit(condition.limit)
      .getMany();
  }
}
