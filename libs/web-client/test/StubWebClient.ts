import { BodyInserter } from '@app/web-client/http/BodyInserter';
import { ResponseSpec } from '@app/web-client/http/ResponseSpec';
import { WebClient } from '@app/web-client/http/client/WebClient';
import { HttpMethod } from '@app/web-client/http/type/HttpMethod';
import { MediaType } from '@app/web-client/http/type/MediaType';

export class StubWebClient implements WebClient {
  private static instance: StubWebClient;

  urls: string[] = [];
  headerList: Record<string, string | string[] | undefined>[] = [];
  methods: HttpMethod[] = [];
  requestBodies: string[] = [];
  requestCount = 0;
  requestTimeout = 5000;

  responses: {
    statusCode: number;
    body: string;
    error?: any;
  }[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(url?: string): StubWebClient {
    if (!StubWebClient.instance) {
      StubWebClient.instance = new StubWebClient();
    }

    if (url) {
      StubWebClient.instance.url(url);
    }

    return StubWebClient.instance;
  }

  get(): this {
    this.methods.push(HttpMethod.GET);

    return this;
  }

  post(): this {
    this.methods.push(HttpMethod.POST);

    return this;
  }

  put(): this {
    this.methods.push(HttpMethod.PUT);

    return this;
  }

  patch(): this {
    this.methods.push(HttpMethod.PATCH);

    return this;
  }

  delete(): this {
    this.methods.push(HttpMethod.DELETE);

    return this;
  }

  url(url: string): this {
    this.urls.push(url);

    return this;
  }

  header(param: Record<string, string | string[]>): this {
    this.headerList.push(param);

    return this;
  }

  accept(mediaType: MediaType): this {
    this.headerList.push({
      ...this.headerList.at(-1),
      'Content-Type': mediaType,
    });

    return this;
  }

  body<T>(body: BodyInserter<T>): this {
    this.accept(body.mediaType);
    this.requestBodies.push(this.parseBody(body.data as any));

    return this;
  }

  timeout(timeout: number): this {
    this.requestTimeout = timeout;

    return this;
  }

  async retrieve(): Promise<ResponseSpec> {
    this.requestCount += 1;

    const response = this.responses.shift();

    if (!response) {
      throw new Error('설정된 응답값이 없습니다');
    }

    if (response.error) {
      throw response.error;
    }

    return new ResponseSpec(response.statusCode, response.body);
  }

  addResponse(
    body: string | Record<string, unknown> | Record<string, unknown>[],
    statusCode = 200,
  ): this {
    this.responses.push({
      statusCode,
      body: this.parseBody(body),
    });

    return this;
  }

  addError(message: string, statusCode = 500) {
    this.responses.push({
      statusCode,
      body: message,
      error: new Error(message),
    });

    return this;
  }

  clear(): this {
    this.urls = [];
    this.headerList = [];
    this.methods = [];
    this.requestBodies = [];
    this.responses = [];
    this.requestCount = 0;

    return this;
  }

  private parseBody(
    body: Record<string, unknown> | string | Buffer | object,
  ): string {
    if (typeof body === 'string' || body instanceof Buffer) {
      return body.toString();
    }

    return JSON.stringify(body);
  }
}
