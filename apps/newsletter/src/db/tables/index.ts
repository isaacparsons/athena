import { Country } from './country';
import { FederatedCredential } from './federated-credentials';
import { Newsletter } from './newsletter';
import { NewsletterItem } from './newsletter-item';
import { NewsletterItemPhoto } from './newsletter-item-photo';
import { User } from './user';

export * from './user';
export * from './newsletter';
export * from './user-newsletter';
export * from './country';
export * from './federated-credentials';
export * from './location';
export * from './newsletter-item';
export * from './newsletter-item-photo';

export type Entity =
  | Newsletter
  | Country
  | FederatedCredential
  | Location
  | NewsletterItemPhoto
  | NewsletterItem
  | User;

export type NewsletterItemType = NewsletterItemPhoto;
