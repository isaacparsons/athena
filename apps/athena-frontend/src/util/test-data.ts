import {
  MediaFormat,
  MediaPostDetails,
  NewsletterPost,
  NewsletterPostDetails,
  NewsletterPostTypeName,
  TemplateBase,
  TemplateType,
  TextPostDetails,
} from '@athena/common';

export const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};

export const meta = {
  creator: user,
  modifier: null,
  created: '2025-03-24T16:42:32.271Z',
  modified: null,
};

export const textDetails: TextPostDetails = {
  id: 1,
  type: NewsletterPostTypeName.Text,
  name: 'text post 1',
  newsletterPostId: 1,
  description: 'descriptionnnnn',
  link: 'linkkkkk',
};

export const mediaDetails: MediaPostDetails = {
  id: 2,
  type: NewsletterPostTypeName.Media,
  name: 'media post 2',
  newsletterPostId: 1,
  format: MediaFormat.Image,
  fileName: 'https://picsum.photos/1000/1000',
  caption: 'captionnnn',
};

export const createMockPost = <T extends NewsletterPostDetails>(
  post: Partial<NewsletterPost<T>>
) => ({
  id: post.id === undefined ? 1 : post.id,
  meta: post.meta ?? {
    creator: user,
    modifier: null,
    created: '2025-03-24T16:42:32.271Z',
    modified: null,
  },
  newsletterId: post.newsletterId === undefined ? 1 : post.newsletterId,
  title: post.title ?? 'text post 1',
  date: post.date ?? null,
  details: post.details ?? textDetails,
  position: post.position ?? {
    parentId: null,
    nextId: null,
    prevId: null,
  },
  location: post.location ?? null,
  children: post.children ?? [],
});

export const textPost = createMockPost({
  details: textDetails,
});

export const mediaPost = createMockPost({
  details: mediaDetails,
});

export const createMockTemplateBase = (template: Partial<TemplateBase>) => {
  const id = template.id ?? 1;
  return {
    id,
    type: template.type ?? TemplateType.NewsletterPost,
    name: template.name ?? `template ${id}`,
    config: template.config ?? {},
    meta: template.meta ?? {
      creator: user,
      modifier: null,
      created: '2025-03-24T16:42:32.271Z',
      modified: null,
    },
  };
};
