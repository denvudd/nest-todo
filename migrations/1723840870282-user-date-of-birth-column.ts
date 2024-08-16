import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const dateOfBirthColumn = new TableColumn({
  name: 'date_of_birth',
  type: 'date',
  isNullable: true,
  default: 'null',
});

const phoneColumn = new TableColumn({
  name: 'phone_number',
  type: 'varchar',
  isNullable: true,
  default: 'null',
});

export class UserDateOfBirthColumn1723840870282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [dateOfBirthColumn, phoneColumn]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', [dateOfBirthColumn, phoneColumn]);
  }
}
