import { SendEmailCommandOutput } from '@aws-sdk/client-ses';
import { HttpStatus } from '@nestjs/common';

export class SESResponse {
  private readonly statusCode: number;
  private readonly messageId: string;
  private readonly requestId: string;

  constructor(response: SendEmailCommandOutput) {
    this.statusCode = response.$metadata?.httpStatusCode || 0;
    this.messageId = response.MessageId || '';
    this.requestId = response.$metadata?.requestId || '';
  }

  isNotOK(): boolean {
    return this.statusCode !== HttpStatus.OK;
  }

  get message(): string {
    return JSON.stringify({
      statusCode: this.statusCode,
      messageId: this.messageId,
      requestId: this.requestId,
    });
  }
}
