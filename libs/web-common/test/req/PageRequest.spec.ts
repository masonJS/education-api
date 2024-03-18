import 'reflect-metadata';
import { PageRequest } from '@app/web-common/req/PageRequest';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe('PageRequest 테스트를 수행합니다.', () => {
  describe('pageNumber', () => {
    it('1 이상의 값을 정상적으로 숫자값이 반환된다', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageNumber: 1,
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageNumberErrors = validationErrors.filter(
        (error) => error.property === 'pageNumber',
      );

      //then
      expect(pageRequest.pageNumber).toBe(1);
      expect(pageNumberErrors).toHaveLength(0);
    });

    it('숫자 문자열 값이면 숫자형 값으로 반환된다.', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageNumber: '123',
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageNumberErrors = validationErrors.filter(
        (error) => error.property === 'pageNumber',
      );

      //then
      expect(pageRequest.pageNumber).toBe(123);
      expect(pageNumberErrors).toHaveLength(0);
    });

    it('문자열 값이면 에러가 발생한다.', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageNumber: '1asd12ads',
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageNumberErrors = validationErrors.filter(
        (error) => error.property === 'pageNumber',
      );

      //then
      expect(pageRequest.pageNumber).toBeNaN();
      expect(pageNumberErrors).toHaveLength(1);
      expect(pageNumberErrors[0].constraints).toMatchInlineSnapshot(`
        {
          "isInt": "pageNumber must be an integer number",
          "max": "pageNumber must not be greater than 9007199254740991",
          "min": "pageNumber must not be less than 1",
        }
      `);
    });
  });

  describe('pageSize', () => {
    it('1 이상을 값이면 정상적으로 숫자값이 반환된다', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageSize: 1,
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageSizeErrors = validationErrors.filter(
        (error) => error.property === 'pageSize',
      );

      //then
      expect(pageRequest.pageSize).toBe(1);
      expect(pageSizeErrors).toHaveLength(0);
    });

    it('0 이하 값이, 에러가 발생한다.', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageSize: 0,
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageSizeErrors = validationErrors.filter(
        (error) => error.property === 'pageSize',
      );

      //then
      expect(pageSizeErrors[0].constraints).toStrictEqual({
        min: 'pageSize must not be less than 1',
      });
    });

    it('숫자 문자열 값이면 숫자형으로 반환된다.', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageSize: '123',
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageSizeErrors = validationErrors.filter(
        (error) => error.property === 'pageSize',
      );

      //then
      expect(pageRequest.pageSize).toBe(123);
      expect(pageSizeErrors).toHaveLength(0);
    });

    it('문자열을 값이면 에러가 발생한다.', async () => {
      //given
      const pageRequest = plainToClass(TestPageRequest, {
        pageSize: '1asd12ads',
      });

      //when
      const validationErrors = await validate(pageRequest);
      const pageSizeErrors = validationErrors.filter(
        (error) => error.property === 'pageSize',
      );

      //then
      expect(pageRequest.pageSize).toBeNaN();
      expect(pageSizeErrors).toHaveLength(1);
      expect(pageSizeErrors[0].constraints).toMatchInlineSnapshot(`
      {
        "isInt": "pageSize must be an integer number",
        "max": "pageSize must not be greater than 9007199254740991",
        "min": "pageSize must not be less than 1",
      }
    `);
    });
  });
});

class TestPageRequest extends PageRequest {
  constructor() {
    super();
  }
}
