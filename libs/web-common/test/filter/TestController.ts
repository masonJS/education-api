import { Controller, Get } from '@nestjs/common';
import { DomainException } from '@app/web-common/res/exception/DomainException';

@Controller('/')
export class TestController {
  @Get('bad-request')
  systemError() {
    throw DomainException.BadRequest({ message: 'badRequest' });
  }

  @Get('not-found')
  forbidden() {
    throw DomainException.NotFound({ message: 'notFound' });
  }
}
