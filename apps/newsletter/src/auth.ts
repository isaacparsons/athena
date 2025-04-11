import express, { Request, Response } from 'express';
import { StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { getConfig } from './util';
import passport from 'passport';

const config = getConfig();
const router = express.Router();

export const GOOGLE_SCOPES = ['profile', 'email'];

export const GOOGLE_AUTH: StrategyOptionsWithRequest = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: `http://${config.client.host}:${config.app.port}${config.google.callbackUrl}`,
  scope: GOOGLE_SCOPES,
  state: true,
  passReqToCallback: true,
};

const GOOGLE_AUTH_URL = `/google`;
const GOOGLE_AUTH_REDIRECT_URL = `/google/redirect`;
const LOGOUT_URL = `/logout`;
const GOOGLE_SUCCESS_REDIRECT_URL = `http://${config.client.host}:${config.client.port}`;
const GOOGLE_FAILURE_REDIRECT_URL = `http://${config.client.host}:${config.client.port}/failed`;

router.get(
  GOOGLE_AUTH_URL,
  passport.authenticate('google', {
    scope: GOOGLE_SCOPES,
    accessType: 'offline',
    prompt: 'consent',
  })
);

router.get(
  GOOGLE_AUTH_REDIRECT_URL,
  passport.authenticate('google', {
    successRedirect: GOOGLE_SUCCESS_REDIRECT_URL,
    failureRedirect: GOOGLE_FAILURE_REDIRECT_URL,
  })
);

router.get(LOGOUT_URL, (req: Request, res: Response) => {
  req.logout(() => {
    res.send('OK');
  });
});

export { router as authRoutes };
