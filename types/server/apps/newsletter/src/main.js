"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const express_2 = require("@trpc/server/adapters/express");
const cors_1 = tslib_1.__importDefault(require("cors"));
const index_1 = require("./routes/index");
const auth_1 = require("./routes/auth");
const parse_env_1 = require("./util/parse-env");
const context_1 = require("./trpc/context");
const env = (0, parse_env_1.parseEnv)();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    // credentials: true,
    credentials: false,
    // origin: [
    //   `http://${env.client.host}:${env.client.port}`,
    //   'https://storage.googleapis.com/athena-newsletter',
    // ],
    origin: '*',
    AccessControlAllowOrigin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app = (0, auth_1.initPassport)(exports.app);
exports.app.get('/health', (req, res) => {
    res.send({ status: 'OK' });
});
exports.app.use('/api/v1/trpc', (0, express_2.createExpressMiddleware)({
    router: index_1.appRouter,
    createContext: context_1.createContext,
}));
exports.app.listen(env.app.port, env.app.host, () => {
    console.log(`[ ready ] http://${env.app.host}:${env.app.port}`);
});
//# sourceMappingURL=main.js.map