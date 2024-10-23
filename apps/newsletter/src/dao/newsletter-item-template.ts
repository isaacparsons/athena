import _ from 'lodash';
import {
  Connection as DBConnection,
  TABLE_NAMES,
  Transaction,
} from '../types/db';

import {
  CreateNewsletterItemTemplateInput,
  NewsletterItemTemplate,
  NewsletterItemTemplateBase,
  NewsletterItemTemplateDataDetails,
} from '@athena/athena-common';

export class NewsletterItemTemplateDAO {
  constructor(readonly db: DBConnection) {}

  async post(userId: number, input: CreateNewsletterItemTemplateInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const template = await trx
        .insertInto('newsletter_item_template')
        .values({ name: input.name })
        .returning('id')
        .executeTakeFirstOrThrow();

      await trx
        .insertInto(TABLE_NAMES.USER_TEMPLATE)
        .values({ newsletterItemTemplateId: template.id, userId })
        .executeTakeFirstOrThrow();

      const rootNode = await trx
        .insertInto('newsletter_item_template_data')
        .values({
          data: null,
          parentId: null,
          nextId: null,
          prevId: null,
          templateId: template.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      const tuples = await Promise.all(
        input.data.map(async (item) => {
          const res = await trx
            .insertInto('newsletter_item_template_data')
            .values({
              data: item.data ?? null,
              parentId: null,
              nextId: null,
              prevId: null,
              templateId: item.templateId ?? null,
            })
            .returning('id')
            .executeTakeFirstOrThrow();

          return [item.temp.id, res.id] as [number, number];
        })
      );

      const tempIdRealIdMap = new Map<number, number>(tuples);
      const getRealId = (id: number | null) => {
        if (!id) return null;
        return tempIdRealIdMap.get(id) ?? null;
      };

      await Promise.all(
        input.data.map(async (item) =>
          trx
            .updateTable('newsletter_item_template_data')
            .set({
              parentId: getRealId(item.temp.parentId) ?? rootNode.id,
              nextId: getRealId(item.temp.nextId),
              prevId: getRealId(item.temp.prevId),
            })
            .returning('id')
            .where(
              'newsletter_item_template_data.id',
              '=',
              getRealId(item.temp.id)
            )
            .executeTakeFirstOrThrow()
        )
      );
      return template.id;
    });
  }
  async get(id: number): Promise<NewsletterItemTemplate> {
    const template = await this.getTemplate(id);
    const templates = await Promise.all(
      template.items
        .filter((i) => i.templateId !== id && i.templateId !== null)
        .map(async (i) => this.getTemplate(i.templateId as number))
    );

    return {
      ...template,
      templates,
    };
  }

  private async getTemplate(id: number): Promise<NewsletterItemTemplateBase> {
    const template = await this.db
      .selectFrom('newsletter_item_template as nit')
      .where('nit.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const items = await this.db
      .withRecursive('template_tree', (db) =>
        db
          .selectFrom('newsletter_item_template_data')
          .select(['data', 'id', 'parentId', 'nextId', 'prevId', 'templateId'])
          .where((eb) => eb('templateId', '=', id).and('parentId', 'is', null))
          .unionAll(
            db
              .selectFrom('newsletter_item_template_data as nitd')
              .select([
                'nitd.data',
                'nitd.id',
                'nitd.parentId',
                'nitd.nextId',
                'nitd.prevId',
                'nitd.templateId',
              ])
              .innerJoin('template_tree', 'nitd.parentId', 'template_tree.id')
          )
      )
      .selectFrom('template_tree')
      .selectAll()
      .execute();
    return {
      ...template,
      items: items.map((i) => ({
        ...i,
        data: _.get(i, ['data']) as NewsletterItemTemplateDataDetails,
      })),
    };
  }
  // async update(userId: number, input: UpdateNewsletterItemInput) {}
}
