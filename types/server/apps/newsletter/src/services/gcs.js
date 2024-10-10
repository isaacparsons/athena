"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCSManager = void 0;
const tslib_1 = require("tslib");
const storage_1 = require("@google-cloud/storage");
const parse_env_1 = require("../util/parse-env");
const env = (0, parse_env_1.parseEnv)();
const storage = new storage_1.Storage({
    keyFilename: '/Users/isaacparsons/Documents/projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});
class GCSManager {
    constructor() {
        this.bucket = storage.bucket(env.gcs.bucketName);
    }
    getSignedUrl(fileName, action) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const [url] = yield storage
                .bucket(env.gcs.bucketName)
                .file(fileName)
                .getSignedUrl({
                version: 'v4',
                action: action,
                expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            });
            return url;
        });
    }
}
exports.GCSManager = GCSManager;
//# sourceMappingURL=gcs.js.map