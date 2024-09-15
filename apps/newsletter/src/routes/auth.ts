import { Router, Express } from 'express';
import db from '../db/db';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import session from 'express-session';
import {
  createCredentialsForProvider,
  getCredentialsForProvider,
} from '../db/queries/auth';
import { createUser, getUserByEmail } from '../db/queries/user';

interface GoogleCredentials {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: { value: string }[];
}

interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

// const SCOPES = [
//     'https://www.googleapis.com/auth/drive.file',
//     'https://www.googleapis.com/auth/drive.photos.readonly',
//     'https://www.googleapis.com/auth/userinfo.email',
//     'https://www.googleapis.com/auth/userinfo.profile',
//   ];

const SCOPES = ['profile', 'email', 'https://www.googleapis.com/auth/drive'];

const GOOGLE_AUTH = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/v1/auth/google/redirect',
  scope: SCOPES,
  state: true,
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
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new Strategy(GOOGLE_AUTH, async function verify(
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      try {
        const email = profile.emails[0].value;
        let user = await getUserByEmail(db, email);

        if (!user) {
          user = await createUser(db, {
            firstName: profile.name.givenName,
            lastName: profile.name.givenName,
            email,
          });
        }

        const credentials = await getCredentialsForProvider(db, {
          subjectId: profile.id,
          provider: 'google',
        });

        if (!credentials) {
          await createCredentialsForProvider(db, {
            subjectId: profile.id,
            provider: 'google',
            userId: user.id,
          });
        }
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

  passport.serializeUser((req, user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
  return app;
}

export default router;
