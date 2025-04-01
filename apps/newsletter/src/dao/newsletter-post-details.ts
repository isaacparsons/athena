import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import {
  NewsletterPostTypeName,
  NewsletterPostDetails,
  TextPostDetails,
  MediaPostDetails,
  CreateNewsletterPost,
  UpdateNewsletterPostDetails,
} from '@athena/common';
import { TYPES } from '../types/types';

export interface INewsletterPostDetailsDAO {
  get(newsletterItemId: number): Promise<NewsletterPostDetails>;
  post(
    newsletterItemId: number,
    input: CreateNewsletterPost['details']
  ): Promise<void>;
  update(input: UpdateNewsletterPostDetails): Promise<number>;
}

@injectable()
export class NewsletterPostDetailsDAO implements INewsletterPostDetailsDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async get(newsletterItemId: number): Promise<NewsletterPostDetails> {
    const details = await this.db
      .selectFrom(['newsletter_post_media as nim', 'newsletter_post_text as nit'])
      .selectAll()
      .where(({ or, eb }) =>
        or([
          eb('nim.newsletterPostId', '=', newsletterItemId),
          eb('nit.newsletterPostId', '=', newsletterItemId),
        ])
      )
      .executeTakeFirst();
    if (!details) throw new Error('no details specified');
    if (details.type === NewsletterPostTypeName.Text) {
      return {
        id: details.id,
        type: NewsletterPostTypeName.Text,
        name: details.name,
        description: details.description,
        link: details.link,
      } as TextPostDetails;
    }
    if (details.type === NewsletterPostTypeName.Media) {
      return {
        id: details.id,
        type: NewsletterPostTypeName.Media,
        fileName: details.fileName,
        name: details.name,
        caption: details.caption,
      } as MediaPostDetails;
    }
    throw new Error('unrecognized type');
  }
  async post(
    newsletterPostId: number,
    input: CreateNewsletterPost['details']
  ): Promise<void | undefined> {
    if (!input) return;
    if (input.type === NewsletterPostTypeName.Text) {
      await this.db
        .insertInto('newsletter_post_text')
        .values({ ...input, newsletterPostId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === NewsletterPostTypeName.Media) {
      await this.db
        .insertInto('newsletter_post_media')
        .values({ ...input, newsletterPostId })
        .executeTakeFirstOrThrow();
      return;
    }

    throw new Error('unrecognized item type');
  }
  async update(input: UpdateNewsletterPostDetails): Promise<number> {
    const table =
      input.type === NewsletterPostTypeName.Text
        ? 'newsletter_post_text'
        : input.type === NewsletterPostTypeName.Media
        ? 'newsletter_post_media'
        : null;

    if (!table) throw new Error('unrecognized post type');
    const result = await this.db
      .updateTable(table)
      .set(input)
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return result.id;
  }
}
