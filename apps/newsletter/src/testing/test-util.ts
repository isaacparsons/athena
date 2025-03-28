import {
  CreateNewsletter,
  NewsletterPost,
  UpdateNewsletterPosts,
  UpdateNewsletter,
  InviteNewsletterUser,
  Newsletter,
  CreateNewsletterPost,
  CreateManyNewsletterPosts,
  // CreateNewsletterPostsBatch,
} from '@athena/common';
import { createContext } from '../trpc';
import {
  AppRouter,
  appRouter as router,
  RouterEndpoint,
  RouterEndpointType,
} from '../trpc/routes';

export const createMockRequest =
  <R extends RouterEndpoint>(entityType: R) =>
  (endpointType: RouterEndpointType<R>) =>
  (userId: number, input: object) => {
    const type = (router[entityType][endpointType] as any)._type;
    return {
      ctx: createContext({
        req: {
          user: { userId },
          isAuthenticated: () => true,
        } as any,
        res: {} as any,
      }),
      path: '',
      rawInput: input,
      type,
    };
  };

const newsletterMockRequest = createMockRequest('newsletters');
const newsletterPostMockRequest = createMockRequest('newsletterPosts');
const userMockRequest = createMockRequest('users');

export async function getNewsletter(userId: number, newsletterId: number) {
  return router.newsletters.get(
    newsletterMockRequest('get')(userId, { id: newsletterId })
  ) as Promise<Newsletter>;
}

export async function createNewsletter(userId: number, input: CreateNewsletter) {
  return router.newsletters.create(
    newsletterMockRequest('create')(userId, input)
  ) as Promise<number>;
}

export async function updateNewsletter(userId: number, input: UpdateNewsletter) {
  return router.newsletters.update(
    newsletterMockRequest('update')(userId, input)
  ) as Promise<number>;
}

export async function deleteNewsletter(userId: number, id: number) {
  return router.newsletters.delete(
    newsletterMockRequest('delete')(userId, { id })
  ) as Promise<number>;
}

export async function inviteNewsletterUser(
  userId: number,
  input: InviteNewsletterUser
) {
  return router.newsletters.inviteUser(
    newsletterMockRequest('inviteUser')(userId, input)
  );
}

export async function getNewsletterPost(userId: number, newsletterPostId: number) {
  return router.newsletterPosts.get(
    newsletterPostMockRequest('get')(userId, { id: newsletterPostId })
  ) as Promise<NewsletterPost>;
}

export async function deleteNewsletterPosts(userId: number, ids: number[]) {
  return router.newsletterPosts.deleteMany(
    newsletterPostMockRequest('deleteMany')(userId, { ids })
  );
}

export async function updateNewsletterPosts(
  userId: number,
  input: UpdateNewsletterPosts
) {
  return router.newsletterPosts.update(
    newsletterPostMockRequest('update')(userId, input)
  );
}

export async function createNewsletterPosts(
  userId: number,
  input: CreateManyNewsletterPosts
) {
  return router.newsletterPosts.createMany(
    newsletterPostMockRequest('createMany')(userId, input)
  ) as Promise<number>;
}

// export async function createNewsletterPostsBatch(
//   userId: number,
//   input: CreateNewsletterPostsBatch
// ) {
//   return router.newsletterPosts.createBatch(
//     newsletterPostMockRequest('createBatch')(userId, input)
//   ) as Promise<number[]>;
// }
