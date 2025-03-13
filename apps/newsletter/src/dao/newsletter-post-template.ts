// import _ from 'lodash';
// import 'reflect-metadata';
// import { DBConnection, TABLE_NAMES, Transaction } from '@athena/db';

// import {
//   NewsletterPostTemplate,
//   NewsletterPostTemplateDataDetails,
//   CreateNewsletterPostTemplate,
// } from '@athena/common';
// import { creator, modifier } from '../util';
// import { inject, injectable } from 'inversify';
// import { TYPES } from '../types/types';
// import { mapMeta } from './mapping';

// export interface INewsletterPostTemplateDAO {
//   post(userId: number, input: CreateNewsletterPostTemplate): Promise<number>;
//   get(id: number): Promise<NewsletterPostTemplate>;
// }

// @injectable()
// export class NewsletterPostTemplateDAO implements INewsletterPostTemplateDAO {
//   constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

//   async post(userId: number, input: CreateNewsletterPostTemplate) {
//     return this.db.transaction().execute(async (trx: Transaction) => {
//       const template = await trx
//         .insertInto('newsletter_item_template')
//         .values({
//           name: input.name,
//           created: new Date().toISOString(),
//           creatorId: userId,
//         })
//         .returning('id')
//         .executeTakeFirstOrThrow();

//       await trx
//         .insertInto(TABLE_NAMES.USER_TEMPLATE)
//         .values({ newsletterItemTemplateId: template.id, userId })
//         .executeTakeFirstOrThrow();

//       const rootNode = await trx
//         .insertInto('newsletter_item_template_data')
//         .values({
//           data: null,
//           parentId: null,
//           nextId: null,
//           prevId: null,
//           templateId: template.id,
//         })
//         .returning('id')
//         .executeTakeFirstOrThrow();

//       const tuples = await Promise.all(
//         input.data.map(async (item) => {
//           const res = await trx
//             .insertInto('newsletter_item_template_data')
//             .values({
//               data: item.data ?? null,
//               parentId: null,
//               nextId: null,
//               prevId: null,
//               templateId: item.templateId ?? null,
//             })
//             .returning('id')
//             .executeTakeFirstOrThrow();

//           return [item.temp.id, res.id] as [string, number];
//         })
//       );

//       const tempIdRealIdMap = new Map<string, number>(tuples);
//       const getRealId = (id: string | null) => {
//         if (!id) return null;
//         return tempIdRealIdMap.get(id) ?? null;
//       };

//       await Promise.all(
//         input.data.map(async (item) =>
//           trx
//             .updateTable('newsletter_item_template_data')
//             .set({
//               parentId: getRealId(item.temp.parentId) ?? rootNode.id,
//               nextId: getRealId(item.temp.nextId),
//               prevId: getRealId(item.temp.prevId),
//             })
//             .returning('id')
//             .where('newsletter_item_template_data.id', '=', getRealId(item.temp.id))
//             .executeTakeFirstOrThrow()
//         )
//       );
//       return template.id;
//     });
//   }

//   async get(id: number): Promise<NewsletterPostTemplate> {
//     const template = await this.getTemplate(id);
//     const templates = await Promise.all(
//       template.items
//         .filter((i) => i.templateId !== id && i.templateId !== null)
//         .map(async (i) => this.getTemplate(i.templateId as number))
//     );

//     return {
//       ...template,
//       templates,
//     };
//   }

//   private async getTemplate(
//     id: number
//   ): Promise<Omit<NewsletterPostTemplate, 'templates'>> {
//     const template = await this.db
//       .selectFrom('newsletter_item_template as nit')
//       .where('nit.id', '=', id)
//       .select((eb) => [
//         'nit.id',
//         'nit.name',
//         'nit.created',
//         'nit.modified',
//         creator(this.db, eb.ref('nit.creatorId')).as('creator'),
//         modifier(this.db, eb.ref('nit.modifierId')).as('modifier'),
//       ])
//       .executeTakeFirstOrThrow();

//     const items = await this.db
//       .withRecursive('template_tree', (db) =>
//         db
//           .selectFrom('newsletter_item_template_data')
//           .select(['data', 'id', 'parentId', 'nextId', 'prevId', 'templateId'])
//           .where((eb) => eb('templateId', '=', id).and('parentId', 'is', null))
//           .unionAll(
//             db
//               .selectFrom('newsletter_item_template_data as nitd')
//               .select([
//                 'nitd.data',
//                 'nitd.id',
//                 'nitd.parentId',
//                 'nitd.nextId',
//                 'nitd.prevId',
//                 'nitd.templateId',
//               ])
//               .innerJoin('template_tree', 'nitd.parentId', 'template_tree.id')
//           )
//       )
//       .selectFrom('template_tree')
//       .selectAll()
//       .execute();

//     return {
//       id: template.id,
//       name: template.name,
//       meta: mapMeta(template),
//       items: items.map((i) => ({
//         id: i.id,
//         templateId: _.isNull(i.templateId) ? undefined : i.templateId,
//         position: {
//           parentId: i.parentId,
//           nextId: i.nextId,
//           prevId: i.prevId,
//         },
//         data: _.get(i, ['data']) as NewsletterPostTemplateDataDetails,
//       })),
//     };
//   }
//   // async update(userId: number, input: UpdateNewsletterPostInput) {}
// }
