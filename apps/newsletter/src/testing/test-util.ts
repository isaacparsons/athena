import {
  CreateNewsletter,
  NewsletterPost,
  UpdateNewsletterPost,
  UpdateNewsletter,
  InviteNewsletterUser,
  Newsletter,
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
  return router.newsletters.post(
    newsletterMockRequest('post')(userId, input)
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

export async function deleteNewsletterPost(
  userId: number,
  newsletterPostIds: number[]
) {
  return router.newsletterPosts.deleteMany(
    newsletterPostMockRequest('deleteMany')(userId, { ids: newsletterPostIds })
  );
}

export async function updateNewsletterPost(
  userId: number,
  input: UpdateNewsletterPost
) {
  return router.newsletterPosts.update(
    newsletterPostMockRequest('update')(userId, input)
  );
}
