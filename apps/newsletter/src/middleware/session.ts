import session from 'express-session';
import { getConfig, isAuthEnabled } from '../util';

const config = getConfig();

const cookieConfig: session.CookieOptions = isAuthEnabled()
  ? {
      httpOnly: false,
      sameSite: 'lax', // lax is best for dev HTTP
      secure: false,
    }
  : {
      httpOnly: false,
    };

export const sessionMiddleware = session({
  name: config.app.sessionCookieName,
  secret: config.app.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: cookieConfig,
});
