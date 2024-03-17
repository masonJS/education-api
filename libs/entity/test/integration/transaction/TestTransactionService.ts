import { Injectable } from '@nestjs/common';
import { TransactionService } from '@app/entity/transaction/TransactionService';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
export class TestTransactionService {
  constructor(private readonly transactionService: TransactionService) {}

  async transaction(shouldRollback: boolean) {
    await this.transactionService.transaction(async (manager) => {
      const testEntity = new TestEntity();
      testEntity.name = 'test';

      await manager.save(testEntity);

      if (shouldRollback) {
        throw new Error('rollback');
      }
    });
  }
}

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
