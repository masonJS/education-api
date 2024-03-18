import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { Exclude, Expose } from 'class-transformer';

export class CourseFindAllResponse {
  @Exclude() private readonly _id: number;

  @Exclude() private readonly _title: string;

  @Exclude() private readonly _description: string;

  @Exclude() private readonly _category: CourseCategory;

  @Exclude() private readonly _instructorName: string;

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

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get title(): string {
    return this._title;
  }

  @Expose()
  get description(): string {
    return this._description;
  }

  @Expose()
  get category(): CourseCategory {
    return this._category;
  }

  @Expose()
  get instructorName(): string {
    return this._instructorName;
  }
}
