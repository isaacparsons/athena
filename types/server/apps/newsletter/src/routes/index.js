"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const tslib_1 = require("tslib");
const user_1 = require("./user");
const newsletter_1 = tslib_1.__importDefault(require("./newsletter"));
const newsletter_item_1 = tslib_1.__importDefault(require("./newsletter-item"));
const trpc_1 = require("../trpc/trpc");
exports.appRouter = trpc_1.trpc.router({
    users: user_1.userRouter,
    newsletters: newsletter_1.default,
    newsletterItems: newsletter_item_1.default,
});
// export {} from './user';
// export {
//   CreateNewsletterInput,
//   ReadNewsletterInput,
//   UpdateNewsletterInput,
//   DeleteNewsletterInput,
//   NewsletterInput,
// } from './newsletter';
// export {
//   CreateNewsletterItemInput,
//   ReadNewsletterItemInput,
//   UpdateNewsletterItemInput,
//   DeleteNewsletterItemInput,
//   NewsletterItemInput,
//   LocationInput,
// } from './newsletter-item';
//# sourceMappingURL=index.js.map