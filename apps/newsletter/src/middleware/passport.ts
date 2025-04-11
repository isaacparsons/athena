import { Request, Express } from 'express';
import passport from 'passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { first } from 'remeda';
import { UserSession } from '@athena/common';
import { GOOGLE_AUTH } from '../auth';

export const passportMiddleware = (app: Express) => {
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
        if (!email) throw new Error('No email');

        const user = await req.dao.user.upsert(
          {
            email,
            firstName: profile.name?.givenName ?? null,
            lastName: profile.name?.familyName ?? null,
          },
          {
            provider: 'google',
            subjectId: profile.id,
          }
        );

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
  // passport.Authenticator;
  passport.deserializeUser(
    async (user: UserSession, done: (err: unknown, user: UserSession) => void) => {
      done(null, user);
    }
  );
  return app;
};
