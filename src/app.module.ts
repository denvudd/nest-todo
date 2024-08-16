import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { dataSourceOptions } from 'ormconfig';

import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      logging: true,
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
