import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { PageRequest } from '@app/web-common/req/PageRequest';
import { CourseSearchCategory } from '../../type/enum/CourseSearchCategory';
import { CourseSearchCondition } from '../../service/dto/CourseSearchCondition';

export class CourseFindAllRequest extends PageRequest {
  @IsOptional()
  @IsString()
  searchKeyword?: string;

  @IsOptional()
  @IsEnum(CourseSearchCategory)
  searchCategory?: CourseSearchCategory;

  @IsOptional()
  @IsEnum(CourseCategory)
  category?: CourseCategory;

  toCondition() {
    return new CourseSearchCondition(
      this.offset,
      this.limit,
      this.searchKeyword,
      this.searchCategory,
      this.category,
    );
  }
}
