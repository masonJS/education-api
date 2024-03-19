import { Module } from '@nestjs/common';
import { getRealDBModule } from '@app/entity/getRealDBModule';
import { Configuration } from '@app/config/Configuration';
import { LoggerModule } from '@app/logger/LoggerModule';
import { getMailerModule } from '@app/mailer/src/MailerModule';
import { CourseModule } from './course/CourseModule';

@Module({
  imports: [
    CourseModule,
    getRealDBModule(),
    getMailerModule(),
    Configuration.getModule(),
    LoggerModule,
  ],
})
export class ApiModule {}
