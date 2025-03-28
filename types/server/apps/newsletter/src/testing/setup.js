"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFixture = exports.parseFixture = void 0;
const tslib_1 = require("tslib");
const O = tslib_1.__importStar(require("fp-ts/Option"));
const function_1 = require("fp-ts/function");
const R = tslib_1.__importStar(require("ramda"));
const yaml_1 = require("yaml");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const path_1 = tslib_1.__importDefault(require("path"));
const faker_1 = require("@faker-js/faker");
const types_1 = require("../types/types");
const inversify_config_1 = require("../inversify.config");
const generateTypeMap = {
    email: faker_1.faker.internet.email,
};
const fixturesDir = path_1.default.join(__dirname, 'fixtures');
// const container = new Container();
// container.bind(TYPES.DBClient).toConstantValue(
//   new DB<Database>({
//     dialect: new PostgresDialect({
//       pool: new Pool({
//         database: 'newsletter',
//         host: 'localhost',
//         user: 'postgres',
//         password: 'postgres',
//         port: 5432,
//         max: 10,
//       }),
//     }),
//   })
// );
const db = inversify_config_1.container.get(types_1.TYPES.DBClient);
const parseFixture = (fileName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const contents = yield promises_1.default.readFile(path_1.default.join(fixturesDir, fileName), 'utf8');
    return (0, yaml_1.parse)(contents);
});
exports.parseFixture = parseFixture;
const createFixture = (fileName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    const entities = {};
    const fixture = yield (0, exports.parseFixture)(fileName);
    const refMap = new Map();
    const generateMap = new Map();
    const extractRef = (0, function_1.flow)(O.fromPredicate((i) => typeof i === 'string'), O.chain(O.fromPredicate(R.startsWith('__ref'))), O.map(R.split('.')), O.chain((x) => O.fromNullable(x[1])), O.chain((id) => O.fromNullable(refMap.get(id))), O.map(R.prop('id')));
    const transform = R.mapObjIndexed((value) => {
        if (typeof value !== 'string') {
            return value;
        }
        else {
            return (0, function_1.pipe)(value, extractRef, O.getOrElse(() => value));
        }
    });
    const extractGenerate = (0, function_1.flow)(O.fromPredicate(R.startsWith('__generate')), O.map(R.split('.')), O.chain((x) => O.fromNullable(x[1])), O.chain((id) => O.fromNullable(generateMap.get(id))));
    const transformGenerate = R.mapObjIndexed((value) => {
        if (typeof value !== 'string') {
            return value;
        }
        else {
            return (0, function_1.pipe)(value, extractGenerate, O.getOrElse(() => value));
        }
    });
    try {
        for (var _g = true, _h = tslib_1.__asyncValues(R.toPairs(fixture)), _j; _j = yield _h.next(), _a = _j.done, !_a; _g = true) {
            _c = _j.value;
            _g = false;
            const [key, val] = _c;
            if (key === 'generate') {
                for (const generateKey in val) {
                    if (!(val[generateKey] in generateTypeMap))
                        throw new Error('not a generatable type');
                    generateMap.set(generateKey, generateTypeMap[val[generateKey]]());
                }
            }
            else {
                try {
                    for (var _k = true, val_1 = (e_2 = void 0, tslib_1.__asyncValues(val)), val_1_1; val_1_1 = yield val_1.next(), _d = val_1_1.done, !_d; _k = true) {
                        _f = val_1_1.value;
                        _k = false;
                        const entity = _f;
                        const e = R.omit(['__ref'], entity);
                        const entityWithResolvedRefs = transform(e);
                        const entityWithGeneratedValues = transformGenerate(entityWithResolvedRefs);
                        const createdEntity = yield db
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .insertInto(key)
                            .values(entityWithGeneratedValues)
                            .returningAll()
                            .executeTakeFirstOrThrow();
                        if (key in entities) {
                            entities[key].push(createdEntity);
                        }
                        else {
                            entities[key] = [createdEntity];
                        }
                        if ('__ref' in entity)
                            refMap.set(entity['__ref'].toString(), createdEntity);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_k && !_d && (_e = val_1.return)) yield _e.call(val_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return entities;
});
exports.createFixture = createFixture;
//# sourceMappingURL=setup.js.map