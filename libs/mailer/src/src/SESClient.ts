import { Injectable } from '@nestjs/common';
import {
  SendEmailCommand,
  SESClient as AwsSESClient,
} from '@aws-sdk/client-ses';
import { SESResponse } from '@app/mailer/src/SESResponse';
import { DomainException } from '@app/web-common/res/exception/DomainException';

@Injectable()
export class SESClient {
  constructor(private readonly client: AwsSESClient) {}

  async send(command: SendEmailCommand): Promise<SESResponse> {
    let response: SESResponse;

    try {
      response = await this.getResponse(command);
    } catch (err) {
      throw DomainException.BusinessError({
        message: '메일 전송 실패',
        parameter: {
          command: JSON.stringify(command),
          error: err.message,
        },
      });
    }

    if (response.isNotOK()) {
      throw DomainException.BusinessError({
        message: '메일 전송 실패',
        parameter: {
          command: JSON.stringify(command),
          error: response.message,
        },
      });
    }

    return response;
  }

  private async getResponse(command: SendEmailCommand): Promise<SESResponse> {
    const response = await this.client.send(command);

    return new SESResponse(response);
  }
}
