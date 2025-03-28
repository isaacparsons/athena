import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@athena/db';
import { FederatedCredential } from '../types/db';
export interface FederatedCredentialTable {
    name: TABLE_NAMES.FEDEREATED_CREDENTIAL;
    columns: FederatedCredential;
}
export type SelectFederatedCredential = Selectable<FederatedCredential>;
export type InsertFederatedCredential = Insertable<FederatedCredential>;
export type UpdateFederatedCredential = Updateable<FederatedCredential>;
export declare class FederatedCredentialTableClient extends Table<'federated_credential', 'id' | 'provider' | 'subjectId' | 'userId'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'federated_credential', 'id' | 'provider' | 'subjectId' | 'userId'>;
}
