import 'reflect-metadata';
import { INewsletterPostDAO } from '@athena/dao';
import { DBConnection, SelectNewsletter, SelectUser } from '@athena/db';
import { Newsletter, CreateNewsletter, UpdateNewsletter, NewsletterPost, InviteNewsletterUser, NewsletterRole, NewsletterPermissions, NewsletterBase } from '@athena/common';
import { IGCSManager } from '@athena/services';
import { EntityDAO, IEntityDAO, EntityMetaRow } from './entity';
export declare const newsletterRolePermissionsMap: Record<NewsletterRole, NewsletterPermissions[]>;
type NewsletterRow = EntityMetaRow & Omit<SelectNewsletter, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    posts: Omit<NewsletterPost, 'children'>[];
    owner: SelectUser;
    members: SelectUser[];
};
export type INewsletterDAO = IEntityDAO<NewsletterRow, Newsletter> & {
    get(id: number): Promise<Newsletter>;
    getByUserId(id: number): Promise<NewsletterBase[]>;
    create(userId: number, input: CreateNewsletter): Promise<number>;
    update(userId: number, input: UpdateNewsletter): Promise<number>;
    delete(userId: number, id: number): Promise<number>;
    inviteUser(userId: number, input: InviteNewsletterUser): Promise<void>;
};
export declare class NewsletterDAO extends EntityDAO<'newsletter', NewsletterRow, Newsletter> implements INewsletterDAO {
    readonly db: DBConnection;
    readonly gcs: IGCSManager;
    readonly newsletterItemDAO: INewsletterPostDAO;
    tableName: any;
    constructor(db: DBConnection, gcs: IGCSManager, newsletterItemDAO: INewsletterPostDAO);
    toEntity(row: NewsletterRow): {
        id: number;
        meta: {
            created: string;
            modified: string | null;
            creator: {
                firstName: string | null;
                lastName: string | null;
                id: number;
                email: string;
            };
            modifier: {
                firstName: string | null;
                lastName: string | null;
                id: number;
                email: string;
            } | null;
        };
        properties: {
            name: string;
            dateRange: {
                start: string | null;
                end: string | null;
            };
        };
        owner: {
            firstName: string | null;
            lastName: string | null;
            id: number;
            email: string;
        };
        members: {
            firstName: string | null;
            lastName: string | null;
            id: number;
            email: string;
        }[];
        posts: Omit<NewsletterPost, "children">[];
    };
    private members;
    get(id: number): Promise<Newsletter>;
    getByUserId(id: number): Promise<NewsletterBase[]>;
    create(userId: number, input: CreateNewsletter): Promise<number>;
    update(userId: number, input: UpdateNewsletter): Promise<number>;
    delete(userId: number, id: number): Promise<number>;
    private validPermissions;
    inviteUser(userId: number, input: InviteNewsletterUser): Promise<void>;
}
export {};
