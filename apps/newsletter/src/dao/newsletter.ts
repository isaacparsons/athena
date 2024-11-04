import _ from 'lodash';
import { mapNewsletterItem, NewsletterItemDAO } from '.';
import {
  Connection as DBConnection,
  Transaction,
  jsonArrayFrom,
  jsonObjectFrom,
} from '../db';
import {
  Newsletter,
  CreateNewsletterInput,
  UpdateNewsletterInput,
  NewsletterItemDetailsMedia,
} from '@athena/athena-common';
import { creator, modifier, user, parseDateRange, location } from '../util';
import { GCSManager } from '../services';

export class NewsletterDAO {
  constructor(
    readonly db: DBConnection,
    readonly gcs: GCSManager,
    readonly newsletterItemDAO: NewsletterItemDAO
  ) {}

  async get(id: number): Promise<Newsletter> {
    const newsletter = await this.db
      .selectFrom('newsletter as n')
      .where('n.id', '=', id)
      .selectAll()
      .select(({ ref }) => user(this.db, ref('n.ownerId'), 'owner'))
      .select(({ ref }) => creator(this.db, ref('n.creatorId')))
      .select(({ ref }) => modifier(this.db, ref('n.modifierId')))
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('user_newsletter as un')
            .whereRef('un.newsletterId', '=', 'n.id')
            .innerJoin('user', 'user.id', 'un.userId')
            .selectAll('user')
        ).as('members')
      )
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('newsletter_item as ni')
            .whereRef('ni.newsletterId', '=', 'n.id')
            .select((eb) => [
              'id',
              'newsletterId',
              'title',
              'date',
              'parentId',
              'nextItemId',
              'previousItemId',
              'created',
              'modified',
              jsonObjectFrom(
                eb
                  .selectFrom('newsletter_item_media as media-details')
                  .selectAll('media-details')
                  .whereRef('media-details.newsletterItemId', '=', 'ni.id')
              ).as('mediaDetails'),
              jsonObjectFrom(
                eb
                  .selectFrom('newsletter_item_text as text-details')
                  .selectAll('text-details')
                  .whereRef('text-details.newsletterItemId', '=', 'ni.id')
              ).as('textDetails'),
              location(this.db, eb.ref('ni.locationId')),
              creator(this.db, eb.ref('ni.creatorId')),
              modifier(this.db, eb.ref('ni.modifierId')),
            ])
        ).as('items')
      )
      .executeTakeFirstOrThrow(
        () => new Error(`newsletter with id: ${id} does not exist`)
      );

    const mappedItems = newsletter.items.map((item) => mapNewsletterItem(item));
    const itemsWithSignedUrl = await Promise.all(
      mappedItems.map(async (item) => {
        if (item.details?.type === 'media') {
          const details = item.details as NewsletterItemDetailsMedia;
          const signedUrl = await this.gcs.getSignedUrl(details.fileName, 'read');
          details.fileName = signedUrl;
          return {
            ...item,
            details,
          };
        }
        return item;
      })
    );

    return {
      id: newsletter.id,
      meta: {
        created: newsletter.created,
        modified: newsletter.modified,
        creator: newsletter.creator,
        modifier: newsletter.modifier,
      },
      properties: {
        name: newsletter.name,
        dateRange: parseDateRange(newsletter.startDate, newsletter.endDate),
      },
      owner: newsletter.owner,
      members: newsletter.members,
      items: itemsWithSignedUrl,
    };
  }

  async post(userId: number, input: CreateNewsletterInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await trx
        .insertInto('newsletter')
        .values({
          ...input,
          ownerId: userId,
          created: new Date().toISOString(),
          creatorId: userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .insertInto('user_newsletter')
        .values({
          userId: userId,
          newsletterId: newsletter.id,
        })
        .executeTakeFirstOrThrow();
      return newsletter.id;
    });
  }

  async update(userId: number, input: UpdateNewsletterInput) {
    const inputWithoutId = _.omit(input, 'id');
    return this.db
      .updateTable('newsletter')
      .set({
        ...inputWithoutId,
        modifierId: userId,
        modified: new Date().toISOString(),
      })
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
  }

  async delete(userId: number, id: number) {
    return this.db
      .deleteFrom('newsletter')
      .where('id', '=', id)
      .where('ownerId', '=', userId)
      .execute();
  }
}
