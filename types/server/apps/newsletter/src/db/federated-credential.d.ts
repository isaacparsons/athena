import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, ImmutableString, ImmutableNumber, TABLE_NAMES } from '@athena/db';
export interface FederatedCredentialTableColumns {
    id: UniqueId;
    provider: ImmutableString;
    subjectId: ImmutableString;
    userId: ImmutableNumber;
}
export interface FederatedCredentialTable {
    name: TABLE_NAMES.FEDEREATED_CREDENTIAL;
    columns: FederatedCredentialTableColumns;
}
export type SelectFederatedCredential = Selectable<FederatedCredentialTableColumns>;
export type InsertFederatedCredential = Insertable<FederatedCredentialTableColumns>;
export type UpdateFederatedCredential = Updateable<FederatedCredentialTableColumns>;
export declare class FederatedCredentialTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
