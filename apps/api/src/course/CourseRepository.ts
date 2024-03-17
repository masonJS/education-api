import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '@app/entity/domain/course/Course.entity';
import { Repository } from 'typeorm';

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
}
