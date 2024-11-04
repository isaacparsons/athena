import {
  DBConnection as DBConnection,
  SelectLocation,
  SelectNewsletterItem,
  SelectNewsletterItemMedia,
  SelectNewsletterItemText,
  SelectUser,
} from '../db';
import { LocationDAO, NewsletterItemDetailsDAO } from '.';
import {
  CreateNewsletterItemBatchInput,
  CreateNewsletterItemInput,
  DeleteManyNewsletterItemsInput,
  UpdateNewsletterItemInput,
  ReadNewsletterItemTreeInput,
  NewsletterItemBase,
  NewsletterItem,
} from '@athena/athena-common';
type MappedItem = Omit<
  SelectNewsletterItem,
  'locationId' | 'creatorId' | 'modifierId'
> & {
  location: SelectLocation | null;
  mediaDetails: SelectNewsletterItemMedia | null;
  textDetails: SelectNewsletterItemText | null;
  creator: SelectUser;
  modifier: SelectUser | null;
};
export declare const mapNewsletterItem: (item: MappedItem) => {
  id: number;
  newsletterId: number;
  meta: {
    created: string;
    modified: string | null;
    creator: {
      id: number;
      firstName: string | null;
      lastName: string | null;
      email: string;
    };
    modifier: {
      id: number;
      firstName: string | null;
      lastName: string | null;
      email: string;
    } | null;
  };
  location: {
    id: number;
    name: string | null;
    country: string | null;
    position: {
      lattitude: number;
      longitude: number;
    } | null;
  } | null;
  date: string | null;
  title: string;
  parentId: number | null;
  nextItemId: number | null;
  previousItemId: number | null;
  details:
    | {
        id: number;
        name: string;
        type: 'media';
        fileName: string;
        caption: string | null;
        description?: undefined;
        link?: undefined;
      }
    | {
        id: number;
        name: string;
        type: 'text';
        description: string | null;
        link: string | null;
        fileName?: undefined;
        caption?: undefined;
      }
    | undefined;
};
export declare class NewsletterItemDAO {
  readonly db: DBConnection;
  readonly locationDAO: LocationDAO;
  readonly newsletterItemDetailsDAO: NewsletterItemDetailsDAO;
  constructor(
    db: DBConnection,
    locationDAO: LocationDAO,
    newsletterItemDetailsDAO: NewsletterItemDetailsDAO
  );
  deleteMany(input: DeleteManyNewsletterItemsInput): Promise<void>;
  post(userId: number, input: CreateNewsletterItemInput): Promise<number>;
  postBatch(
    userId: number,
    input: CreateNewsletterItemBatchInput
  ): Promise<
    {
      id: number;
    }[]
  >;
  get(id: number): Promise<NewsletterItem>;
  getTree(input: ReadNewsletterItemTreeInput): Promise<NewsletterItemBase[]>;
  update(userId: number, input: UpdateNewsletterItemInput): Promise<void>;
}
export {};
