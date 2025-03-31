"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../types/types");
function createContext({ req, res }) {
    return {
        req,
        res,
        gcs: inversify_config_1.container.get(types_1.TYPES.IGCSManager),
        db: inversify_config_1.container.get(types_1.TYPES.DBClient),
        dao: {
            user: inversify_config_1.container.get(types_1.TYPES.IUserDAO),
            newsletter: inversify_config_1.container.get(types_1.TYPES.INewsletterDAO),
            location: inversify_config_1.container.get(types_1.TYPES.ILocationDAO),
            newsletterPost: inversify_config_1.container.get(types_1.TYPES.INewsletterPostDAO),
            template: inversify_config_1.container.get(types_1.TYPES.ITemplateDAO),
        },
    };
}
//# sourceMappingURL=context.js.map