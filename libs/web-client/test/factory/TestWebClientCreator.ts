import { WebClientCreator } from '@app/web-client/factory/WebClientCreator';
import { WebClient } from '@app/web-client/http/client/WebClient';
import { StubWebClient } from '../StubWebClient';

export class TestWebClientCreator extends WebClientCreator {
  create(url?: string): WebClient {
    return StubWebClient.getInstance(url);
  }
}
