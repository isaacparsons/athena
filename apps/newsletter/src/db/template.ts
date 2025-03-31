import { CreateTableBuilder, Insertable, Selectable, Updateable, sql } from 'kysely';
import { DBConnection, EntityTable } from '@athena/db';
import { Template, TemplateNode } from '../types/db';

export type SelectTemplate = Selectable<Template>;
export type InsertTemplate = Insertable<Template>;
export type UpdateTemplate = Updateable<Template>;

type TemplateTableColums = 'name' | 'config' | 'type';

export class TemplateTableClient extends EntityTable<
  'template',
  TemplateTableColums
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<'template', TemplateTableColums> =
    this.tableBuilder
      .addColumn('name', 'text', (cb) => cb.notNull())
      .addColumn('type', sql`template_type`, (cb) => cb.notNull())
      .addColumn('config', 'json');
}

export type SelectTemplateNode = Selectable<TemplateNode>;
export type InsertTemplateNode = Insertable<TemplateNode>;
export type UpdateTemplateNode = Updateable<TemplateNode>;

type TemplateNodeTableColums =
  | 'parentId'
  | 'nextId'
  | 'prevId'
  | 'templateId'
  | 'data';

export class TemplateNodeTableClient extends EntityTable<
  'template_node',
  TemplateNodeTableColums
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<'template_node', TemplateNodeTableColums> =
    this.tableBuilder
      .addColumn('templateId', 'integer', (col) =>
        col.references(`template.id`).notNull().onDelete('cascade')
      )
      .addColumn('data', 'json')
      .addColumn('parentId', 'integer', (col) =>
        col.references(`template_node.id`).onDelete('cascade')
      )
      .addColumn('nextId', 'integer')
      .addColumn('prevId', 'integer');
}
