import _ from 'lodash';
import { StateCreator } from 'zustand';
import { User } from '@athena/athena-common';
import { Slices } from '.';
import { asyncTrpcClient } from '../../trpc';

export interface UserSlice {
  user: {
    loading: boolean;
    data: Omit<User, 'newsletters'> | null;
    fetch: () => Promise<void>;
  };
}

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
      const user = await asyncTrpcClient.users.get.query();
      set((state) => {
        state.user.data = _.omit(user, ['newsletters']);
        state.user.loading = false;
      });
      get().newsletters.addNewsletters(user.newsletters);
      get().newsletterItemTemplates.addTemplates(user.newsletterItemTemplates);
    },
  },
});
