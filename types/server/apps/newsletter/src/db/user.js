"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTableClient = void 0;
const db_1 = require("@athena/db");
class UserTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.primaryKey())
            .addColumn('firstName', 'varchar')
            .addColumn('lastName', 'varchar')
            .addColumn('email', 'varchar', (cb) => cb.notNull().unique());
    }
}
exports.UserTableClient = UserTableClient;
// export interface UserTemplateTable {
//   name: TABLE_NAMES.USER_TEMPLATE;
//   columns: UserTemplate;
// }
// export type SelectUserTemplate = Selectable<UserTemplate>;
// export type InsertUserTemplate = Insertable<UserTemplate>;
// export type UpdateUserTemplate = Updateable<UserTemplate>;
// export class UserTemplateTableClient extends Table<
//   'user_template',
//   'userId' | 'newsletterItemTemplateId'
// > {
//   constructor(db: DBConnection, name: string) {
//     super(db, name);
//   }
//   tableBuilder: CreateTableBuilder<
//     'user_template',
//     'userId' | 'newsletterItemTemplateId'
//   > = this.tableBuilder
//     .addColumn('userId', 'integer', (col) =>
//       col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade').notNull()
//     )
//     .addColumn('newsletterItemTemplateId', 'integer', (col) =>
//       col
//         .references(`${TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE}.id`)
//         .onDelete('cascade')
//         .notNull()
//     );
// }
//# sourceMappingURL=user.js.map