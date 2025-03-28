"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationDAO = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types/types");
let LocationDAO = class LocationDAO {
    constructor(db) {
        this.db = db;
    }
    post(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const res = yield this.db
                .insertInto('location')
                .values(Object.assign(Object.assign({}, input), { name: (_a = input === null || input === void 0 ? void 0 : input.name) !== null && _a !== void 0 ? _a : 'untitled' }))
                .returning('id')
                .executeTakeFirstOrThrow();
            return res.id;
        });
    }
    update(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.db
                .updateTable('location')
                .set(Object.assign(Object.assign(Object.assign({}, (input.name ? { name: input.name } : {})), (input.country ? { countryCode: input.country } : {})), (input.geoPosition ? { position: input.geoPosition } : {})))
                .returning('id')
                .where('id', '=', input.id)
                .executeTakeFirstOrThrow();
            return result.id;
        });
    }
};
exports.LocationDAO = LocationDAO;
exports.LocationDAO = LocationDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__metadata("design:paramtypes", [Object])
], LocationDAO);
//# sourceMappingURL=location.js.map