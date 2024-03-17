import { DataSource } from 'typeorm';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { Test } from '@nestjs/testing';
import { EntityModule } from '@app/entity/EntityModule';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { CourseFactory } from '../../../../../libs/entity/test/factory/CourseFactory';
import { CourseService } from '../../../src/course/CourseService';
import { CourseRepository } from '../../../src/course/CourseRepository';

describe('CourseService', () => {
  let courseService: CourseService;
  let courseFactory: CourseFactory;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getRealDBModule(), EntityModule],
      providers: [CourseService, TransactionService, CourseRepository],
    }).compile();

    dataSource = module.get(DataSource);

    courseService = module.get(CourseService);
    courseFactory = new CourseFactory(dataSource.createEntityManager());
  });

  beforeEach(async () => courseFactory.clear());

  afterAll(async () => dataSource.destroy());

  describe('create', () => {
    it('강의를 생성한다.', async () => {
      // given, when
      await courseService.create('title', 'description', CourseCategory.WEB, 1);

      // then
      const result = await courseFactory.find();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('title');
    });

    it('이미 존재하는 강의가 있는 경우 에러를 발생한다.', async () => {
      // given
      const course = await courseFactory.save();

      // when
      const result = courseService.create(
        course.title,
        course.description,
        course.category,
        1,
      );

      // then
      await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
        `"이미 존재하는 강의명입니다."`,
      );
    });
  });
});
