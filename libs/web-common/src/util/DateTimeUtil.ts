import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from '@js-joda/core';

export class DateTimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    'yyyy-MM-dd HH:mm:ss',
  );

  static toString(localDate: LocalDate | LocalDateTime | null): string {
    if (!localDate) {
      return '';
    }

    if (localDate instanceof LocalDate) {
      return localDate.format(this.DATE_FORMATTER);
    }

    return localDate.format(this.DATE_TIME_FORMATTER);
  }

  static toDate(localDate: LocalDate | LocalDateTime): Date {
    return convert(localDate).toDate();
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    return LocalDateTime.from(nativeJs(date));
  }
}
