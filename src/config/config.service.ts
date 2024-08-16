import { resolve } from 'path';
import * as process from 'process';

import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';

@Injectable()
export class ConfigService {
  constructor() {
    configDotenv({ path: resolve(process.cwd(), '.env') });
    configDotenv({ path: resolve(process.cwd(), '.env.local') });
  }

  get isTestMode() {
    return this.mode === 'TEST';
  }

  get isLocalMode() {
    return this.mode === 'LOCAL';
  }

  get isProdMode() {
    return this.mode === 'PROD';
  }

  get mode(): 'TEST' | 'PROD' | 'LOCAL' {
    return this.getEnvValue('APP_MODE') as 'TEST' | 'PROD' | 'LOCAL';
  }

  get appPort(): number {
    return +this.getEnvValue('APP_PORT');
  }

  get appHost(): string {
    return this.getEnvValue('APP_HOST');
  }

  get dbHost(): string {
    return this.getEnvValue('POSTGRES_HOST');
  }

  get dbPort(): number {
    return +this.getEnvValue('POSTGRES_PORT');
  }

  get dbUser(): string {
    return this.getEnvValue('POSTGRES_USER');
  }

  get dbPassword(): string {
    return this.getEnvValue('POSTGRES_PASSWORD');
  }

  get dbName(): string {
    return this.getEnvValue('POSTGRES_DB');
  }

  get typeormConfig() {
    return {
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUser,
      password: this.dbPassword,
      database: this.dbName,
    };
  }

  get jwtSecret(): string {
    return this.getEnvValue('JWT_SECRET');
  }

  get bcryptSalt() {
    return this.getEnvValue('BCRYPT_SALT');
  }

  private getEnvValue(value: string): string {
    if (!(value in process.env)) {
      throw new Error(`Undefined dotenv value: ${value}`);
    }

    return process.env[value] as string;
  }
}
