import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export abstract class PageRequest {
  private static DEFAULT_PAGE_NUMBER = 1;
  private static DEFAULT_PAGE_SIZE = 10;
  /**
   * NestJS가 JSON을 자동으로 치환을 해주기 위해서는 public
   */
  @Type(() => Number)
  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(1)
  pageNumber: number = PageRequest.DEFAULT_PAGE_NUMBER;

  @Type(() => Number)
  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(1)
  pageSize: number = PageRequest.DEFAULT_PAGE_SIZE;

  /**
   * Query 에서 사용할 Offset
   */
  get offset(): number {
    const pageNumber = this.pageNumber || PageRequest.DEFAULT_PAGE_NUMBER;

    return (pageNumber - 1) * this.limit;
  }

  /**
   * Query 에서 사용할 limit
   */
  get limit(): number {
    if (!this.pageSize) {
      return PageRequest.DEFAULT_PAGE_SIZE;
    }

    return this.pageSize;
  }
}
