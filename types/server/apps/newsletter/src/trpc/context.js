"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const db_1 = require("../db");
const dao_1 = require("../dao");
const services_1 = require("../services");
const gcs = new services_1.GCSManager();
const locationDAO = new dao_1.LocationDAO(db_1.dbClient);
const newsletterItemDetailsDAO = new dao_1.NewsletterItemDetailsDAO(db_1.dbClient);
const newsletterItemDAO = new dao_1.NewsletterItemDAO(db_1.dbClient, locationDAO, newsletterItemDetailsDAO);
const newsletterDAO = new dao_1.NewsletterDAO(db_1.dbClient, gcs, newsletterItemDAO);
const userDAO = new dao_1.UserDAO(db_1.dbClient);
const newsletterItemTemplateDAO = new dao_1.NewsletterItemTemplateDAO(db_1.dbClient);
function createContext({ req, res }) {
    return {
        req,
        res,
        gcs: gcs,
        db: db_1.dbClient,
        dao: {
            user: userDAO,
            newsletter: newsletterDAO,
            location: locationDAO,
            newsletterItem: newsletterItemDAO,
            newsletterItemTemplate: newsletterItemTemplateDAO,
        },
    };
}
//# sourceMappingURL=context.js.map