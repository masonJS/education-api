import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { setNestApp } from '@app/web-common/middleware/setNestApp';
import { mock, mockReset } from 'jest-mock-extended';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import * as request from 'supertest';
import { ApiModule } from '../../../src/ApiModule';
import { CourseService } from '../../../src/course/CourseService';
import { CourseRequest } from '../../../src/course/dto/CourseRequest';

describe('CourseController', () => {
  let app: INestApplication;
  const mockCourseService = mock<CourseService>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiModule],
    })
      .overrideProvider(CourseService)
      .useValue(mockCourseService)
      .compile();

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(() => {
    mockReset(mockCourseService);
  });

  afterAll(async () => app.close());

  it('POST /v1/course 강의를 생성한다.', async () => {
    // given
    const dto = new CourseRequest();
    dto.title = 'title';
    dto.description = 'description';
    dto.category = CourseCategory.DATA;
    dto.instructorId = 1;

    mockCourseService.create.mockResolvedValue();

    // when
    const response = await request(app.getHttpServer())
      .post('/api/v1/course')
      .send(dto);

    // then
    expect(response.body).toMatchInlineSnapshot(`
      {
        "data": "",
        "message": "",
        "statusCode": "OK",
      }
    `);
  });
});
