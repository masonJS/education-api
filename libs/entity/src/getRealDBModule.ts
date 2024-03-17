import { Configuration } from '@app/config/Configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getRealDBModule() {
  const database = Configuration.getEnv().database;

  return TypeOrmModule.forRoot({
    type: 'postgres',
    connectTimeoutMS: database.connectTimeoutMS,
    autoLoadEntities: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: database.synchronize,
    extra: {
      statement_timeout: database.statementTimeout,
      idle_in_transaction_session_timeout:
        database.idleInTransactionSessionTimeout,
    },
    replication: {
      master: {
        host: database.masterHost,
        port: database.port,
        username: database.user,
        password: database.password,
        database: database.name,
      },
      slaves: [
        {
          host: database.readerHost,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
        },
      ],
    },
  });
}
