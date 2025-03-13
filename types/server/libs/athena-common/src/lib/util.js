"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullToUndefined = exports.logObject = void 0;
exports.range = range;
exports.mapToArray = mapToArray;
exports.formatDate = formatDate;
exports.formatDateRange = formatDateRange;
exports.mimeTypeToMediaFormat = mimeTypeToMediaFormat;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const athena_common_1 = require("./athena-common");
const logObject = (item, label) => {
    if (label) {
        console.log(label, JSON.stringify(item, null, 4));
    }
    else {
        console.log(JSON.stringify(item, null, 4));
    }
};
exports.logObject = logObject;
function range(x) {
    return Array.from({ length: x + 1 }, (_, i) => i);
}
function mapToArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
}
function formatDate(date) {
    return new Date(date).toDateString();
}
function formatDateRange(dateRange) {
    if (!dateRange.start)
        return null;
    const start = formatDate(dateRange.start);
    const end = dateRange.end ? formatDate(dateRange.end) : null;
    return end ? `${start} - ${end}` : start;
}
function mimeTypeToMediaFormat(mimeType) {
    const type = mimeType.split('/')[0];
    if (type === 'image')
        return athena_common_1.MediaFormat.Image;
    if (type === 'video')
        return athena_common_1.MediaFormat.Video;
    if (type === 'audio')
        return athena_common_1.MediaFormat.Audio;
    throw new Error('Unsupported mime type');
}
const nullToUndefined = (v) => (lodash_1.default.isNull(v) ? undefined : v);
exports.nullToUndefined = nullToUndefined;
//# sourceMappingURL=util.js.map