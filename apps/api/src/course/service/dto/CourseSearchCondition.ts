import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { CourseSearchCategory } from '../../type/enum/CourseSearchCategory';

export class CourseSearchCondition {
  constructor(
    public readonly offset: number,
    public readonly limit: number,
    public readonly searchKeyword?: string,
    public readonly searchCategory?: CourseSearchCategory,
    public readonly category?: CourseCategory,
  ) {}

  get hasInstructorName() {
    return (
      !!this.searchKeyword &&
      this.searchCategory === CourseSearchCategory.INSTRUCTOR_NAME
    );
  }

  get hasCourseTitle() {
    return (
      !!this.searchKeyword &&
      this.searchCategory === CourseSearchCategory.COURSE_TITLE
    );
  }

  get hasCategory() {
    return !!this.category;
  }
}
