"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCSManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const storage_1 = require("@google-cloud/storage");
const storage = new storage_1.Storage({
    keyFilename: '/Users/isaacparsons/Documents/Projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});
let GCSManager = class GCSManager {
    constructor() {
        this.bucketName = process.env['GOOGLE_STORAGE_BUCKET_NAME'];
        // this.bucket = storage.bucket(this.env.gcs.bucketName);
        this.bucket = storage.bucket(this.bucketName);
    }
    getSignedUrl(fileName, action) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const [url] = yield storage
                .bucket(this.bucketName)
                .file(fileName)
                .getSignedUrl({
                version: 'v4',
                action: action,
                expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            });
            return url;
        });
    }
};
exports.GCSManager = GCSManager;
exports.GCSManager = GCSManager = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], GCSManager);
//# sourceMappingURL=gcs.js.map