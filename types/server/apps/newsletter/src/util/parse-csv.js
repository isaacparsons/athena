"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvFile = parseCsvFile;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const csv_parse_1 = require("csv-parse");
const promises_1 = require("stream/promises");
function parseCsvFile(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const records = [];
        const parser = node_fs_1.default.createReadStream(file).pipe((0, csv_parse_1.parse)({}));
        parser.on('readable', function () {
            let record;
            while ((record = parser.read()) !== null) {
                records.push(record);
            }
        });
        yield (0, promises_1.finished)(parser);
        return records;
    });
}
//# sourceMappingURL=parse-csv.js.map