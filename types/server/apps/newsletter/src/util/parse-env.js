"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEnv = parseEnv;
function getInt(value) {
    const num = parseInt(value);
    if (isNaN(num))
        throw new Error(`${value} is not an int`);
    return num;
}
function checkEnvVariable(name, value) {
    if (!value || value.length === 0)
        throw new Error(`${name} must be specified`);
    return value;
}
function parseEnv() {
    var _a, _b;
    const API_HOST = (_a = process.env.API_HOST) !== null && _a !== void 0 ? _a : 'localhost';
    const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;
    const APP_SESSION_SECRET = (_b = process.env.APP_SESSION_SECRET) !== null && _b !== void 0 ? _b : '123456789';
    const DB_HOST = checkEnvVariable('DB_HOST', process.env.DB_HOST);
    const DB_PORT = getInt(checkEnvVariable('DB_PORT', process.env.DB_PORT));
    const DB_NAME = checkEnvVariable('DB_NAME', process.env.DB_NAME);
    const DB_USERNAME = checkEnvVariable('DB_USERNAME', process.env.DB_USERNAME);
    const DB_PASSWORD = checkEnvVariable('DB_PASSWORD', process.env.DB_PASSWORD);
    const CLIENT_HOST = checkEnvVariable('CLIENT_HOST', process.env.CLIENT_HOST);
    const CLIENT_PORT = getInt(checkEnvVariable('CLIENT_PORT', process.env.CLIENT_PORT));
    const GOOGLE_CLIENT_ID = checkEnvVariable('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID);
    const GOOGLE_CLIENT_SECRET = checkEnvVariable('GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET);
    const GOOGLE_CALLBACK_URL = checkEnvVariable('GOOGLE_CALLBACK_URL', process.env.GOOGLE_CALLBACK_URL);
    const APP_SESSION_COOKIE_NAME = checkEnvVariable('APP_SESSION_COOKIE_NAME', process.env.APP_SESSION_COOKIE_NAME);
    const GOOGLE_STORAGE_BUCKET_NAME = checkEnvVariable('GOOGLE_STORAGE_BUCKET_NAME', process.env.GOOGLE_STORAGE_BUCKET_NAME);
    const ADMIN_SECRET = process.env.ADMIN_SECRET;
    return {
        app: {
            host: API_HOST,
            port: API_PORT,
            sessionSecret: APP_SESSION_SECRET,
            sessionCookieName: APP_SESSION_COOKIE_NAME,
            adminSecret: ADMIN_SECRET,
        },
        db: {
            host: DB_HOST,
            port: DB_PORT,
            name: DB_NAME,
            username: DB_USERNAME,
            password: DB_PASSWORD,
        },
        google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackUrl: GOOGLE_CALLBACK_URL,
        },
        gcs: {
            bucketName: GOOGLE_STORAGE_BUCKET_NAME,
        },
        client: {
            host: CLIENT_HOST,
            port: CLIENT_PORT,
        },
    };
}
//# sourceMappingURL=parse-env.js.map