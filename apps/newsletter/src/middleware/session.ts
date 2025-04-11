import session from 'express-session';
import { getConfig } from '../util';

const config = getConfig();

export const sessionMiddleware = session({
  name: config.app.sessionCookieName,
  secret: config.app.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    sameSite: 'lax', // lax is best for dev HTTP
    secure: false,
  },
});
