import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import {
  NewsletterPostTypeName,
  NewsletterPostDetails,
  CreateNewsletterPostDetails,
  ContainerPostDetails,
  TextPostDetails,
  MediaPostDetails,
  UpdateNewsletterPostDetails,
} from '@athena/common';
import { TYPES } from '../types/types';

export interface INewsletterPostDetailsDAO {
  get(newsletterItemId: number): Promise<NewsletterPostDetails>;
  post(newsletterItemId: number, input: CreateNewsletterPostDetails): Promise<void>;
  update(input: UpdateNewsletterPostDetails): Promise<number>;
}

@injectable()
export class NewsletterPostDetailsDAO implements INewsletterPostDetailsDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async get(newsletterItemId: number): Promise<NewsletterPostDetails> {
    const details = await this.db
      .selectFrom([
        'newsletter_item_media as nim',
        'newsletter_item_text as nit',
        'newsletter_item_container as nic',
      ])
      .selectAll()
      .where(({ or, eb }) =>
        or([
          eb('nim.newsletterItemId', '=', newsletterItemId),
          eb('nit.newsletterItemId', '=', newsletterItemId),
          eb('nic.newsletterItemId', '=', newsletterItemId),
        ])
      )
      .executeTakeFirst();
    if (!details) throw new Error('no details specified');
    if (details.type === NewsletterPostTypeName.Container) {
      return {
        id: details.id,
        type: NewsletterPostTypeName.Container,
        name: details.name,
      } as ContainerPostDetails;
    }
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
    newsletterItemId: number,
    input: CreateNewsletterPostDetails
  ): Promise<void | undefined> {
    if (!input) return;
    if (input.type === NewsletterPostTypeName.Text) {
      await this.db
        .insertInto('newsletter_item_text')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === NewsletterPostTypeName.Media) {
      await this.db
        .insertInto('newsletter_item_media')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === NewsletterPostTypeName.Container) {
      await this.db
        .insertInto('newsletter_item_container')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    throw new Error('unrecognized item type');
  }
  async update(input: UpdateNewsletterPostDetails): Promise<number> {
    const table =
      input.type === NewsletterPostTypeName.Text
        ? 'newsletter_item_text'
        : input.type === NewsletterPostTypeName.Container
        ? 'newsletter_item_container'
        : input.type === NewsletterPostTypeName.Media
        ? 'newsletter_item_media'
        : null;

    if (!table) throw new Error('unrecognized item type');
    const result = await this.db
      .updateTable(table)
      .set(input)
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return result.id;
  }
}
