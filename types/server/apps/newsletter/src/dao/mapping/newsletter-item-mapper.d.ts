import { NewsletterItem } from '@athena/athena-common';
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
export declare const mapItems: (id: number, items: MappedType[]) => NewsletterItem;
export {};
