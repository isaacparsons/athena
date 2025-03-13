import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, UniqueId, ImmutableString, ImmutableNumber, TABLE_NAMES } from '@athena/db';
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
export declare class FederatedCredentialTableClient extends Table<'federated_credential', 'id' | 'provider' | 'subjectId' | 'userId'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'federated_credential', 'id' | 'provider' | 'subjectId' | 'userId'>;
}
