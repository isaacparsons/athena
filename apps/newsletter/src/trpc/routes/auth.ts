import { Express, Request, Response } from 'express';
import passport from 'passport';
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20';
import { first } from 'remeda';
import session from 'express-session';
import { getConfig } from '../../util';
import { UserSession } from '@athena/common';

const config = getConfig();

const SCOPES = ['profile', 'email'];

const GOOGLE_AUTH: StrategyOptionsWithRequest = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
  scope: SCOPES,
  state: true,
  passReqToCallback: true,
};

const BASE_URL = '/v1/auth';
const GOOGLE_AUTH_URL = `${BASE_URL}/google`;
const GOOGLE_AUTH_REDIRECT_URL = `${BASE_URL}/google/redirect`;
const LOGOUT_URL = `${BASE_URL}/logout`;
const GOOGLE_SUCCESS_REDIRECT_URL = `http://${config.client.host}:${config.client.port}`;
const GOOGLE_FAILURE_REDIRECT_URL = '/';

export function initPassport(app: Express) {
  app.use(
    session({
      name: config.app.sessionCookieName,
      secret: config.app.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new Strategy(GOOGLE_AUTH, async function verify(
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) {
      try {
        const _email = first(profile.emails ?? []);
        const email = _email ? _email.value : null;
        if (!email) {
          throw new Error('No email');
        }

        let user = await req.db
          .selectFrom('user')
          .where('email', '=', email)
          .selectAll()
          .executeTakeFirst();

        if (!user) {
          user = await req.db
            .insertInto('user')
            .values({
              firstName: profile.name?.givenName,
              lastName: profile.name?.givenName,
              email: email,
            })
            .returningAll()
            .executeTakeFirstOrThrow();
        }

        const credentials = await req.db
          .selectFrom('federated_credential')
          .where((eb) =>
            eb.and([eb('subjectId', '=', profile.id), eb('provider', '=', 'google')])
          )
          .selectAll()
          .executeTakeFirst();

        if (!credentials) {
          await req.db
            .insertInto('federated_credential')
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
        } as UserSession);
      } catch (error) {
        console.log(error);
        return done(new Error('unable to resolve user'));
      }
    })
  );

  passport.serializeUser(
    (
      req: Request,
      user: UserSession,
      done: (err: unknown, user: UserSession) => void
    ) => {
      done(null, user);
    }
  );
  passport.Authenticator;
  passport.deserializeUser(
    async (user: UserSession, done: (err: unknown, user: UserSession) => void) => {
      done(null, user);
    }
  );
  app.get(
    GOOGLE_AUTH_URL,
    passport.authenticate('google', {
      scope: SCOPES,
      accessType: 'offline',
      prompt: 'consent',
    })
  );

  app.get(
    GOOGLE_AUTH_REDIRECT_URL,
    passport.authenticate('google', {
      successRedirect: GOOGLE_SUCCESS_REDIRECT_URL,
      failureRedirect: GOOGLE_FAILURE_REDIRECT_URL,
    })
  );

  app.get(LOGOUT_URL, (req: Request, res: Response) => {
    req.logout(() => {
      res.send('OK');
    });
  });
  return app;
}

// export default router;
