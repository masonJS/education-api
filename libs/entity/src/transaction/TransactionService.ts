import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

export type TransactionFunction<T = void> = (
  manager: EntityManager,
) => Promise<T>;

@Injectable()
export class TransactionService {
  constructor(private dataSource: DataSource) {}

  async transaction<T>(fn: TransactionFunction<T>): Promise<T> {
    return this.dataSource.transaction(fn);
  }
}
