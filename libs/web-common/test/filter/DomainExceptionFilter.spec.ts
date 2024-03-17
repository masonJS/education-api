import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DomainExceptionFilter } from '@app/web-common/filter/DomainExceptionFilter';
import * as request from 'supertest';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { ResponseStatus } from '@app/web-common/res/ResponseStatus';
import { StubLogger } from '../../../logger/test/StubLogger';
import { getTestLogger } from '../../../logger/test/getTestLogger';
import { TestController } from './TestController';

describe('DomainExceptionFilter', () => {
  let app: INestApplication;
  const logger = StubLogger.getInstance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getTestLogger()],
      controllers: [TestController],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalFilters(new DomainExceptionFilter(logger));
    await app.init();
  });

  beforeEach(() => {
    logger.clear();
  });

  afterAll(async () => await app.close());

  it.each([
    ['/bad-request', ResponseStatus.BAD_REQUEST, 'badRequest'],
    ['/not-found', ResponseStatus.NOT_FOUND, 'notFound'],
  ])(
    'domainException 발생시 에러 로그 및 응답을 반환한다.',
    async (path, httpStatus, message) => {
      // given, when
      const result = await request(app.getHttpServer()).get(`${path}`);

      // then
      expect(logger.message).toContain(path);
      expect(logger.message).toContain(message);

      const response: ResponseEntity<string> = result.body;
      expect(response.statusCode).toBe(httpStatus);
      expect(response.message).toBe(message);
    },
  );
});
