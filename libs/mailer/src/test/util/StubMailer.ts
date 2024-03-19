import { Mailer } from '@app/mailer/src/Mailer';
import { SESClient } from '@aws-sdk/client-ses';

export class StubMailer extends Mailer {
  from: string;
  to: string;
  subject: string;
  content: string;

  constructor() {
    super(Object.create(SESClient));
  }

  clear() {
    this.from = '';
    this.to = '';
    this.subject = '';
    this.content = '';

    return undefined;
  }

  override async send(
    from: string,
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.content = content;
  }
}
