import { Logger } from '@app/logger/Logger';

export class StubLogger extends Logger {
  private static logger = new StubLogger();

  message: string;
  err?: Error;
  logLevel?: string;

  private constructor() {
    super();
  }

  static getInstance() {
    return StubLogger.logger;
  }

  override debug(message: string, error?: Error): void {
    this.message = message;
    this.err = error;
    this.logLevel = 'debug';
  }

  override error(message: string, error?: Error): void {
    this.message = message;
    this.err = error;
    this.logLevel = 'error';
  }

  override warn(message: string, error?: Error): void {
    this.message = message;
    this.err = error;
    this.logLevel = 'warn';
  }

  override info(message: string, error?: Error): void {
    this.message = message;
    this.err = error;
    this.logLevel = 'info';
  }

  clear() {
    this.message = '';
    this.err = undefined;
    this.logLevel = undefined;

    return undefined;
  }
}
