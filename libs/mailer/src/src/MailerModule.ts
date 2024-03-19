import { DynamicModule } from '@nestjs/common';
import {
  SESClient as AWSSESClient,
  SESClientConfig,
} from '@aws-sdk/client-ses';
import { Configuration } from '@app/config/Configuration';
import { Mailer } from './Mailer';
import { SESClient } from './SESClient';

export function getMailerModule() {
  const sesEnv = Configuration.getEnv().ses;

  return MailerModule.register(sesEnv.toSESClientConfig());
}

class MailerModule {
  static register(config: SESClientConfig): DynamicModule {
    return {
      global: true,
      module: MailerModule,
      providers: [
        Mailer,
        SESClient,
        {
          provide: AWSSESClient,
          useValue: new AWSSESClient(config),
        },
      ],
      exports: [Mailer],
    };
  }
}
