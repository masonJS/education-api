import { ValueTransformer } from 'typeorm';

export class BigintTransformer implements ValueTransformer {
  // db -> entity
  from(dbValue: string): number | null {
    return parseInt(dbValue, 10) || null;
  }

  // entity -> db
  to(entityValue: number): any {
    return entityValue;
  }
}
