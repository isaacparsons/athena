"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTemplateDataTableClient = exports.NewsletterItemTemplateTableClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../types/db");
class NewsletterItemTemplateTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey())
                .addColumn('name', 'varchar', (cb) => cb.notNull())
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTemplateTableClient = NewsletterItemTemplateTableClient;
class NewsletterItemTemplateDataTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
                .addColumn('parentId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('nextId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('prevId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('templateId', 'integer', (col) => col.references('newsletter_item_template.id').onDelete('cascade'))
                .addColumn('data', 'jsonb')
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTemplateDataTableClient = NewsletterItemTemplateDataTableClient;
/** input
 * name
 * data: [
 * {
 *  templateId
 *  data: {},
 *  temp: {
 *    id,
 *    nextId,
 *    prevId,
 *    parentId
 *  }
 * }
 * ]
 *
 *
 */
/** Movie theatre review
 * id: 2
 * name: movie theatre review
 *
 * template data 1
 * id: 3
 * parentId: null
 * nextId: 4
 * prevId: null
 * templateId: 2
 * data
 *
 * template data 2
 * id: 4
 * parentId: null
 * nextId: null
 * prevId: 3
 * templateId: 1
 * */
/** Movie Review
 *
 * template
 * id: 1
 * name: movie review
 *
 * template data 1
 * id: 1
 * parentId: null
 * nextId: 2
 * prevId: null
 * templateId: 1
 * data
 *
 * template data 2
 * id: 2
 * parentId: null
 * nextId: null
 * prevId: 1
 * templateId: 1
 * data
 * */
/** movie review input
 * name: 'Movie Review'
 * data: [
 * {
 *  data: {
 *    name: "Thoughts"
 *  },
 *  temp: {
 *    id: 1,
 *    nextId: 2,
 *    prevId: null,
 *    parentId: null
 *  }
 * },
 * {
 *  data: {
 *    name: "Review"
 *  },
 *  temp: {
 *    id: 2,
 *    nextId: null,
 *    prevId: 1,
 *    parentId: null
 *  }
 * }
 * ]
 */
/** movie theatre review input (assume movie review templates id is 123)
 * name: 'Movie Theatre Review'
 * data: [
 * {
 *  data: {
 *    name: "Overall"
 *  },
 *  temp: {
 *    id: 1,
 *    nextId: 2,
 *    prevId: null,
 *    parentId: null
 *  }
 * },
 * {
 *  templateId: 123,
 *  temp: {
 *    id: 2,
 *    nextId: null,
 *    prevId: 1,
 *    parentId: null
 *  }
 * }
 * ]
 */
//# sourceMappingURL=newsletter-item-template.js.map