import 'reflect-metadata';
import { DBConnection, SelectLocation, SelectNewsletterItem, SelectNewsletterItemMedia, SelectNewsletterItemText, SelectUser, SelectNewsletterItemContainer } from '@athena/db';
import { ILocationDAO, INewsletterItemDetailsDAO } from '@athena/dao';
import { CreateNewsletterItemBatchInput, CreateNewsletterItemInput, DeleteManyNewsletterItemsInput, UpdateNewsletterItemInput, NewsletterItem } from '@athena/common';
type MappedItem = Omit<SelectNewsletterItem, 'locationId' | 'creatorId' | 'modifierId'> & {
    location: SelectLocation | null;
    mediaDetails: SelectNewsletterItemMedia | null;
    textDetails: SelectNewsletterItemText | null;
    containerDetails: SelectNewsletterItemContainer | null;
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
            latitude: number;
            longitude: number;
        } | null;
    } | null;
    date: string | null;
    title: string;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    details: {
        id: number;
        name: string;
        type: import("@athena/common").NewsletterItemTypeName.Media;
        fileName: string;
        format: import("@athena/common").MediaFormat;
        caption: string | null;
        description?: undefined;
        link?: undefined;
    } | {
        id: number;
        name: string;
        type: import("@athena/common").NewsletterItemTypeName.Text;
        description: string | null;
        link: string | null;
        fileName?: undefined;
        format?: undefined;
        caption?: undefined;
    } | {
        id: number;
        name: string;
        type: import("@athena/common").NewsletterItemTypeName.Container;
        fileName?: undefined;
        format?: undefined;
        caption?: undefined;
        description?: undefined;
        link?: undefined;
    };
};
export interface INewsletterItemDAO {
    deleteMany(input: DeleteManyNewsletterItemsInput): Promise<void>;
    post(userId: number, input: CreateNewsletterItemInput): Promise<number>;
    postBatch(userId: number, input: CreateNewsletterItemBatchInput): Promise<number[]>;
    get(id: number): Promise<NewsletterItem>;
    update(userId: number, input: UpdateNewsletterItemInput): Promise<void>;
}
export declare class NewsletterItemDAO implements INewsletterItemDAO {
    readonly db: DBConnection;
    readonly locationDAO: ILocationDAO;
    readonly newsletterItemDetailsDAO: INewsletterItemDetailsDAO;
    constructor(db: DBConnection, locationDAO: ILocationDAO, newsletterItemDetailsDAO: INewsletterItemDetailsDAO);
    deleteMany(input: DeleteManyNewsletterItemsInput): Promise<void>;
    post(userId: number, input: CreateNewsletterItemInput): Promise<number>;
    postBatch(userId: number, input: CreateNewsletterItemBatchInput): Promise<number[]>;
    get(id: number): Promise<NewsletterItem>;
    update(userId: number, input: UpdateNewsletterItemInput): Promise<void>;
}
export {};
