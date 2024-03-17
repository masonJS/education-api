import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { DomainException } from '@app/web-common/res/exception/DomainException';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { Course } from '@app/entity/domain/course/Course.entity';
import { CourseRepository } from './CourseRepository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    title: string,
    description: string,
    category: CourseCategory,
    instructorId: number,
  ) {
    const course = await this.courseRepository.findOneByTitle(title);

    if (course) {
      throw DomainException.BadRequest({
        message: '이미 존재하는 강의명입니다.',
      });
    }

    await this.transactionService.transaction(async (manager) => {
      const course = Course.create(title, description, category, instructorId);
      await manager.save(course);
    });
  }
}
