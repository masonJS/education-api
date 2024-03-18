import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';

export class CourseCreateRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CourseCategory)
  category: CourseCategory;

  @IsInt()
  @IsNotEmpty()
  instructorId: number;
}
