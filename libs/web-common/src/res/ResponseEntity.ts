import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './ResponseStatus';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}
