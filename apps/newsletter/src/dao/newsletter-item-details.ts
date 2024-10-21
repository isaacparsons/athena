import { Connection } from '../types/db';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  CreateNewsletterItemDetailsInput,
  NewsletterItemType,
} from '@athena/athena-common';

export class NewsletterItemDetailsDAO {
  constructor(readonly db: Connection) {}

  async get(newsletterItemId: number) {
    const details = await this.db
      .selectFrom([
        'newsletter_item_media as nim',
        'newsletter_item_text as nit',
      ])
      .selectAll()
      .where(({ or, eb }) =>
        or([
          eb('nim.newsletterItemId', '=', newsletterItemId),
          eb('nit.newsletterItemId', '=', newsletterItemId),
        ])
      )
      .executeTakeFirst();
    if (!details) {
      return;
    } else if (details.type === 'text') {
      return {
        id: details.id,
        type: 'text',
        name: details.name,
        description: details.description,
        link: details.link,
      } as NewsletterItemDetailsText;
    } else if (details.type === 'media') {
      return {
        id: details.id,
        type: 'media',
        fileName: details.fileName,
        name: details.name,
        caption: details.caption,
      } as NewsletterItemDetailsMedia;
    } else {
      throw new Error('unrecognized type');
    }
  }
  async post(
    newsletterItemId: number,
    input: CreateNewsletterItemDetailsInput
  ) {
    if (!input) {
      return;
    } else if (input.type === NewsletterItemType.text) {
      return this.db
        .insertInto('newsletter_item_text')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
    } else if (input.type === 'media') {
      return this.db
        .insertInto('newsletter_item_media')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
    } else {
      throw new Error('unrecognized item type');
    }
  }
}
