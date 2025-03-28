"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = initPassport;
const tslib_1 = require("tslib");
const express_1 = require("express");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const remeda_1 = require("remeda");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const util_1 = require("../../util");
const config = (0, util_1.getConfig)();
const SCOPES = ['profile', 'email', 'https://www.googleapis.com/auth/drive'];
const GOOGLE_AUTH = {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
    scope: SCOPES,
    state: true,
    passReqToCallback: true,
};
const router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', {
    scope: SCOPES,
    accessType: 'offline',
    prompt: 'consent',
}));
router.get('/google/redirect', passport_1.default.authenticate('google', {
    successRedirect: 'http://localhost:4200',
    failureRedirect: '/',
}));
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.send('OK');
    });
});
function initPassport(app) {
    app.use((0, express_session_1.default)({
        name: config.app.sessionCookieName,
        secret: config.app.sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
        },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.use(new passport_google_oauth20_1.Strategy(GOOGLE_AUTH, function verify(req, accessToken, refreshToken, profile, done) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const _email = (0, remeda_1.first)((_a = profile.emails) !== null && _a !== void 0 ? _a : []);
                const email = _email ? _email.value : null;
                if (!email) {
                    throw new Error('No email');
                }
                let user = yield req.db
                    .selectFrom('user')
                    .where('email', '=', email)
                    .selectAll()
                    .executeTakeFirst();
                if (!user) {
                    user = yield req.db
                        .insertInto('user')
                        .values({
                        firstName: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName,
                        lastName: (_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName,
                        email: email,
                    })
                        .returningAll()
                        .executeTakeFirstOrThrow();
                }
                const credentials = yield req.db
                    .selectFrom('federatedCredential')
                    .where((eb) => eb.and([eb('subjectId', '=', profile.id), eb('provider', '=', 'google')]))
                    .selectAll()
                    .executeTakeFirst();
                if (!credentials) {
                    yield req.db
                        .insertInto('federatedCredential')
                        .values({
                        subjectId: profile.id,
                        provider: 'google',
                        userId: user.id,
                    })
                        .returningAll()
                        .executeTakeFirstOrThrow();
                }
                return done(null, {
                    email: user.email,
                    userId: user.id,
                    accessToken,
                    refreshToken,
                });
            }
            catch (error) {
                console.log(error);
                return done(new Error('unable to resolve user'));
            }
        });
    }));
    passport_1.default.serializeUser((req, user, done) => {
        done(null, user);
    });
    passport_1.default.Authenticator;
    passport_1.default.deserializeUser((user, done) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        done(null, user);
    }));
    return app;
}
exports.default = router;
//# sourceMappingURL=auth.js.map