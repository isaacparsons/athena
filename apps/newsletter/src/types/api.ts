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
  start: string;
  end: NullableString;
}

export interface Country {
  name: string;
  position: Position;
}

export interface Location {
  id: UniqueId;
  country: Country;
  name: string;
  position: Position;
}

export interface User {
  newsletters: [];
}

export type NewsletterItemType =
  | 'photo'
  | 'video'
  | 'data-point'
  | 'text'
  | 'node';
type NewsletterTemplate = {
  // examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
  name: string;
};

export interface NewsletterItem {
  meta: Meta;
  location: Location;
  type: NewsletterItemType;
}

interface NewsletterProperties {
  name: string;
  dateRange: DateRange | null;
}

export interface Newsletter {
  meta: Meta;
  properties: NewsletterProperties;
  owner: DB.SelectUser;
  members: DB.SelectUser[];
  items: NewsletterItem[];
}

export {
  CreateNewsletterInput,
  ReadNewsletterInput,
  UpdateNewsletterInput,
  DeleteNewsletterInput,
  CreateNewsletterItemInput,
  ReadNewsletterItemInput,
  UpdateNewsletterItemInput,
  DeleteNewsletterItemInput,
  LocationInput,
} from '../routes/index';

// export type LocationInput = Omit<DB.SelectLocation, 'name' | 'id'> & {
//   locationName: string | null;
// };

// export type ReadUser = User;
// export type ReadUserNewsletter = Newsletter;

// export type UpdateUserInput = UserUpdate;

// export type CreateNewsletterInput = Omit<NewNewsletter, 'created' | 'ownerId'>;

// export type ReadNewsletter = {
//   newsletter: Newsletter;
//   members: User[];
//   items: ReadNewsletterItem[];
// };

// export type UpdateNewsletterInput = Omit<NewsletterUpdate, 'modified'>;

// export type CreateLocationInput = NewLocation;
// export type ReadLocation = Location;

// export type NewsletterItemType = 'text' | 'photo' | 'video';
//   | 'entertainment-review';

// export type NewsletterItemDetailsType =
//   | CreateNewsletterItemPhotoInput
//   | CreateNewsletterItemVideoInput
//   | CreateNewsletterItemTextInput;

// export type CreateNewsletterItemBaseInput = Omit<
//   NewNewsletterItem,
//   | 'newsletterId'
//   | 'creatorId'
//   | 'locationId'
//   | 'newsletterItemDetailsId'
//   | 'created'
// >;

// export type CreateNewsletterItemInput = CreateNewsletterItemBaseInput &
//   Omit<NewLocation, 'name'> & {
//     locationName: string | null | undefined;
//   } & NewsletterItemDetailsType;

// export type CreateNewsletterItemPhotoInput = NewNewsletterItemPhoto & {
//   file: File;
// };

// export type CreateNewsletterItemVideoInput = NewNewsletterItemVideo & {
//   file: File;
// };

// export type CreateNewsletterItemTextInput = NewNewsletterItemText;

// export type ReadNewsletterItemPhoto = NewsletterItemPhoto & { url: string };
// export type ReadNewsletterItemVideo = NewsletterItemVideo & { url: string };
// export type ReadNewsletterItemText = NewsletterItemText;
// export type ReadNewsletterItemDetails =
//   | ReadNewsletterItemPhoto
//   | ReadNewsletterItemVideo
//   | ReadNewsletterItemText;

// export type ReadNewsletterItem = NewsletterItem & {
//   details: ReadNewsletterItemDetails;
//   location: ReadLocation;
// };
