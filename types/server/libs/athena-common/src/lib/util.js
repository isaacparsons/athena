"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logObject = void 0;
exports.range = range;
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
//# sourceMappingURL=util.js.map