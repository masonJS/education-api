import { Logger } from '@app/logger/Logger';
import { DynamicModule } from '@nestjs/common';
import { StubLogger } from './StubLogger';

export function getTestLogger(): DynamicModule {
  return LoggerModule.register();
}

export class LoggerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: Logger,
          useFactory: () => StubLogger.getInstance(),
        },
      ],
      exports: [Logger],
    };
  }
}
