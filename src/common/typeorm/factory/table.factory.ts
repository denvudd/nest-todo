import { Table, TableColumn } from 'typeorm';

import { MigrationTableOption } from './migration-table-option';


export const tableFactory = (tableOptions: MigrationTableOption) => {
  const defaultColumns: Array<TableColumn> = [
    new TableColumn({ name: 'id', type: 'serial', isNullable: false, isPrimary: true }),
    new TableColumn({ name: 'is_deleted', type: 'boolean', default: false, isNullable: false }),
    new TableColumn({ name: 'created_at', type: 'timestamp with time zone', default: 'CURRENT_TIMESTAMP' }),
    new TableColumn({ name: 'updated_at', type: 'timestamp with time zone', default: 'CURRENT_TIMESTAMP' }),
  ];

  const modifiedTableOptions = { ...tableOptions };

  modifiedTableOptions.columns = [...defaultColumns, ...tableOptions.columns];

  if (tableOptions.uniquesBy) {
    modifiedTableOptions.uniques = tableOptions.uniquesBy.map((uniqueBy) => {
      return {
        name: `UQ_${tableOptions.name}_${uniqueBy.join('_')}`,
        columnNames: uniqueBy,
      };
    });
  }

  return new Table(modifiedTableOptions);
};
