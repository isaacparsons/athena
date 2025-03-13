import { Entity } from "@athena/common";
import { SelectUser } from "@athena/db";

export type EntityMetaRow = {
    creator: SelectUser;
    modifier: SelectUser | null;
}

export interface EntityDAO<R, E extends Entity> {
    toEntity: (row: R) => E
}