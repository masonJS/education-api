import { ResponseDto } from '@app/web-common/decorator/ResponseDto';
import { Expose, instanceToPlain } from 'class-transformer';

describe('ResponseDto decorator', () => {
  it('get 메소드에 @Expose 데코레이터를 선언다.', () => {
    // given
    @ResponseDto()
    class Sample {
      private readonly _field: string;

      constructor(field: string) {
        this._field = field;
      }

      get getField() {
        return this._field;
      }
    }

    const sample = new Sample('test');

    // when
    const result = instanceToPlain(sample);

    // then
    expect(result).toStrictEqual({ getField: 'test' });
  });

  it('expose 데코레이터를 가진 get 메소드는 우선시 한다.', () => {
    // given
    @ResponseDto()
    class Sample {
      _field: string;

      constructor(field: string) {
        this._field = field;
      }

      @Expose({ name: 'exchangeField' })
      get getField() {
        return this._field;
      }
    }

    const sample = new Sample('test');

    // when
    const result = instanceToPlain(sample);

    // then
    expect(result).toStrictEqual({ exchangeField: 'test' });
  });
});
