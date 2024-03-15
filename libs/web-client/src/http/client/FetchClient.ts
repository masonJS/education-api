import { BodyInserter } from '@app/web-client/http/BodyInserter';
import { ResponseSpec } from '@app/web-client/http/ResponseSpec';
import { WebClient } from '@app/web-client/http/client/WebClient';
import { MediaType } from '@app/web-client/http/type/MediaType';
import { HttpMethod } from '@app/web-client/http/type/HttpMethod';

export class FetchClient implements WebClient {
  #url: string;
  #timeout: number;
  readonly #options: RequestInit;

  constructor(url?: string, requestTimeout = 5000) {
    if (url) {
      this.#url = url;
    }
    this.#options = {
      method: HttpMethod.GET,
    };
    this.#timeout = requestTimeout;
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
    this.#url = url;

    return this;
  }

  header(param: Record<string, string>): this {
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
        this.#options.body = JSON.stringify(body.data);
        break;
      case MediaType.APPLICATION_FORM_URLENCODED:
        this.#options.body = new URLSearchParams(body.data as any);
        break;
      default:
        this.#options.body = body.data as any;
    }

    return this;
  }

  timeout(timeout: number): this {
    this.#timeout = timeout;

    return this;
  }

  async retrieve(): Promise<ResponseSpec> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.#timeout);
      const response = await fetch(this.#url, {
        ...this.#options,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      return new ResponseSpec(response.status, await response.text());
    } catch (e) {
      throw new Error(e);
    }
  }

  private setMethod(method: HttpMethod): this {
    this.#options.method = method;

    return this;
  }
}
