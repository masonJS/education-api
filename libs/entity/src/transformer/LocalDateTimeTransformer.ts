import { convert, LocalDateTime, nativeJs } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

export class LocalDateTimeTransformer implements ValueTransformer {
  // db -> entity
  from(dbValue: Date): LocalDateTime {
    return LocalDateTime.from(nativeJs(dbValue));
  }

  // entity -> db
  to(entityValue: LocalDateTime): Date {
    return convert(entityValue).toDate();
  }
}
