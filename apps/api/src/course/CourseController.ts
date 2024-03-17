import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { CourseRequest } from './dto/CourseRequest';
import { CourseService } from './CourseService';

@Controller('v1/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() body: CourseRequest) {
    await this.courseService.create(
      body.title,
      body.description,
      body.category,
      body.instructorId,
    );

    return ResponseEntity.OK();
  }
}
