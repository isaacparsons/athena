import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  CreateNewsletterItemDetailsInput,
  NewsletterItemTypeName,
  NewsletterItemDetailsContainer,
} from '@athena/common';
import { TYPES } from '../types/types';

export interface INewsletterItemDetailsDAO {
  get(
    newsletterItemId: number
  ): Promise<
    | NewsletterItemDetailsText
    | NewsletterItemDetailsMedia
    | NewsletterItemDetailsContainer
  >;
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
  ): Promise<
    | NewsletterItemDetailsText
    | NewsletterItemDetailsMedia
    | NewsletterItemDetailsContainer
  > {
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
    if (details.type === NewsletterItemTypeName.Container) {
      return {
        id: details.id,
        type: NewsletterItemTypeName.Container,
        name: details.name,
      } as NewsletterItemDetailsContainer;
    }
    if (details.type === NewsletterItemTypeName.Text) {
      return {
        id: details.id,
        type: NewsletterItemTypeName.Text,
        name: details.name,
        description: details.description,
        link: details.link,
      } as NewsletterItemDetailsText;
    }
    if (details.type === NewsletterItemTypeName.Media) {
      return {
        id: details.id,
        type: NewsletterItemTypeName.Media,
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
    if (input.type === NewsletterItemTypeName.Text) {
      await this.db
        .insertInto('newsletter_item_text')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === NewsletterItemTypeName.Media) {
      await this.db
        .insertInto('newsletter_item_media')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    if (input.type === NewsletterItemTypeName.Container) {
      await this.db
        .insertInto('newsletter_item_container')
        .values({ ...input, newsletterItemId })
        .executeTakeFirstOrThrow();
      return;
    }
    throw new Error('unrecognized item type');
  }
}
