import { Exclude, Expose } from 'class-transformer';

export class Page<T> {
  @Exclude() private readonly _pageNumber: number;
  @Exclude() private readonly _pageSize: number;
  @Exclude() private readonly _totalCount: number;
  @Exclude() private readonly _totalPage: number;
  @Exclude() private readonly _items: T[];

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

  @Expose()
  get pageNumber(): number {
    return this._pageNumber;
  }

  @Expose()
  get pageSize(): number {
    return this._pageSize;
  }

  @Expose()
  get totalCount(): number {
    return this._totalCount;
  }

  @Expose()
  get totalPage(): number {
    return this._totalPage;
  }

  @Expose()
  get items(): T[] {
    return this._items;
  }
}
