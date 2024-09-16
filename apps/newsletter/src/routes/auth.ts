import { Router, Express, Request } from 'express';
import passport from 'passport';
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20';
import { isDefined, first } from 'remeda';
import session from 'express-session';
import { parseEnv } from '../util/parse-env';

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

const env = parseEnv();

const SCOPES = ['profile', 'email', 'https://www.googleapis.com/auth/drive'];

const GOOGLE_AUTH: StrategyOptionsWithRequest = {
  clientID: env.google.clientId,
  clientSecret: env.google.clientSecret,
  callbackURL: env.google.callbackUrl,
  scope: SCOPES,
  state: true,
  passReqToCallback: true,
  // accessType: 'offline', // Request offline access to get a refresh token
  // prompt: 'consent',
};

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: SCOPES,
    accessType: 'offline', // Request offline access to get a refresh token
    prompt: 'consent',
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

export function initPassport(app: Express) {
  app.use(
    session({
      secret: env.app.sessionSecret,
      resave: false,
      saveUninitialized: true,
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
        console.log('google authorization success!');
        console.log('checking for user in db...');

        const _email = first(profile.emails ?? []);
        const email = _email ? _email.value : null;
        if (!email) {
          throw new Error('No email');
        }

        let user = await req.db.getUserByEmail(email);

        if (!user) {
          user = await req.db.createUser({
            firstName: profile.name?.givenName,
            lastName: profile.name?.givenName,
            email,
          });
        }

        const credentials = await req.db.getCredentialsForProvider({
          subjectId: profile.id,
          provider: 'google',
        });

        if (!credentials) {
          await req.db.createCredentialsForProvider({
            subjectId: profile.id,
            provider: 'google',
            userId: user.id,
          });
        }
        console.log('user found or created');
        console.log(user);
        console.log('credentials');
        console.log(credentials);
        return done(null, {
          email: user.email,
          userId: user.id,
          accessToken,
          refreshToken,
        });
      } catch (error) {
        console.log(error);
        return done(new Error('unable to resolve user'));
      }
    })
  );

  passport.serializeUser((req: Request, user: UserSession, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user: UserSession, done) => {
    console.log('session found');
    console.log(user);
    done(null, user);
  });
  return app;
}

export default router;
