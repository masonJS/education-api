import { BodyInserter } from '@app/web-client/http/BodyInserter';
import got, { ExtendOptions } from 'got';
import { ResponseSpec } from '@app/web-client/http/ResponseSpec';
import { WebClient } from '@app/web-client/http/client/WebClient';
import { MediaType } from '@app/web-client/http/type/MediaType';
import { HttpMethod } from '@app/web-client/http/type/HttpMethod';

export class GotClient implements WebClient {
  readonly #options: ExtendOptions;

  constructor(url?: string, requestTimeout = 5000) {
    this.#options = {
      method: HttpMethod.GET,
      url: url,
      timeout: {
        request: requestTimeout,
      },
    };
  }

  get(): this {
    this.setMethod(HttpMethod.GET);

    return this;
  }

  post(): this {
    this.setMethod(HttpMethod.POST);

    return this;
  }

  put(): this {
    this.setMethod(HttpMethod.PUT);

    return this;
  }

  patch(): this {
    this.setMethod(HttpMethod.PATCH);

    return this;
  }

  delete(): this {
    this.setMethod(HttpMethod.DELETE);

    return this;
  }

  url(url: string): this {
    this.#options.url = url;

    return this;
  }

  header(param: Record<string, string | string[]>): this {
    this.#options.headers = param;

    return this;
  }

  accept(mediaType: MediaType): this {
    this.#options.headers = {
      ...this.#options.headers,
      'Content-Type': mediaType,
    };

    return this;
  }

  body<T>(body: BodyInserter<T>): this {
    this.accept(body.mediaType);

    switch (body.mediaType) {
      case MediaType.APPLICATION_JSON:
        this.#options.json = body.data as Record<string, unknown>;
        break;
      case MediaType.APPLICATION_FORM_URLENCODED:
        this.#options.form = body.data as Record<string, unknown>;
        break;
      default:
        this.#options.body = body.data as any;
    }

    return this;
  }

  timeout(timeout: number): this {
    this.#options.timeout = {
      request: timeout,
    };

    return this;
  }

  async retrieve(): Promise<ResponseSpec> {
    try {
      const response = await got({
        ...this.#options,
        isStream: false,
        resolveBodyOnly: false,
        responseType: 'text',
      });

      return new ResponseSpec(response.statusCode, response.body);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private setMethod(method: HttpMethod): this {
    this.#options.method = method;

    return this;
  }
}
