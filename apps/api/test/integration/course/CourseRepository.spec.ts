import { Test } from '@nestjs/testing';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { EntityModule } from '@app/entity/EntityModule';
import { DataSource } from 'typeorm';
import { CourseRepository } from '../../../src/course/CourseRepository';
import { CourseFactory } from '../../../../../libs/entity/test/factory/CourseFactory';
import { expectNonNullable } from '../../../../../libs/web-common/test/util/expect/expectNonNullable';

describe('CourseRepository', () => {
  let courseRepository: CourseRepository;
  let courseFactory: CourseFactory;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getRealDBModule(), EntityModule],
      providers: [CourseRepository],
    }).compile();

    dataSource = module.get(DataSource);

    courseRepository = module.get(CourseRepository);
    courseFactory = new CourseFactory(dataSource.createEntityManager());
  });

  beforeEach(async () => courseFactory.clear());

  afterAll(async () => dataSource.destroy());

  describe('findOneByTitle', () => {
    it('강의 명에 해당하는 강의가 없는 경우 null을 반환한다.', async () => {
      // given, when
      const result = await courseRepository.findOneByTitle('no course');

      // then
      expect(result).toBeNull();
    });

    it('강의 명을 통해 강의를 조회한다.', async () => {
      // given
      const course = await courseFactory.save();

      // when
      const result = await courseRepository.findOneByTitle(course.title);

      // then
      expectNonNullable(result);
      expect(result.title).toBe(course.title);
    });
  });
});
