import { NestFactory } from '@nestjs/core';
import { setNestApp } from '@app/web-common/middleware/setNestApp';
import { ApiModule } from './ApiModule';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  setNestApp(app);

  app.enableShutdownHooks(); // graceful showdown
  await app.listen(3000);
}

void bootstrap();
