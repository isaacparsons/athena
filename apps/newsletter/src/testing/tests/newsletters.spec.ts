import _ from 'lodash';
import { createFixture } from '../setup';
import {
  createNewsletter,
  deleteNewsletter,
  getNewsletter,
  inviteNewsletterUser,
  removeNewsletterMember,
  updateNewsletter,
  updateNewsletterMember,
} from '../test-util';
import { DBManagerClient } from '@backend/db';
import { SelectNewsletter, SelectUser, SelectUserNewsletter } from '@backend/types';
import { NewsletterRole, CreateNewsletter } from '@athena/common';
const dbClient = new DBManagerClient();

const getNewsletterMember = (entities: Record<string, object>, num: number) => {
  const member = _.get(entities, ['user_newsletter', num]) as SelectUserNewsletter;
  const user = _.get(entities, ['user', num]) as SelectUser;
  return {
    user,
    member: {
      ...user,
      role: member.role,
    },
  };
};

describe('newsletter routes', () => {
  afterAll(async () => {
    await dbClient.truncateTables(['user']);
    await dbClient.truncateTables(['newsletter']);
    await dbClient.truncateTables(['user_newsletter']);
  });
  test('get', async () => {
    const entities = await createFixture('newsletter.yaml');
    const { user, member } = getNewsletterMember(entities, 0);
    const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

    const createdNewsletter = await getNewsletter(user.id, newsletter.id);

    expect(createdNewsletter).toEqual({
      id: expect.any(Number),
      meta: {
        creator: user,
        created: expect.any(String),
        modified: null,
        modifier: null,
      },
      name: newsletter.name,
      dateRange: {
        start: expect.any(String),
        end: expect.any(String),
      },
      owner: member,
      members: expect.arrayContaining([member]),
      posts: [],
    });
  });
  test('post', async () => {
    const entities = await createFixture('user.yaml');
    const user = _.get(entities, ['user', 0]) as SelectUser;
    const member = { ...user, role: NewsletterRole.OWNER };

    const newsletterInput: CreateNewsletter = {
      name: 'test newsletter 2',
      dateRange: {
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      },
    };
    const newsletterId = await createNewsletter(user.id, newsletterInput);

    const createdNewsletter = await getNewsletter(user.id, newsletterId);

    expect(createdNewsletter).toEqual({
      id: newsletterId,
      meta: {
        creator: user,
        created: expect.any(String),
        modified: null,
        modifier: null,
      },
      ...newsletterInput,
      owner: member,
      members: expect.arrayContaining([member]),
      posts: [],
    });
  });
  describe('update', () => {
    test('update name and date', async () => {
      const entities = await createFixture('newsletter.yaml');
      const { member, user } = getNewsletterMember(entities, 0);

      const existingNewsletter = _.get(entities, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      const newsletterInput: CreateNewsletter = {
        name: 'updated test newsletter 1',
        dateRange: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
      };

      await updateNewsletter(user.id, {
        ...newsletterInput,
        id: existingNewsletter.id,
      });

      const newsletter = await getNewsletter(user.id, existingNewsletter.id);
      expect(newsletter).toEqual({
        id: existingNewsletter.id,
        meta: {
          creator: user,
          created: expect.any(String),
          modified: expect.any(String),
          modifier: user,
        },
        ...newsletterInput,
        owner: member,
        members: expect.arrayContaining([member]),
        posts: [],
      });
    });
    test('should not update newsletter if user is not an owner or editor', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const { user } = getNewsletterMember(entities, 1);

      const existingNewsletter = _.get(entities, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      const newsletterInput: CreateNewsletter = {
        name: 'updated test newsletter 1',
        dateRange: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
      };

      await expect(
        updateNewsletter(user.id, {
          ...newsletterInput,
          id: existingNewsletter.id,
        })
      ).rejects.toEqual(new Error(`Invalid permissions`));

      const newsletter = await getNewsletter(user.id, existingNewsletter.id);
      expect(newsletter.name).not.toEqual(newsletterInput.name);
    });
  });
  describe('delete', () => {
    test('should delete newsletter if user is owner', async () => {
      const entities = await createFixture('newsletter.yaml');
      const { user } = getNewsletterMember(entities, 0);

      const existingNewsletter = _.get(entities, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      await deleteNewsletter(user.id, existingNewsletter.id);
      const newsletter = getNewsletter(user.id, existingNewsletter.id);
      await expect(newsletter).rejects.toEqual(
        new Error(`newsletter with id: ${existingNewsletter.id} does not exist`)
      );
    });
    test('should not delete newsletter if user is not an owner', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const { user } = getNewsletterMember(entities, 1);

      const existingNewsletter = _.get(entities, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      await expect(deleteNewsletter(user.id, existingNewsletter.id)).rejects.toEqual(
        new Error(`Invalid permissions`)
      );

      const newsletter = await getNewsletter(user.id, existingNewsletter.id);
      expect(newsletter).toBeDefined();
    });
  });

  describe('invite user', () => {
    test('invite user', async () => {
      const entities1 = await createFixture('newsletter.yaml');
      const entities2 = await createFixture('user.yaml');

      const { user: user1, member: member1 } = getNewsletterMember(entities1, 0);

      const member2 = {
        ...(_.get(entities2, ['user', 0]) as SelectUser),
        role: NewsletterRole.READ_ONLY,
      };

      const existingNewsletter = _.get(entities1, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      await inviteNewsletterUser(user1.id, {
        newsletterId: existingNewsletter.id,
        email: member2.email,
        role: NewsletterRole.READ_ONLY,
      });
      const newsletter = await getNewsletter(user1.id, existingNewsletter.id);
      expect(newsletter.members).toEqual(expect.arrayContaining([member1, member2]));
    });
    test('throw error if a user with invalid permissions tries to invite a user', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const entities2 = await createFixture('user.yaml');

      const { user: user1, member: member1 } = getNewsletterMember(entities, 0);
      const { user: user2, member: member2 } = getNewsletterMember(entities, 1);

      const member3 = {
        ...(_.get(entities2, ['user', 0]) as SelectUser),
        role: NewsletterRole.READ_ONLY,
      };

      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      const invite = inviteNewsletterUser(user2.id, {
        newsletterId: newsletter.id,
        email: member3.email,
        role: NewsletterRole.READ_ONLY,
      });
      await expect(invite).rejects.toEqual(new Error('Invalid permissions'));
    });
  });

  describe('remove member', () => {
    test('a member should be able to remove them self', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const user = _.get(entities, ['user', 1]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      await expect(
        removeNewsletterMember(user.id, {
          newsletterId: newsletter.id,
          userId: user.id,
        })
      ).resolves.toEqual(undefined);
      const newsletterAfter = await getNewsletter(user.id, newsletter.id);
      expect(newsletterAfter.members.map((m) => m.id).includes(user.id)).toEqual(
        false
      );
    });
    test('an owner should be able to remove members', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const owner = _.get(entities, ['user', 0]) as SelectUser;
      const member = _.get(entities, ['user', 1]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      await expect(
        removeNewsletterMember(owner.id, {
          newsletterId: newsletter.id,
          userId: member.id,
        })
      ).resolves.toEqual(undefined);
      const newsletterAfter = await getNewsletter(owner.id, newsletter.id);
      expect(newsletterAfter.members.map((m) => m.id).includes(member.id)).toEqual(
        false
      );
    });
    test('a non owner should not be able to remove members', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const member1 = _.get(entities, ['user', 1]) as SelectUser;
      const member2 = _.get(entities, ['user', 2]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      await expect(
        removeNewsletterMember(member1.id, {
          newsletterId: newsletter.id,
          userId: member2.id,
        })
      ).rejects.toEqual(new Error('Invalid permissions'));
    });
  });

  describe('edit member', () => {
    test('an owner should be able to edit a members role', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const owner = _.get(entities, ['user', 0]) as SelectUser;
      const readOnlyMember = _.get(entities, ['user', 1]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      await expect(
        updateNewsletterMember(owner.id, {
          newsletterId: newsletter.id,
          userId: readOnlyMember.id,
          role: NewsletterRole.EDITOR,
        })
      ).resolves.toEqual(undefined);

      const newsletterAfter = await getNewsletter(owner.id, newsletter.id);
      const member = newsletterAfter.members.find((m) => m.id === readOnlyMember.id);
      expect(member?.role).toEqual(NewsletterRole.EDITOR);
    });
    test('a non owner should not be able to edit a members role', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const owner = _.get(entities, ['user', 0]) as SelectUser;
      const readOnlyMember1 = _.get(entities, ['user', 1]) as SelectUser;
      const readOnlyMember2 = _.get(entities, ['user', 2]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      await expect(
        updateNewsletterMember(readOnlyMember1.id, {
          newsletterId: newsletter.id,
          userId: readOnlyMember2.id,
          role: NewsletterRole.EDITOR,
        })
      ).rejects.toEqual(new Error('Invalid permissions'));

      const newsletterAfter = await getNewsletter(owner.id, newsletter.id);
      const member = newsletterAfter.members.find(
        (m) => m.id === readOnlyMember2.id
      );
      expect(member?.role).toEqual(NewsletterRole.READ_ONLY);
    });
  });
});
