import { DBConnection } from '../db';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  CreateNewsletterItemDetailsInput,
} from '@athena/athena-common';
export declare class NewsletterItemDetailsDAO {
  readonly db: DBConnection;
  constructor(db: DBConnection);
  get(
    newsletterItemId: number
  ): Promise<NewsletterItemDetailsMedia | NewsletterItemDetailsText | undefined>;
  post(
    newsletterItemId: number,
    input: CreateNewsletterItemDetailsInput
  ): Promise<import('kysely').InsertResult | undefined>;
}
