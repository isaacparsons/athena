import { ShowNotificationOptions } from '@toolpad/core';

export const successNotificationOptions: ShowNotificationOptions = {
  autoHideDuration: 3000,
  severity: 'success',
};

export const errorNotificationOptions: ShowNotificationOptions = {
  autoHideDuration: 3000,
  severity: 'error',
};

export function getConfig() {
  const BASE_URL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/v1`;
  return {
    GOOGLE_API_KEY: 'AIzaSyCQJxFCjWTq0wD0rZgKNWva92xJ2oDiuCU',
    GOOGLE_MAP_ID: '581acb5a0d44d953',
    GOOGLE_AUTH_URL: `${BASE_URL}/auth/google`,
    API_URL: `${BASE_URL}/api/trpc`,
    ADMIN_SECRET: `${process.env.REACT_APP_ADMIN_SECRET}`,
    SESSION_COOKIE_NAME: `${process.env.REACT_APP_SESSION_COOKIE_NAME}`,
  };
}
