import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';

export interface MigrationTableOption extends TableOptions {
  /**
   * Column name arrays to be used for create unique constraint
   */
  uniquesBy?: Array<string[]>;
}
