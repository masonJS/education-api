import { ResponseDto } from '@app/web-common/decorator/ResponseDto';

@ResponseDto()
export class Page<T> {
  private readonly _pageNumber: number;
  private readonly _pageSize: number;
  private readonly _totalCount: number;
  private readonly _totalPage: number;
  private readonly _items: T[];

  constructor(
    pageNumber: number,
    totalCount: number,
    pageSize: number,
    items: T[],
  ) {
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
    this._totalCount = totalCount;
    this._totalPage = Math.ceil(totalCount / pageSize);
    this._items = items;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get totalPage(): number {
    return this._totalPage;
  }

  get items(): T[] {
    return this._items;
  }
}
