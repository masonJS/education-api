import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SESEnvironment } from '@app/config/env/SesEnvironment';
import { DatabaseEnvironment } from './DatabaseEnvironment';

export class Environment {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DatabaseEnvironment)
  database: DatabaseEnvironment;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => SESEnvironment)
  ses: SESEnvironment;
}
