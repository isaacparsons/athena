import { NewsletterItem } from '../tables/newsletter-item';
import {
  NewNewsletterItemPhoto,
  NewsletterItemPhoto,
} from '../tables/newsletter-item-photo';
import { DBConnection } from '../db';

export class NewsletterItemTextDAO {
  constructor(readonly db: DBConnection) {}

  // async get(newsletterId: number) {}
}
