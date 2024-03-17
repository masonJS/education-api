import { Logger } from '@app/logger/Logger';
import { Global, Module } from '@nestjs/common';
import { createLogger } from 'winston';
import { getWinstonLoggerOption } from '@app/logger/getWinstonLoggerOption';

@Global()
@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => createLogger(getWinstonLoggerOption()),
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
