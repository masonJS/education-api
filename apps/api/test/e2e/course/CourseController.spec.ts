import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { setNestApp } from '@app/web-common/middleware/setNestApp';
import { mock, mockReset } from 'jest-mock-extended';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import * as request from 'supertest';
import { Course } from '@app/entity/domain/course/Course.entity';
import { Instructor } from '@app/entity/domain/instructor/Instructor.entity';
import { ApiModule } from '../../../src/ApiModule';
import { CourseService } from '../../../src/course/service/CourseService';
import { CourseCreateRequest } from '../../../src/course/controller/dto/CourseCreateRequest';
import { CourseFindAllRequest } from '../../../src/course/controller/dto/CourseFindAllRequest';
import { CourseSearchCategory } from '../../../src/course/type/enum/CourseSearchCategory';

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
    const dto = new CourseCreateRequest();
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

  it('GET /v1/course 강의 목록을 조회한다.', async () => {
    // given
    const dto = new CourseFindAllRequest();
    dto.category = CourseCategory.DATA;
    dto.searchKeyword = 'searchKeyword';
    dto.searchCategory = CourseSearchCategory.COURSE_TITLE;

    const instructor = new Instructor();
    instructor.id = 1;
    instructor.name = 'name';

    const course = Course.create(
      'title',
      'description',
      CourseCategory.DATA,
      instructor.id,
    );

    mockCourseService.findAll.mockResolvedValue([[course], 1]);

    // when
    const response = await request(app.getHttpServer())
      .get('/api/v1/course')
      .send(dto);

    // then
    expect(response.body).toMatchInlineSnapshot(`
      {
        "data": {
          "items": [
            {
              "category": 2,
              "description": "description",
              "title": "title",
            },
          ],
          "pageNumber": 1,
          "pageSize": 1,
          "totalCount": 10,
          "totalPage": 10,
        },
        "message": "",
        "statusCode": "OK",
      }
    `);
  });
});
