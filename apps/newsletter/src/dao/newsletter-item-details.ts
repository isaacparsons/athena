import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '../db';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  CreateNewsletterItemDetailsInput,
} from '@athena/athena-common';
import { TYPES } from '../types/types';

export interface INewsletterItemDetailsDAO {
  get(
    newsletterItemId: number
  ): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | undefined>;
  post(
    newsletterItemId: number,
    input: CreateNewsletterItemDetailsInput
  ): Promise<void>;
}

@injectable()
export class NewsletterItemDetailsDAO implements INewsletterItemDetailsDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async get(
    newsletterItemId: number
  ): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | undefined> {
    const details = await this.db
      .selectFrom(['newsletter_item_media as nim', 'newsletter_item_text as nit'])
      .selectAll()
      .where(({ or, eb }) =>
        or([
          eb('nim.newsletterItemId', '=', newsletterItemId),
          eb('nit.newsletterItemId', '=', newsletterItemId),
        ])
      )
      .executeTakeFirst();
    if (!details) return;
    if (details.type === 'text') {
      return {
        id: details.id,
        type: 'text',
        name: details.name,
        description: details.description,
        link: details.link,
      } as NewsletterItemDetailsText;
    }
    if (details.type === 'media') {
      return {
        id: details.id,
        type: 'media',
        fileName: details.fileName,
        name: details.name,
        caption: details.caption,
      } as NewsletterItemDetailsMedia;
    }
    throw new Error('unrecognized type');
  }
  async post(
    newsletterItemId: number,
    input: CreateNewsletterItemDetailsInput
  ): Promise<void | undefined> {
    if (!input) return;
    if (input.type === 'text') {
      await this.db
        .insertInto('newsletter_item_text')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === 'media') {
      await this.db
        .insertInto('newsletter_item_media')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    throw new Error('unrecognized item type');
  }
}
