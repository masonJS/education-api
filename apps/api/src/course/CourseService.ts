import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { Course } from '@app/entity/domain/course/Course.entity';
import { CourseValidator } from './CourseValidator';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseValidator: CourseValidator,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    title: string,
    description: string,
    category: CourseCategory,
    instructorId: number,
  ) {
    await this.courseValidator.duplicateCourseTitle(title);

    await this.transactionService.transaction(async (manager) => {
      const course = Course.create(title, description, category, instructorId);
      await manager.save(course);
    });
  }
}
