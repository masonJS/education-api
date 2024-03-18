import { Test } from '@nestjs/testing';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { EntityModule } from '@app/entity/EntityModule';
import { DataSource } from 'typeorm';
import { CourseStatus } from '@app/entity/domain/course/type/enum/CourseStatus';
import { CourseCategory } from '@app/entity/domain/course/type/enum/CourseCategory';
import { CourseRepository } from '../../../src/course/CourseRepository';
import { CourseFactory } from '../../../../../libs/entity/test/factory/CourseFactory';
import { expectNonNullable } from '../../../../../libs/web-common/test/util/expect/expectNonNullable';
import { CourseSearchCondition } from '../../../src/course/service/dto/CourseSearchCondition';
import { InstructorFactory } from '../../../../../libs/entity/test/factory/InstructorFactory';
import { CourseSearchCategory } from '../../../src/course/type/enum/CourseSearchCategory';

describe('CourseRepository', () => {
  let courseRepository: CourseRepository;
  let courseFactory: CourseFactory;
  let instructorFactory: InstructorFactory;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getRealDBModule(), EntityModule],
      providers: [CourseRepository],
    }).compile();

    dataSource = module.get(DataSource);

    courseRepository = module.get(CourseRepository);
    courseFactory = new CourseFactory(dataSource.createEntityManager());
    instructorFactory = new InstructorFactory(dataSource.createEntityManager());
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

  describe('findAll', () => {
    it('조회되는 강의가 없을시 빈 배열을 반환한다.', async () => {
      // given
      const condition = new CourseSearchCondition(0, 10);

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(0);
    });

    it('강의 목록을 조회한다.', async () => {
      // given
      const condition = new CourseSearchCondition(0, 10);
      const instructor = await instructorFactory.save();
      const course = await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
      });

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(1);
      expect(courses[0].title).toBe(course.title);
      expect(courses[0].instructorName).toBe(instructor.name);
    });

    it('카테고리 기준으로 강의 목록을 조회한다.', async () => {
      // given
      const searchCategory = CourseCategory.DATA;
      const condition = new CourseSearchCondition(
        0,
        10,
        undefined,
        undefined,
        searchCategory,
      );
      const instructor = await instructorFactory.save();
      const course = await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
        category: searchCategory,
      });
      await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
        category: CourseCategory.APP,
      });

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(1);
      expect(courses[0].title).toBe(course.title);
    });

    it('강의 명 기준으로 강의 목록을 조회한다.', async () => {
      // given
      const searchKeyword = 'course_title';
      const condition = new CourseSearchCondition(
        0,
        10,
        searchKeyword,
        CourseSearchCategory.COURSE_TITLE,
      );
      const instructor = await instructorFactory.save();
      const course = await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
        title: searchKeyword,
      });
      await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
      });

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(1);
      expect(courses[0].title).toBe(course.title);
    });

    it('강사 명 기준으로 강의 목록을 조회한다.', async () => {
      // given
      const searchKeyword = 'instructor_name';
      const condition = new CourseSearchCondition(
        0,
        10,
        searchKeyword,
        CourseSearchCategory.INSTRUCTOR_NAME,
      );
      const course = await courseFactory.save({
        instructor: await instructorFactory.save({
          name: searchKeyword,
        }),
        status: CourseStatus.PUBLISH,
      });
      await courseFactory.save({
        instructor: await instructorFactory.save(),
        status: CourseStatus.PUBLISH,
      });

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(1);
      expect(courses[0].title).toBe(course.title);
    });

    it('강의 목록을 페이징 단위로 페이지네이션을 한다.', async () => {
      // given
      const condition = new CourseSearchCondition(0, 1);
      const instructor = await instructorFactory.save();
      const course = await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
      });
      await courseFactory.save({
        instructor,
        status: CourseStatus.PUBLISH,
      });

      // when
      const [courses] = await courseRepository.findAll(condition);

      // then
      expect(courses).toHaveLength(1);
      expect(courses[0].title).toBe(course.title);
    });
  });
});
