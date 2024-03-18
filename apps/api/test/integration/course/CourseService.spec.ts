import { DataSource } from 'typeorm';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { Test } from '@nestjs/testing';
import { EntityModule } from '@app/entity/EntityModule';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { CourseFactory } from '../../../../../libs/entity/test/factory/CourseFactory';
import { CourseService } from '../../../src/course/service/CourseService';
import { CourseRepository } from '../../../src/course/CourseRepository';
import { CourseValidator } from '../../../src/course/CourseValidator';
import { InstructorRepository } from '../../../src/instructor/InstructorRepository';
import { InstructorFactory } from '../../../../../libs/entity/test/factory/InstructorFactory';

describe('CourseService', () => {
  let courseService: CourseService;
  let courseFactory: CourseFactory;
  let instructorFactory: InstructorFactory;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getRealDBModule(), EntityModule],
      providers: [
        CourseService,
        CourseValidator,
        TransactionService,
        CourseRepository,
        InstructorRepository,
      ],
    }).compile();

    dataSource = module.get(DataSource);

    courseService = module.get(CourseService);
    courseFactory = new CourseFactory(dataSource.createEntityManager());
    instructorFactory = new InstructorFactory(dataSource.createEntityManager());
  });

  beforeEach(async () =>
    Promise.all([courseFactory.clear(), instructorFactory.clear()]),
  );

  afterAll(async () => dataSource.destroy());

  describe('create', () => {
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

    it('존재하지 않은 강사인 경우 에러를 발생한다.', async () => {
      // given, when
      const result = courseService.create(
        'title',
        'description',
        CourseCategory.WEB,
        1,
      );

      // then
      await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
        `"존재하지 않는 강사입니다."`,
      );
    });

    it('강의를 생성한다.', async () => {
      // given
      const instructor = await instructorFactory.save();

      // when
      await courseService.create(
        'title',
        'description',
        CourseCategory.WEB,
        instructor.id,
      );

      // then
      const result = await courseFactory.find();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('title');
    });
  });
});
