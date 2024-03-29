import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { Course } from '@app/entity/domain/course/Course.entity';
import { CourseValidator } from '../CourseValidator';
import { CourseSearchCondition } from './dto/CourseSearchCondition';
import { CourseRepository } from '../CourseRepository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseValidator: CourseValidator,
    private readonly transactionService: TransactionService,
    private readonly courseRepository: CourseRepository,
  ) {}

  async create(
    title: string,
    description: string,
    category: CourseCategory,
    instructorId: number,
  ) {
    await this.courseValidator.duplicateCourseTitle(title);
    await this.courseValidator.existInstructor(instructorId);

    await this.transactionService.transaction(async (manager) => {
      const course = Course.create(title, description, category, instructorId);
      await manager.save(course);
    });
  }

  async findAll(condition: CourseSearchCondition) {
    return await this.courseRepository.findAll(condition);
  }
}
