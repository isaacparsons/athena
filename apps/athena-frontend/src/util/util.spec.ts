import {
  NewsletterPostTypeName,
  Template,
  TemplateNode,
  TemplateType,
} from '@athena/common';
import { templateToPosts } from './util';
import { meta } from './test-data';

describe('util', () => {
  test('templateToPosts', () => {
    const createNode = (id: number, position: TemplateNode['position']) => ({
      id,
      meta,
      templateId: 1,
      data: {
        title: `post ${id}`,
        'details.type': NewsletterPostTypeName.Text,
        'details.name': `post ${id}`,
        'details.description': 'description',
        'details.link': 'description',
      },
      position,
    });
    const mockTemplate: Template = {
      id: 1,
      meta,
      config: {},
      type: TemplateType.NewsletterPost,
      name: 'template 1',
      members: [],
      nodes: [
        createNode(1, { parentId: null, nextId: 2, prevId: null }),
        createNode(2, { parentId: null, nextId: null, prevId: 1 }),
        createNode(3, { parentId: 2, nextId: 4, prevId: null }),
        createNode(4, { parentId: 2, nextId: null, prevId: 3 }),
      ],
    };
    const result = templateToPosts(1, mockTemplate);
    console.log(result);
  });
});
