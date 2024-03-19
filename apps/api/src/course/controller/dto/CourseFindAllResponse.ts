import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { ResponseDto } from '@app/web-common/decorator/ResponseDto';

@ResponseDto()
export class CourseFindAllResponse {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _category: CourseCategory;
  private readonly _instructorName: string;

  constructor(
    id: number,
    title: string,
    description: string,
    category: CourseCategory,
    instructorName: string,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._category = category;
    this._instructorName = instructorName;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get category(): CourseCategory {
    return this._category;
  }

  get instructorName(): string {
    return this._instructorName;
  }
}
