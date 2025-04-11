import { inject, injectable, injectFromBase } from 'inversify';
import 'reflect-metadata';
import {
  NewsletterRole,
  Template,
  CreateTemplate,
  TemplateType,
  UpdateTemplate,
  ReadTemplate,
} from '@athena/common';
import {
  TYPES,
  DBConnection,
  Transaction,
  DB,
  jsonArrayFrom,
  TemplateRow,
  ITemplateDAO,
} from '@backend/types';
import { mapMeta, mapUsers } from './mapping';
import { EntityDAO } from './entity';
import { expressionBuilder, Expression } from 'kysely';
import { TemplateNodeDAO } from '@backend/dao';
import { creator, modifier } from '@backend/db';

@injectable()
@injectFromBase()
export class TemplateDAO
  extends EntityDAO<'template', TemplateRow, Template>
  implements ITemplateDAO
{
  tableName = 'template' as any;

  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {
    super();
  }

  toEntity(row: TemplateRow) {
    return {
      id: row.id,
      meta: mapMeta(row),
      members: mapUsers(row.members),
      nodes: row.nodes,
      name: row.name,
      config: row.config as Record<string, string>,
      type: row.type as TemplateType,
    };
  }

  private members(templateId: Expression<number>) {
    const eb = expressionBuilder<DB, 'user_template' | 'user'>();
    return jsonArrayFrom(
      eb
        .selectFrom('user_template as ut')
        .where('ut.templateId', '=', templateId)
        .innerJoin('user', 'user.id', 'ut.userId')
        .selectAll('user')
    ).as('members');
  }

  async read(id: number): Promise<ReadTemplate> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const template = await this.selectEntity(trx)
        .select((eb) => [
          'name',
          'config',
          'type',
          this.members(eb.ref('template.id')),
        ])
        .where('id', '=', id)
        .executeTakeFirstOrThrow();

      const nodes = await new TemplateNodeDAO(trx).readByTemplateId(id);
      return this.toEntity({
        ...template,
        nodes,
      });
    });
  }

  async readByUserId(id: number): Promise<Template[]> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const templates = await trx
        .selectFrom('user_template as ut')
        .innerJoin('template as t', 't.id', 'ut.templateId')
        .where('ut.userId', '=', id)
        .select((eb) => [
          't.id',
          't.created',
          't.modified',
          't.name',
          't.config',
          't.type',
          modifier(trx, eb.ref('t.modifierId')).as('modifier'),
          creator(trx, eb.ref('t.creatorId')).as('creator'),
        ])
        .execute();

      return templates.map((t) => ({
        id: t.id,
        meta: mapMeta(t),
        name: t.name,
        config: t.config as Record<string, string>,
        type: t.type as TemplateType,
      }));
    });
  }

  async create(userId: number, input: CreateTemplate): Promise<number> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const template = await this.postEntities(trx, userId, [
        { name: input.name, config: input.config, type: input.type },
      ])
        .returning('id')
        .executeTakeFirstOrThrow();
      await trx
        .insertInto('user_template')
        .values({
          userId: userId,
          role: NewsletterRole.OWNER,
          templateId: template.id,
        })
        .executeTakeFirstOrThrow();

      await new TemplateNodeDAO(trx).createMany(userId, {
        templateId: template.id,
        position: {
          parentId: null,
          prevId: null,
          nextId: null,
        },
        nodes: input.nodes,
      });

      return template.id;
    });
  }

  async update(userId: number, input: UpdateTemplate) {
    // TODO: check permissions
    return this.db.transaction().execute(async (trx: Transaction) => {
      const { id } = await this.updateEntity(trx, userId, {
        id: input.id,
        config: input.config,
        name: input.name,
      })
        .returning('id')
        .executeTakeFirstOrThrow();
      await new TemplateNodeDAO(trx).updateMany(userId, input.nodes);

      return id;
    });
  }

  async delete(userId: number, id: number) {
    // TODO: check permissions
    const { id: templateId } = await this.db
      .deleteFrom('template')
      .where('id', '=', id)
      .returning('id')
      .executeTakeFirstOrThrow();
    return templateId;
  }
}
