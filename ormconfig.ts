import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigService } from 'src/config/config.service';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & Record<string, unknown> = {
  ...configService.typeormConfig,
  synchronize: configService.isLocalMode,
  type: 'postgres',
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  logging: configService.isLocalMode,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
