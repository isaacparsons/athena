"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const tslib_1 = require("tslib");
const user_1 = require("./user");
const newsletter_1 = tslib_1.__importDefault(require("./newsletter"));
const newsletter_item_1 = tslib_1.__importDefault(require("./newsletter-item"));
const newsletter_item_template_1 = tslib_1.__importDefault(require("./newsletter-item-template"));
const __1 = require("..");
tslib_1.__exportStar(require("./user"), exports);
tslib_1.__exportStar(require("./newsletter"), exports);
tslib_1.__exportStar(require("./newsletter-item"), exports);
tslib_1.__exportStar(require("./newsletter-item-template"), exports);
tslib_1.__exportStar(require("./auth"), exports);
exports.appRouter = __1.trpc.router({
    users: user_1.userRouter,
    newsletters: newsletter_1.default,
    newsletterItems: newsletter_item_1.default,
    newsletterItemTemplates: newsletter_item_template_1.default,
});
tslib_1.__exportStar(require("./newsletter"), exports);
//# sourceMappingURL=index.js.map