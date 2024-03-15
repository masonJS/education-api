import { WebClient } from '@app/web-client/http/client/WebClient';

export abstract class WebClientCreator {
  abstract create(url?: string): WebClient;
}
