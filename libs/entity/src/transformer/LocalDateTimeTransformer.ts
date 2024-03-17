import { LocalDateTime } from '@js-joda/core';
import { FindOperator, ValueTransformer } from 'typeorm';
import { DateTimeUtil } from '@app/web-common/util/DateTimeUtil';

export class LocalDateTimeTransformer implements ValueTransformer {
  // db -> entity
  from(databaseValue?: Date): LocalDateTime | null {
    if (!databaseValue) {
      return null;
    }

    return DateTimeUtil.toLocalDateTime(databaseValue);
  }

  // entity -> db
  to(
    entityValue?: LocalDateTime | FindOperator<any>,
  ): Date | FindOperator<any> | null {
    if (!entityValue) {
      return null;
    }

    if (entityValue instanceof FindOperator) {
      return entityValue;
    }

    return DateTimeUtil.toDate(entityValue);
  }
}
