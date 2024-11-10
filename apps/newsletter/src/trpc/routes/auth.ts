import { Router, Express, Request, Response } from 'express';
import passport from 'passport';
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20';
import { first } from 'remeda';
import session from 'express-session';
import { parseEnv } from '../../util';
import { UserSession } from '@athena/common';

const env = parseEnv();

const SCOPES = ['profile', 'email', 'https://www.googleapis.com/auth/drive'];

const GOOGLE_AUTH: StrategyOptionsWithRequest = {
  clientID: env.google.clientId,
  clientSecret: env.google.clientSecret,
  callbackURL: env.google.callbackUrl,
  scope: SCOPES,
  state: true,
  passReqToCallback: true,
};

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: SCOPES,
    accessType: 'offline',
    prompt: 'consent',
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:4200',
    failureRedirect: '/',
  })
);

router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.send('OK');
  });
});

export function initPassport(app: Express) {
  app.use(
    session({
      name: env.app.sessionCookieName,
      secret: env.app.sessionSecret,
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
          .selectFrom('federatedCredential')
          .where((eb) =>
            eb.and([eb('subjectId', '=', profile.id), eb('provider', '=', 'google')])
          )
          .selectAll()
          .executeTakeFirst();

        if (!credentials) {
          await req.db
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
  return app;
}

export default router;
