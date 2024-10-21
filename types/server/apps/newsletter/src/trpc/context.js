"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const client_1 = require("../db/client");
const user_1 = require("../dao/user");
const newsletter_1 = require("../dao/newsletter");
const gcs_1 = require("../services/gcs");
const location_1 = require("../dao/location");
const newsletter_item_1 = require("../dao/newsletter-item");
const newsletter_item_details_1 = require("../dao/newsletter-item-details");
const newsletter_item_template_1 = require("../dao/newsletter-item-template");
const gcs = new gcs_1.GCSManager();
const locationDAO = new location_1.LocationDAO(client_1.dbClient);
const newsletterItemDetailsDAO = new newsletter_item_details_1.NewsletterItemDetailsDAO(client_1.dbClient);
const newsletterItemDAO = new newsletter_item_1.NewsletterItemDAO(client_1.dbClient, locationDAO, newsletterItemDetailsDAO);
const newsletterDAO = new newsletter_1.NewsletterDAO(client_1.dbClient, gcs, newsletterItemDAO);
const userDAO = new user_1.UserDAO(client_1.dbClient);
const newsletterItemTemplateDAO = new newsletter_item_template_1.NewsletterItemTemplateDAO(client_1.dbClient);
function createContext({ req, res }) {
    return {
        req,
        res,
        gcs: gcs,
        db: client_1.dbClient,
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