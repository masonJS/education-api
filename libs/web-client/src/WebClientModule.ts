import { Module } from '@nestjs/common';
import { WebClientCreator } from '@app/web-client/factory/WebClientCreator';
import { FetchClientCreator } from '@app/web-client/factory/FetchClientCreator';

@Module({
  providers: [
    {
      provide: WebClientCreator,
      useClass: FetchClientCreator,
    },
  ],
  exports: [WebClientCreator],
})
export class WebClientModule {}
