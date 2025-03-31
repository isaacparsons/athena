"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const express_1 = tslib_1.__importDefault(require("express"));
const express_2 = require("@trpc/server/adapters/express");
const cors_1 = tslib_1.__importDefault(require("cors"));
const util_1 = require("./util");
const trpc_1 = require("./trpc");
const config = (0, util_1.getConfig)();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    // credentials: true,
    // origin: [
    //   `http://${config.client.host}:${config.client.port}`,
    //   'https://storage.googleapis.com/athena-newsletter',
    // ],
    credentials: false,
    origin: '*',
    // AccessControlAllowOrigin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app = (0, trpc_1.initPassport)(exports.app);
exports.app.get('/health', (req, res) => {
    res.send({ status: 'OK' });
});
exports.app.use('/api/v1/trpc', (0, express_2.createExpressMiddleware)({
    router: trpc_1.appRouter,
    createContext: trpc_1.createContext,
    onError(opts) {
        const { error, type, path, input, ctx, req } = opts;
        console.error('Error:', error);
        // if (error.code === 'INTERNAL_SERVER_ERROR') {
        // }
    },
}));
exports.app.listen(config.app.port, config.app.host, () => {
    console.log(`[ ready ] http://${config.app.host}:${config.app.port}`);
});
// web app
// export const webApp = express();
// const webAppPath = path.join(__dirname, '..', '..', '..', '..', 'athena-frontend');
// webApp.use(express.static(webAppPath));
// webApp.get('*', (req, res) => {
//   res.sendFile(path.join(webAppPath, 'index.html'));
// });
// webApp.listen(config.client.port, config.client.host, () => {
//   console.log(`[ ready ] http://${config.client.host}:${config.client.port}`);
// });
//# sourceMappingURL=main.js.map