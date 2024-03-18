import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { CourseCreateRequest } from './dto/CourseCreateRequest';
import { CourseService } from '../service/CourseService';
import { CourseFindAllRequest } from './dto/CourseFindAllRequest';
import { CourseFindAllResponse } from './dto/CourseFindAllResponse';

@Controller('v1/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() body: CourseCreateRequest) {
    await this.courseService.create(
      body.title,
      body.description,
      body.category,
      body.instructorId,
    );

    return ResponseEntity.OK();
  }

  @Get()
  async findAll(@Query() query: CourseFindAllRequest) {
    const courses = await this.courseService.findAll(query.toCondition());

    return ResponseEntity.OK_WITH(
      courses.map(
        (course) =>
          new CourseFindAllResponse(
            course.id,
            course.title,
            course.description,
            course.category,
            course.instructorName,
          ),
      ),
    );
  }
}
