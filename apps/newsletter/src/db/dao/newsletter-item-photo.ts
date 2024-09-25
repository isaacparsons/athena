import { NewsletterItem } from '../tables/newsletter-item';
import {
  NewNewsletterItemPhoto,
  NewsletterItemPhoto,
} from '../tables/newsletter-item-photo';
import { DBConnection } from '../db';
import { photoItems } from '../../util/queries';
import { Location } from '../tables';

type GetNewsletterItem = NewsletterItem & {
  details: Omit<NewsletterItemPhoto, 'newsletterItemId' | 'locationId'> & {
    location: Location | null;
  };
};

export class NewsletterItemPhotoDAO {
  constructor(readonly db: DBConnection) {}

  async get(newsletterId: number) {
    const items = await this.db
      .selectFrom('newsletterItem as ni')
      .select(({ ref }) => [
        'id',
        'newsletterId',
        'title',
        'created',
        'modified',
        'creatorId',
        'modifierId',
        photoItems(this.db, ref('ni.id')).as('details'),
      ])
      .where('ni.newsletterId', '=', newsletterId)
      .execute();

    return items.filter(
      (item): item is GetNewsletterItem =>
        item.details !== null && item.details !== undefined
    );
  }

  async post(input: NewNewsletterItemPhoto) {
    return this.db
      .insertInto('newsletterItemPhoto')
      .values(input)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
