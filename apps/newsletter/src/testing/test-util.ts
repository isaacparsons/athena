import {
  CreateNewsletter,
  NewsletterPost,
  UpdateNewsletter,
  InviteNewsletterUser,
  Newsletter,
  CreateNewsletterPost,
  CreateManyNewsletterPosts,
  CreateTemplate,
  Template,
  UpdateTemplate,
  DeleteInput,
  UpdateManyNewsletterPosts,
  ReadInput,
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
      } as any),
      path: '',
      rawInput: input,
      type,
    } as any;
  };

const newsletterMockRequest = createMockRequest('newsletters');
const newsletterPostMockRequest = createMockRequest('newsletterPosts');
const userMockRequest = createMockRequest('users');
const templateMockRequest = createMockRequest('templates');

export async function getNewsletter(userId: number, newsletterId: number) {
  return router.newsletters.read(
    newsletterMockRequest('read')(userId, { id: newsletterId })
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
  return router.newsletterPosts.read(
    newsletterPostMockRequest('read')(userId, { id: newsletterPostId })
  ) as Promise<NewsletterPost>;
}

export async function deleteNewsletterPosts(userId: number, ids: number[]) {
  return router.newsletterPosts.deleteMany(
    newsletterPostMockRequest('deleteMany')(userId, { ids })
  );
}

export async function updateManyNewsletterPosts(
  userId: number,
  input: UpdateManyNewsletterPosts
) {
  return router.newsletterPosts.updateMany(
    newsletterPostMockRequest('updateMany')(userId, input)
  );
}

export async function createNewsletterPosts(
  userId: number,
  input: CreateManyNewsletterPosts
) {
  return router.newsletterPosts.createMany(
    newsletterPostMockRequest('createMany')(userId, input)
  ) as Promise<number[]>;
}

// export async function createNewsletterPostsBatch(
//   userId: number,
//   input: CreateNewsletterPostsBatch
// ) {
//   return router.newsletterPosts.createBatch(
//     newsletterPostMockRequest('createBatch')(userId, input)
//   ) as Promise<number[]>;
// }

export async function createTemplate(userId: number, input: CreateTemplate) {
  return router.templates.create(
    templateMockRequest('create')(userId, input)
  ) as Promise<number>;
}

export async function getTemplate(userId: number, input: ReadInput) {
  return router.templates.read(
    templateMockRequest('read')(userId, input)
  ) as Promise<Template>;
}

export async function getTemplatesByUserId(userId: number) {
  return router.users.templates(userMockRequest('templates')(userId, {})) as Promise<
    Template[]
  >;
}

export async function updateTemplate(userId: number, input: UpdateTemplate) {
  return router.templates.update(
    templateMockRequest('update')(userId, input)
  ) as Promise<number>;
}

export async function deleteTemplate(userId: number, input: DeleteInput) {
  return router.templates.delete(
    templateMockRequest('delete')(userId, input)
  ) as Promise<number>;
}
