import { InsertNewsletterItem, InsertNewsletterItemText } from '../../db';
export declare function createNewsletter(userId: number, name: string): Promise<{
    id: number;
    name: string;
    startDate: string | null;
    endDate: string | null;
    created: string;
    modified: string | null;
    creatorId: number;
    modifierId: number | null;
    ownerId: number;
}>;
export declare function createNewsletterItemText(itemInput: InsertNewsletterItem, detailsInput: Omit<InsertNewsletterItemText, 'newsletterItemId'>): Promise<{
    id: number;
    date: string | null;
    newsletterId: number;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    locationId: number | null;
    created: string;
    modified: string | null;
    creatorId: number;
    modifierId: number | null;
}>;
export declare function createNewsletterItemNode(itemInput: InsertNewsletterItem): Promise<{
    id: number;
    date: string | null;
    newsletterId: number;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    locationId: number | null;
    created: string;
    modified: string | null;
    creatorId: number;
    modifierId: number | null;
}>;
