"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.trpc = void 0;
const server_1 = require("@trpc/server");
exports.trpc = server_1.initTRPC
    .context()
    .create({
    errorFormatter(opts) {
        const { shape, error } = opts;
        console.log(error);
        return shape;
    },
});
exports.publicProcedure = exports.trpc.procedure;
//# sourceMappingURL=trpc.js.map