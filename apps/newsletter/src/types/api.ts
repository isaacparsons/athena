import * as DB from './db';
export interface AthenaResponse<T = undefined> {
  data: null | T;
  error: null | Error;
}

type UniqueId = DB.UniqueId;
type NullableString = string | null;

interface Meta {
  creator: DB.SelectUser;
  modifier: DB.SelectUser | null;
  created: string;
  modified: string | null;
}

export type Position = {
  lattitude: number;
  longitude: number;
};

interface DateRange {
  start: NullableString;
  end: NullableString;
}

export interface Country {
  name: string;
  position: Position;
}

export interface Location {
  id: number;
  country: string | null;
  name: string | null;
  position: Position | null;
}

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  newsletters: NewsletterBase[];
}

export type NewsletterItemType = 'media' | 'text';

type NewsletterItemDetailsBase = {
  id: number;
  name: string;
  type: NewsletterItemType;
};

export type NewsletterItemDetailsMedia = NewsletterItemDetailsBase & {
  fileName: string;
  caption: string | null;
};

export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
  description: string | null;
  link: string | null;
};

export type NewsletterItemDetails =
  | NewsletterItemDetailsText
  | NewsletterItemDetailsMedia;

export interface NewsletterItemBase {
  id: number;
  meta: Meta;
  location: Location | null;
  date: string | null;
  title: string;
  nextItemId: number | null;
  previousItemId: number | null;
  details?: NewsletterItemDetails;
}

export interface NewsletterItem extends NewsletterItemBase {
  children: NewsletterItemBase[];
}

interface NewsletterProperties {
  name: string;
  dateRange: DateRange | null;
}

export interface NewsletterBase {
  id: number;
  meta: Meta;
  properties: NewsletterProperties;
  owner: DB.SelectUser;
}

export interface Newsletter extends NewsletterBase {
  members: DB.SelectUser[];
  items: NewsletterItem[];
}

type NewsletterTemplate = {
  // examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
  name: string;
};
