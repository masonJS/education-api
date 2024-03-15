import { WebClient } from '@app/web-client/http/client/WebClient';
import { WebClientCreator } from '@app/web-client/factory/WebClientCreator';
import { FetchClient } from '@app/web-client/http/client/FetchClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchClientCreator extends WebClientCreator {
  create(url?: string): WebClient {
    return new FetchClient(url);
  }
}
