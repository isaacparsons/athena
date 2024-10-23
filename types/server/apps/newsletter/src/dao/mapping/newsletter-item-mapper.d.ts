import { NewsletterItem, NewsletterItemDetailsMedia, NewsletterItemDetailsText } from '@athena/athena-common';
type MappedType = {
    id: number;
    date: string | null;
    newsletterId: number;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    modified: string | null;
    created: string;
    title: string;
    mediaDetails: {
        name: string;
        caption: string | null;
        fileName: string;
        id: number;
        type: string;
        newsletterItemId: number;
    } | null;
    textDetails: {
        link: string | null;
        name: string;
        id: number;
        type: string;
        newsletterItemId: number;
        description: string | null;
    } | null;
    location: {
        name: string | null;
        id: number;
        countryCode: string | null;
        lattitude: number | null;
        longitude: number | null;
    } | null;
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
export declare const mapItem: (item: MappedType) => {
    id: number;
    title: string;
    date: string | null;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    meta: {
        modifier: {
            id: number;
            firstName: string | null;
            lastName: string | null;
            email: string;
        } | null;
        modified: string | null;
        creator: {
            id: number;
            firstName: string | null;
            lastName: string | null;
            email: string;
        };
        created: string;
    };
    location: {
        id: number;
        country: string | null;
        name: string | null;
        position: {
            lattitude: number;
            longitude: number;
        } | null;
    } | null;
    details: NewsletterItemDetailsMedia | NewsletterItemDetailsText | undefined;
};
export declare const mapItems: (id: number, items: MappedType[]) => NewsletterItem;
export {};
