import { Kysely } from 'kysely';
import {
  UserTable,
  NewsletterTable,
  UserNewsletterTable,
  Country,
  FederatedCredentialTable,
  LocationTable,
  NewsletterItemPhotoTable,
  NewsletterItemTable,
} from './tables/index';

export interface Database {
  user: UserTable;
  newsletter: NewsletterTable;
  userNewsletter: UserNewsletterTable;
  newsletterItem: NewsletterItemTable;
  newsletterItemPhoto: NewsletterItemPhotoTable;
  country: Country;
  federatedCredential: FederatedCredentialTable;
  location: LocationTable;
}

export type DBConnection = Kysely<Database>;
