import _ from 'lodash';
import { StateCreator } from 'zustand';
import { Slices } from '@frontend/store';
import { ReadUser } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export interface UserSlice {
  user: {
    loading: boolean;
    data: ReadUser | null;
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
      const user = await asyncTrpcClient.users.read.query();
      set((state) => {
        state.user.data = user;
        state.user.loading = false;
      });
    },
  },
});
