"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDAO = exports.newsletterRolePermissionsMap = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const db_1 = require("@athena/db");
const common_1 = require("@athena/common");
const helpers_1 = require("../db/helpers");
const types_1 = require("../types/types");
const mapping_1 = require("./mapping");
const entity_1 = require("./entity");
const kysely_1 = require("kysely");
exports.newsletterRolePermissionsMap = {
    [common_1.NewsletterRole.READ_ONLY]: [common_1.NewsletterPermissions.READ],
    [common_1.NewsletterRole.OWNER]: [
        common_1.NewsletterPermissions.READ,
        common_1.NewsletterPermissions.WRITE,
        common_1.NewsletterPermissions.UPDATE,
        common_1.NewsletterPermissions.DELETE,
        common_1.NewsletterPermissions.COMMENT,
        common_1.NewsletterPermissions.EDIT_MEMBER,
        common_1.NewsletterPermissions.SHARE,
        common_1.NewsletterPermissions.INVITE,
    ],
    [common_1.NewsletterRole.EDITOR]: [
        common_1.NewsletterPermissions.READ,
        common_1.NewsletterPermissions.WRITE,
        common_1.NewsletterPermissions.UPDATE,
        common_1.NewsletterPermissions.DELETE,
        common_1.NewsletterPermissions.COMMENT,
        common_1.NewsletterPermissions.SHARE,
    ],
    [common_1.NewsletterRole.COMMENTOR]: [
        common_1.NewsletterPermissions.READ,
        common_1.NewsletterPermissions.COMMENT,
    ],
};
let NewsletterDAO = class NewsletterDAO extends entity_1.EntityDAO {
    constructor(db, gcs, newsletterItemDAO) {
        super();
        this.db = db;
        this.gcs = gcs;
        this.newsletterItemDAO = newsletterItemDAO;
        this.tableName = 'newsletter';
    }
    toEntity(row) {
        return {
            id: row.id,
            meta: (0, mapping_1.mapMeta)(row),
            properties: {
                name: row.name,
                dateRange: (0, mapping_1.mapDateRange)(row),
            },
            owner: (0, mapping_1.mapUser)(row.owner),
            members: (0, mapping_1.mapUsers)(row.members),
            posts: row.posts,
        };
    }
    members(newsletterId) {
        const eb = (0, kysely_1.expressionBuilder)();
        return (0, db_1.jsonArrayFrom)(eb
            .selectFrom('user_newsletter as un')
            .where('un.newsletterId', '=', newsletterId)
            .innerJoin('user', 'user.id', 'un.userId')
            .selectAll('user')).as('members');
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const newsletter = yield this.selectEntity(trx)
                    .select((eb) => [
                    'name',
                    'startDate',
                    'endDate',
                    (0, helpers_1.owner)(trx, eb.ref('ownerId')).as('owner'),
                    this.members(eb.ref('newsletter.id')),
                ])
                    .where('id', '=', id)
                    .executeTakeFirstOrThrow(() => new Error(`newsletter with id: ${id} does not exist`));
                const posts = yield this.newsletterItemDAO.getByNewsletterId(id);
                return this.toEntity(Object.assign(Object.assign({}, newsletter), { posts }));
            }));
        });
    }
    getByUserId(id) {
        return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsletters = yield trx
                .selectFrom('user_newsletter as un')
                .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
                .where('un.userId', '=', id)
                .select((eb) => [
                'n.id',
                'n.created',
                'n.modified',
                'n.name',
                'n.startDate',
                'n.endDate',
                (0, helpers_1.modifier)(trx, eb.ref('n.modifierId')).as('modifier'),
                (0, helpers_1.creator)(trx, eb.ref('n.creatorId')).as('creator'),
                (0, helpers_1.owner)(trx, eb.ref('n.ownerId')).as('owner'),
            ])
                .execute();
            return newsletters.map((n) => {
                const _a = this.toEntity(Object.assign(Object.assign({}, n), { posts: [], members: [] })), { posts, members } = _a, rest = tslib_1.__rest(_a, ["posts", "members"]);
                return rest;
            });
        }));
    }
    create(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const newsletter = yield this.postEntities(trx, userId, [
                    {
                        name: input.properties.name,
                        startDate: (_a = input.properties.dateRange) === null || _a === void 0 ? void 0 : _a.start,
                        endDate: (_b = input.properties.dateRange) === null || _b === void 0 ? void 0 : _b.end,
                        ownerId: userId,
                    },
                ])
                    .returningAll()
                    .executeTakeFirstOrThrow();
                yield trx
                    .insertInto('user_newsletter')
                    .values({
                    userId: userId,
                    role: common_1.NewsletterRole.OWNER,
                    newsletterId: newsletter.id,
                })
                    .executeTakeFirstOrThrow();
                return newsletter.id;
            }));
        });
    }
    update(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const res = yield this.updateEntity(this.db, userId, {
                id: input.id,
                name: input.properties.name,
                startDate: (_a = input.properties.dateRange) === null || _a === void 0 ? void 0 : _a.start,
                endDate: (_b = input.properties.dateRange) === null || _b === void 0 ? void 0 : _b.end,
            })
                .returning('id')
                .where('id', '=', input.id)
                .executeTakeFirstOrThrow();
            return res.id;
        });
    }
    delete(userId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.deleteEntity(this.db)
                .where('id', '=', id)
                .where('ownerId', '=', userId)
                .returning('id')
                .executeTakeFirstOrThrow();
            return res.id;
        });
    }
    validPermissions(role, permissions) {
        const rolePermissions = exports.newsletterRolePermissionsMap[role];
        return permissions.every((permission) => rolePermissions.includes(permission));
    }
    inviteUser(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { newsletterId, email } = input;
            const { role } = yield this.db
                .selectFrom('user_newsletter')
                .select('role')
                .where(({ and, eb }) => and([eb('userId', '=', userId), eb('newsletterId', '=', newsletterId)]))
                .executeTakeFirstOrThrow();
            if (!this.validPermissions(role, [common_1.NewsletterPermissions.INVITE]))
                throw new Error(`Do not have permissions`);
            yield this.db
                .insertInto('user_newsletter')
                .values({
                userId: this.db.selectFrom('user').select('id').where('email', '=', email),
                newsletterId,
                role: input.role,
            })
                .executeTakeFirstOrThrow();
        });
    }
};
exports.NewsletterDAO = NewsletterDAO;
exports.NewsletterDAO = NewsletterDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    (0, inversify_1.injectFromBase)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__param(1, (0, inversify_1.inject)(types_1.TYPES.IGCSManager)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.TYPES.INewsletterPostDAO)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], NewsletterDAO);
//# sourceMappingURL=newsletter.js.map