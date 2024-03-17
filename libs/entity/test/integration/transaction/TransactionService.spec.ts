import { DataSource, Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { TestEntity, TestTransactionService } from './TestTransactionService';

describe('TestTransactionService', () => {
  let testEntityRepository: Repository<TestEntity>;
  let service: TestTransactionService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getRealDBModule(), TypeOrmModule.forFeature([TestEntity])],
      providers: [TestTransactionService, TransactionService],
    }).compile();

    service = module.get(TestTransactionService);
    testEntityRepository = module.get(getRepositoryToken(TestEntity));

    dataSource = module.get(DataSource);
  });

  beforeEach(async () => testEntityRepository.clear());

  afterAll(async () => await dataSource.destroy());

  describe('transaction', () => {
    it('에러가 발생하면 트랜잭션이 rollback 된다', async () => {
      // when
      const result = service.transaction(true);

      // then
      await expect(result).rejects.toThrowError('rollback');
      const count = await testEntityRepository.count();
      expect(count).toBe(0);
    });

    it('에러가 발생하지 않으면 트랜잭션이 성공한다', async () => {
      // when
      await service.transaction(false);

      // then
      const count = await testEntityRepository.count();

      expect(count).toBe(1);
    });
  });
});
