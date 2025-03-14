import { NewsletterPost, UpdateNewsletterPost } from '@athena/common';
import { createContext } from '../trpc';
import { appRouter as router } from '../trpc/routes';

export function createMockRequest(userId: number, input: object) {
  return {
    ctx: createContext({
      req: {
        user: {
          userId,
        },
        isAuthenticated: () => true,
      } as any,
      res: {} as any,
    }),
    path: '',
    rawInput: input,
    type: router.newsletters.get._type,
  };
}

export function getNewsletter(userId: number, newsletterId: number) {
  return router.newsletters.get(createMockRequest(userId, { id: newsletterId }));
}

export function getNewsletterPost(userId: number, newsletterPostId: number) {
  return router.newsletterPosts.get(
    createMockRequest(userId, { id: newsletterPostId })
  ) as Promise<NewsletterPost>;
}

export function deleteNewsletterPost(userId: number, newsletterPostIds: number[]) {
  return router.newsletterPosts.deleteMany(
    createMockRequest(userId, { ids: newsletterPostIds })
  );
}

export function updateNewsletterPost(userId: number, input: UpdateNewsletterPost) {
  return router.newsletterPosts.update(createMockRequest(userId, input));
}
