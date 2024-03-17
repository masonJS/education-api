import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from '@app/entity/domain/instructor/Instructor.entity';

@Injectable()
export class InstructorRepository {
  constructor(
    @InjectRepository(Instructor)
    private readonly repository: Repository<Instructor>,
  ) {}

  async findOneById(id: number): Promise<Instructor | null> {
    return this.repository.findOneBy({ id });
  }
}
