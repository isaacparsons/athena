import { CreateTableBuilder, Insertable, Selectable, Updateable, sql } from 'kysely';
import {
  DBConnection,
  TABLE_NAMES,
  EntityTable,
} from '@athena/db';
import { Newsletter } from '../types/db';

export interface NewsletterTable {
  name: TABLE_NAMES.NEWSLETTER;
  columns: Newsletter;
}
export type SelectNewsletter = Selectable<Newsletter>;
export type InsertNewsletter = Insertable<Newsletter>;
export type UpdateNewsletter = Updateable<Newsletter>;

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
