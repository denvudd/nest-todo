import { MigrationInterface, QueryRunner } from 'typeorm';

import { tableFactory } from 'src/common/typeorm/factory/table.factory';

const userTable = tableFactory({
  name: 'user',
  columns: [
    { name: 'email', type: 'varchar', length: '255', isNullable: false },
    { name: 'password', type: 'varchar', length: '255', isNullable: false },
    {
      name: 'activated_at',
      type: 'timestamp',
      isNullable: true,
      default: 'null',
    },
    {
      name: 'first_name',
      type: 'varchar',
      length: '30',
      isNullable: true,
      default: 'null',
    },
    {
      name: 'last_name',
      type: 'varchar',
      length: '30',
      isNullable: true,
      default: 'null',
    },
  ],
});

export class User1723838786432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(userTable);
  }
}
