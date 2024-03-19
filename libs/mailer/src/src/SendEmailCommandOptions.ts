import { SendEmailCommandInput } from '@aws-sdk/client-ses';

export class SendEmailCommandOptions {
  private readonly from: string;
  private readonly to: string;
  private readonly subject: string;
  private readonly content: string;
  private readonly cc: string[];

  constructor(
    from: string,
    to: string,
    subject: string,
    content: string,
    cc?: string[],
  ) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.content = content;
    this.cc = cc || [];
  }

  get commandInput(): SendEmailCommandInput {
    return {
      Source: this.from,
      Destination: {
        ToAddresses: [this.to],
        CcAddresses: this.cc,
      },
      Message: {
        Subject: {
          Data: this.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: this.content,
            Charset: 'UTF-8',
          },
        },
      },
    };
  }
}
