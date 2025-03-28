// import {
//   CreateNewsletterPostTemplate,
//   NewsletterPostTemplate,
// } from '@athena/common';
// import { Slices } from '@athena/store';
// import { StateCreator } from 'zustand';
// import { asyncTrpcClient } from '../../trpc';

// export interface NewsletterPostTemplatesSlice {
//   newsletterItemTemplates: {
//     loading: boolean;
//     data: Record<number, NewsletterPostTemplate>;
//     fetch: (id: number) => Promise<NewsletterPostTemplate>;
//     save: (input: CreateNewsletterPostTemplate) => Promise<number>;
//     // addTemplates: (templates: Omit<NewsletterPostTemplateBase, 'items'>[]) => void;
//   };
// }

// export const createNewsletterPostTemplatesSlice: StateCreator<
//   Slices,
//   [['zustand/devtools', never], ['zustand/immer', never]],
//   [],
//   NewsletterPostTemplatesSlice
// > = (set, get) => ({
//   newsletterItemTemplates: {
//     loading: false,
//     error: null,
//     data: {},
//     fetch: async (id: number) => {
//       set((state) => {
//         state.newsletterItemTemplates.loading = true;
//       });
//       const template = await asyncTrpcClient.newsletterItemTemplates.get.query({
//         id,
//       });
//       set((state) => {
//         state.newsletterItemTemplates.loading = false;
//         state.newsletterItemTemplates.data[id] = template;
//       });
//       return template;
//     },
//     save: async (input: CreateNewsletterPostTemplate) => {
//       set((state) => {
//         state.newsletterItemTemplates.loading = true;
//       });
//       const id = await asyncTrpcClient.newsletterItemTemplates.create.mutate(input);
//       set((state) => {
//         state.newsletterItemTemplates.loading = true;
//       });
//       get().newsletterItemTemplates.fetch(id);
//       return id;
//     },
//     // addTemplates: (templates: NewsletterPostTemplateBase[]) => {
//     //   set((state) => {
//     //     templates.forEach((t) => {
//     //       state.newsletterItemTemplates.templates[t.id] = t;
//     //     });
//     //   });
//     // },
//   },
// });
