"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapItems = exports.mapItem = void 0;
const athena_common_1 = require("@athena/athena-common");
function getDetails(item) {
    if (item.mediaDetails) {
        return Object.assign(Object.assign({}, item.mediaDetails), { type: athena_common_1.NewsletterItemType.media });
    }
    else if (item.textDetails) {
        return Object.assign(Object.assign({}, item.textDetails), { type: athena_common_1.NewsletterItemType.text });
    }
}
const mapItem = (item) => {
    return {
        id: item.id,
        title: item.title,
        date: item.date,
        parentId: item.parentId,
        nextItemId: item.nextItemId,
        previousItemId: item.previousItemId,
        meta: {
            modifier: item.modifier,
            modified: item.modified,
            creator: item.creator,
            created: item.created,
        },
        location: item.location
            ? {
                id: item.location.id,
                country: item.location.countryCode,
                name: item.location.name,
                position: item.location.lattitude && item.location.longitude
                    ? {
                        lattitude: item.location.lattitude,
                        longitude: item.location.longitude,
                    }
                    : null,
            }
            : null,
        details: getDetails(item),
    };
};
exports.mapItem = mapItem;
const mapItems = (id, items) => {
    const _parentItem = items.find((item) => item.id === id);
    if (!_parentItem)
        throw new Error('invalid');
    const parentItem = (0, exports.mapItem)(_parentItem);
    const childItems = items
        .filter((item) => item.id !== id)
        .map((item) => (0, exports.mapItem)(item));
    return Object.assign(Object.assign({}, parentItem), { children: childItems });
};
exports.mapItems = mapItems;
//# sourceMappingURL=newsletter-item-mapper.js.map