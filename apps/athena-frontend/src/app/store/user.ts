import _ from 'lodash';
import { StateCreator } from 'zustand';
import { Slices } from '@frontend/store';
import { ReadUser } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';
import { getConfig } from '@frontend/config';
import Cookies from 'js-cookie';

export interface UserSlice {
  user: {
    loading: boolean;
    data: ReadUser | null;
    fetch: () => Promise<void>;
    logout: () => void;
  };
}
const config = getConfig();

export const createUserSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  UserSlice
> = (set, get) => ({
  user: {
    loading: false,
    data: null,
    fetch: async () => {
      set((state) => {
        state.user.loading = true;
      });
      const cookieName = config.SESSION_COOKIE_NAME;
      const sessionId = _.isUndefined(cookieName)
        ? undefined
        : Cookies.get(cookieName);

      if (sessionId) {
        const user = await asyncTrpcClient.users.read.query();
        set((state) => {
          state.user.data = user;
        });
      }

      set((state) => {
        state.user.loading = false;
      });
    },
    logout: () => {
      set((state) => {
        state.user.loading = true;
      });
      const cookieName = config.SESSION_COOKIE_NAME;
      if (cookieName) {
        Cookies.remove(cookieName);
      }
      set((state) => {
        state.user.data = null;
        state.user.loading = false;
      });
    },
  },
});
