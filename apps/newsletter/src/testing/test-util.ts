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
import { NotificationsManager } from '@backend/services';
import nodemailer from 'nodemailer';

const createCaller = trpc.createCallerFactory(router);

const testCaller = async (userId: number) => {
  const account = await nodemailer.createTestAccount();
  const mockNotificationsManager = new NotificationsManager({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    email: account.user,
    password: account.pass,
  });

  return createCaller(
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
        notifications: mockNotificationsManager,
        user: { userId },
        isAuthenticated: () => true,
      } as any,
      res: {} as any,
    } as any)
  );
};

export async function getNewsletter(userId: number, newsletterId: number) {
  const caller = await testCaller(userId);
  return caller.newsletters.read({
    id: newsletterId,
  }) as Promise<ReadNewsletter>;
}

export async function createNewsletter(userId: number, input: CreateNewsletter) {
  const caller = await testCaller(userId);
  return caller.newsletters.create(input) as Promise<number>;
}

export async function updateNewsletter(userId: number, input: UpdateNewsletter) {
  const caller = await testCaller(userId);
  return caller.newsletters.update(input) as Promise<number>;
}

export async function deleteNewsletter(userId: number, id: number) {
  const caller = await testCaller(userId);
  return caller.newsletters.delete({ id }) as Promise<number>;
}

export async function inviteNewsletterUser(
  userId: number,
  input: InviteNewsletterUsers
) {
  const caller = await testCaller(userId);
  return caller.newsletters.inviteUsers(input);
}

export async function removeNewsletterMember(
  userId: number,
  input: RemoveNewsletterMember
) {
  const caller = await testCaller(userId);
  return caller.newsletters.removeMember(input);
}

export async function updateNewsletterMember(
  userId: number,
  input: UpdateNewsletterMember
) {
  const caller = await testCaller(userId);
  return caller.newsletters.updateMember(input);
}

export async function getNewsletterPost(userId: number, newsletterPostId: number) {
  const caller = await testCaller(userId);
  return caller.newsletterPosts.read({
    id: newsletterPostId,
  }) as Promise<ReadNewsletterPost>;
}

export async function deleteNewsletterPosts(userId: number, ids: number[]) {
  const caller = await testCaller(userId);
  return caller.newsletterPosts.deleteMany({ ids });
}

export async function updateManyNewsletterPosts(
  userId: number,
  input: UpdateManyNewsletterPosts
) {
  const caller = await testCaller(userId);
  return caller.newsletterPosts.updateMany(input);
}

export async function createNewsletterPosts(
  userId: number,
  input: CreateManyNewsletterPosts
) {
  const caller = await testCaller(userId);
  return caller.newsletterPosts.createMany(input) as Promise<number[]>;
}

export async function createTemplate(userId: number, input: CreateTemplate) {
  const caller = await testCaller(userId);
  return caller.templates.create(input) as Promise<number>;
}

export async function getTemplate(userId: number, input: Read) {
  const caller = await testCaller(userId);
  return caller.templates.read(input) as Promise<ReadTemplate>;
}

export async function getTemplatesByUserId(userId: number) {
  const caller = await testCaller(userId);
  return caller.users.templates() as Promise<Template[]>;
}

export async function updateTemplate(userId: number, input: UpdateTemplate) {
  const caller = await testCaller(userId);
  return caller.templates.update(input) as Promise<number>;
}

export async function deleteTemplate(userId: number, input: Delete) {
  const caller = await testCaller(userId);
  return caller.templates.delete(input) as Promise<number>;
}
