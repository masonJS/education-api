import { Injectable } from '@nestjs/common';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SESClient } from '@app/mailer/src/SESClient';
import { SendEmailCommandOptions } from '@app/mailer/src/SendEmailCommandOptions';

@Injectable()
export class Mailer {
  constructor(private readonly sesClientService: SESClient) {}

  async send(
    from: string,
    to: string,
    subject: string,
    content: string,
    cc?: string[],
  ): Promise<void> {
    const command = new SendEmailCommand(
      new SendEmailCommandOptions(from, to, subject, content, cc).commandInput,
    );
    await this.sesClientService.send(command);
  }
}
