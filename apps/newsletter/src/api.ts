import { NewUser, User } from './db/tables/user';
import { NewNewsletter, Newsletter } from './db/tables/newsletter';
import {
  NewNewsletterItemPhoto,
  NewsletterItemPhoto,
} from './db/tables/newsletter-item-photo';
import { NewLocation, Location } from './db/tables/location';
import { NewNewsletterItem, NewsletterItem } from './db/tables/newsletter-item';

export type CreateUser = Omit<NewUser, 'email'>;
export type ReadUser = User;
export type UpdateUser = CreateUser;
export type DeleteUser = Pick<User, 'id'>;

export type CreateNewsletter = Omit<
  NewNewsletter,
  'id' | 'ownerId' | 'created'
>;

export type UpdateNewsletter = CreateNewsletter;
export type ReadNewsletter = {
  newsletter: Newsletter;
  members: ReadUser[];
  items: ReadNewsletterItem[];
};
export type DeleteNewsletter = Pick<Newsletter, 'id'>;

export type ReadNewsletters = Newsletter[];

type CreateNewsletterItemPhoto = Omit<
  NewNewsletterItemPhoto,
  'newsletterItemId' | 'link' | 'locationId'
> & { location: NewLocation };

type ReadNewsletterItemPhoto = Omit<
  NewsletterItemPhoto,
  'newsletterItemId' | 'locationId'
> & { location: Location | null };

type UpdateNewsletterItemPhoto = CreateNewsletterItemPhoto;

// add other newsletter item types to these type
type CreateNewsletterItemDetails = CreateNewsletterItemPhoto;
type ReadNewsletterItemDetails = ReadNewsletterItemPhoto;
type UpdateNewsletterItemDetails = UpdateNewsletterItemPhoto;

export type CreateNewsletterItem = Omit<
  NewNewsletterItem,
  'id' | 'created' | 'creatorId'
> & {
  details: CreateNewsletterItemDetails;
};

export type ReadNewsletterItem = NewsletterItem & {
  details: ReadNewsletterItemDetails;
};

export type UpdateNewsletterItem = Omit<
  NewNewsletterItem,
  'id' | 'created' | 'creatorId' | 'newsletterId'
> & {
  details: UpdateNewsletterItemDetails;
};

export type DeleteNewsletterItem = Pick<NewsletterItem, 'id'>;
