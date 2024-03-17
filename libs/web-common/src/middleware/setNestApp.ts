import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GlobalExceptionFilter } from '@app/web-common/filter/GlobalExceptionFilter';
import { DomainExceptionFilter } from '@app/web-common/filter/DomainExceptionFilter';
import { Logger } from '@app/logger/Logger';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(
    new GlobalExceptionFilter(app.get(Logger)),
    new DomainExceptionFilter(app.get(Logger)),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
