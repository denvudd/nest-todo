import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const isAdminColumn = new TableColumn({
  name: 'is_admin',
  type: 'boolean',
  isNullable: false,
  default: 'false',
});

export class UserIsAdminColumn1723840669136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('user', isAdminColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', isAdminColumn);
  }
}
