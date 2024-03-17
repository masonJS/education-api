import { Module } from '@nestjs/common';
import { EntityModule } from '@app/entity/EntityModule';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { CourseController } from './CourseController';
import { CourseService } from './CourseService';
import { CourseRepository } from './CourseRepository';

@Module({
  imports: [EntityModule],
  controllers: [CourseController],
  providers: [TransactionService, CourseService, CourseRepository],
})
export class CourseModule {}
