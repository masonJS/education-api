import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DatabaseEnvironment } from './DatabaseEnvironment';

export class Environment {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DatabaseEnvironment)
  database: DatabaseEnvironment;
}
