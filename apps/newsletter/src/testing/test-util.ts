import {
  CreateNewsletter,
  UpdateNewsletter,
  CreateManyNewsletterPosts,
  CreateTemplate,
  Template,
  UpdateTemplate,
  Delete,
  UpdateManyNewsletterPosts,
  Read,
  ReadNewsletter,
  ReadNewsletterPost,
  ReadTemplate,
  RemoveNewsletterMember,
  UpdateNewsletterMember,
  InviteNewsletterUsers,
} from '@athena/common';
import { createContext, trpc } from '../trpc';
import { appRouter as router } from '../trpc/routes';
import { container } from '../inversify.config';
import { Kysely } from 'kysely';
import {
  DB,
  IGCSManager,
  ILocationDAO,
  INewsletterDAO,
  INewsletterPostDAO,
  ITemplateDAO,
  IUserDAO,
  TYPES,
} from '@backend/types';

const createCaller = trpc.createCallerFactory(router);

const testCaller = (userId: number) =>
  createCaller(
    createContext({
      req: {
        db: container.get<Kysely<DB>>(TYPES.DBClient),
        dao: {
          user: container.get<IUserDAO>(TYPES.IUserDAO),
          newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
          location: container.get<ILocationDAO>(TYPES.ILocationDAO),
          newsletterPost: container.get<INewsletterPostDAO>(
            TYPES.INewsletterPostDAO
          ),
          template: container.get<ITemplateDAO>(TYPES.ITemplateDAO),
        },
        gcs: container.get<IGCSManager>(TYPES.IGCSManager),
        user: { userId },
        isAuthenticated: () => true,
      } as any,
      res: {} as any,
    } as any)
  );

export async function getNewsletter(userId: number, newsletterId: number) {
  return testCaller(userId).newsletters.read({
    id: newsletterId,
  }) as Promise<ReadNewsletter>;
}

export async function createNewsletter(userId: number, input: CreateNewsletter) {
  return testCaller(userId).newsletters.create(input) as Promise<number>;
}

export async function updateNewsletter(userId: number, input: UpdateNewsletter) {
  return testCaller(userId).newsletters.update(input) as Promise<number>;
}

export async function deleteNewsletter(userId: number, id: number) {
  return testCaller(userId).newsletters.delete({ id }) as Promise<number>;
}

export async function inviteNewsletterUser(
  userId: number,
  input: InviteNewsletterUsers
) {
  return testCaller(userId).newsletters.inviteUsers(input);
}

export async function removeNewsletterMember(
  userId: number,
  input: RemoveNewsletterMember
) {
  return testCaller(userId).newsletters.removeMember(input);
}

export async function updateNewsletterMember(
  userId: number,
  input: UpdateNewsletterMember
) {
  return testCaller(userId).newsletters.updateMember(input);
}

export async function getNewsletterPost(userId: number, newsletterPostId: number) {
  return testCaller(userId).newsletterPosts.read({
    id: newsletterPostId,
  }) as Promise<ReadNewsletterPost>;
}

export async function deleteNewsletterPosts(userId: number, ids: number[]) {
  return testCaller(userId).newsletterPosts.deleteMany({ ids });
}

export async function updateManyNewsletterPosts(
  userId: number,
  input: UpdateManyNewsletterPosts
) {
  return testCaller(userId).newsletterPosts.updateMany(input);
}

export async function createNewsletterPosts(
  userId: number,
  input: CreateManyNewsletterPosts
) {
  return testCaller(userId).newsletterPosts.createMany(input) as Promise<number[]>;
}

export async function createTemplate(userId: number, input: CreateTemplate) {
  return testCaller(userId).templates.create(input) as Promise<number>;
}

export async function getTemplate(userId: number, input: Read) {
  return testCaller(userId).templates.read(input) as Promise<ReadTemplate>;
}

export async function getTemplatesByUserId(userId: number) {
  return testCaller(userId).users.templates() as Promise<Template[]>;
}

export async function updateTemplate(userId: number, input: UpdateTemplate) {
  return testCaller(userId).templates.update(input) as Promise<number>;
}

export async function deleteTemplate(userId: number, input: Delete) {
  return testCaller(userId).templates.delete(input) as Promise<number>;
}
