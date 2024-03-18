import { Module } from '@nestjs/common';
import { EntityModule } from '@app/entity/EntityModule';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { CourseController } from './controller/CourseController';
import { CourseService } from './service/CourseService';
import { CourseRepository } from './CourseRepository';
import { CourseValidator } from './CourseValidator';
import { InstructorRepository } from '../instructor/InstructorRepository';

@Module({
  imports: [EntityModule],
  controllers: [CourseController],
  providers: [
    TransactionService,
    CourseService,
    CourseRepository,
    CourseValidator,
    InstructorRepository,
  ],
})
export class CourseModule {}
