import { ColumnType } from 'kysely';
import { Country } from './country';
import { FederatedCredential } from './federated-credentials';
import { Newsletter } from './newsletter';
import { NewsletterItem } from './newsletter-item';
import { NewsletterItemPhoto } from './newsletter-item-photo';
import { User } from './user';

export type UniqueId = ColumnType<number, never, never>;
export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type MutableNullableDate = ColumnType<
  string | null,
  string | null,
  string | null
>;
export type MutableForeignKey = ColumnType<number, number, number>;
export type ForeignKey = ColumnType<number, number, never>;

export type ImmutableString = ColumnType<string, string, never>;
export type ImmutableNumber = ColumnType<number, number, never>;

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
