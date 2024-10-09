import _ from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { Newsletter, NewsletterItem, User, NewsletterBase } from '@athena/api';

type StoreNewsletter = Omit<Newsletter, 'items'> & {
  itemIds: number[];
};

type StoreNewsletterItem = Omit<NewsletterItem, 'children'> & {
  childrenIds: number[];
};

export interface Slice {
  user: User | null;
  newsletters: Record<number, StoreNewsletter>;
  newsletterItems: Record<number, StoreNewsletterItem>;
  fetchedUser: (user: User) => void;
  fetchedNewsletter: (newsletter: Newsletter) => void;
}

export const useStore = create<Slice>()(
  devtools(
    immer((set) => ({
      user: null,
      newsletters: {},
      newsletterItems: {},
      fetchedUser: (user) =>
        set((state) => {
          state.user = user;
        }),
      fetchedNewsletter: (newsletter: Newsletter) =>
        set((state) => {
          const items = newsletter.items;
          state.newsletters[newsletter.id] = {
            ..._.omit(newsletter, ['items']),
            itemIds: items.map((i) => i.id),
          };
          items.forEach((item) => {
            const childrenIds = item.children.map((c) => c.id);
            state.newsletterItems[item.id] = {
              ..._.omit(item, ['children']),
              childrenIds,
            };
          });
        }),
    }))
  )
);

// {
//     user,
//     newsletters: {
//         1: {
//             meta: {
//                 creator,
//                 modifier,
//                 created,
//                 modified
//             }
//             properties: {
//                 name,
//                 dateRange: {
//                     start,
//                     end
//                 }
//             }
//             owner: {}
//             members:
//             itemsIds: []
//         },
//         2: {

//         }
//     }
//     newsletterItems: {
//         id: number;
//         meta: Meta;
//         location: Location | null;
//         date: string | null;
//         title: string;
//         nextItemId: number | null;
//         previousItemId: number | null;
//         details?: {

//         }
//     }

// }
