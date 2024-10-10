"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateRange = void 0;
const parseDateRange = (startDate, endDate) => {
    if (endDate && !startDate) {
        throw new Error('must have a start date date range specified');
    }
    return startDate
        ? {
            start: startDate,
            end: endDate,
        }
        : null;
};
exports.parseDateRange = parseDateRange;
//# sourceMappingURL=helpers.js.map