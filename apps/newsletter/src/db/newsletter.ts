import { CreateTableBuilder } from 'kysely';
import { DBConnection, EntityTable } from '@backend/types';

export class NewsletterTableClient extends EntityTable<
  'newsletter',
  'name' | 'ownerId' | 'startDate' | 'endDate'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'newsletter',
    'name' | 'ownerId' | 'startDate' | 'endDate'
  > = this.tableBuilder
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('ownerId', 'integer', (col) =>
      col.notNull().references('user.id').notNull().onDelete('restrict')
    )
    .addColumn('startDate', 'text')
    .addColumn('endDate', 'text');
}
