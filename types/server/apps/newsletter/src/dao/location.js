"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationDAO = void 0;
const tslib_1 = require("tslib");
class LocationDAO {
    constructor(db) {
        this.db = db;
    }
    post(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.db
                .insertInto('location')
                .values(Object.assign(Object.assign({}, input), { name: (_a = input === null || input === void 0 ? void 0 : input.name) !== null && _a !== void 0 ? _a : 'untitled' }))
                .returningAll()
                .executeTakeFirstOrThrow();
        });
    }
}
exports.LocationDAO = LocationDAO;
//# sourceMappingURL=location.js.map