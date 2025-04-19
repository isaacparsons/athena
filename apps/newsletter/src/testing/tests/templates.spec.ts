import { createFixture } from '../setup';
import _ from 'lodash';
import { CreateTemplate, TemplateType } from '@athena/common';
import { DBManagerClient } from '@backend/db';
import { SelectNewsletter, SelectUser } from '@backend/types';
import {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getTemplatesByUserId,
  updateTemplate,
} from '../test-util';
import { TRPCError } from '@trpc/server';

const dbClient = new DBManagerClient();

const createMockTemplateInput = (id: number) => {
  const input: CreateTemplate = {
    type: TemplateType.NewsletterPost,
    name: `template ${id}`,
    config: {},
    nodes: [
      {
        data: { data: { name: `template ${id} node 1` } },
        tempPosition: {
          id: '1',
          parentId: null,
          prevId: null,
          nextId: null,
        },
      },
      {
        data: { data: { name: `template ${id} node 2` } },
        tempPosition: {
          id: '2',
          parentId: '1',
          prevId: null,
          nextId: null,
        },
      },
    ],
  };
  return input;
};

describe('template routes', () => {
  let newsletter: SelectNewsletter;
  let user: SelectUser;
  beforeAll(async () => {
    const entities = await createFixture('newsletter.yaml');
    user = _.get(entities, ['user', 0]) as SelectUser;
    newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;
  });

  afterAll(async () => {
    await dbClient.truncateTables(['user']);
    await dbClient.truncateTables(['newsletter']);
    await dbClient.truncateTables(['user_template']);
    await dbClient.truncateTables(['user_template']);
    await dbClient.truncateTables(['template_node']);
  });

  describe('create template for posts', () => {
    test('create template with nodes', async () => {
      const input: CreateTemplate = {
        type: TemplateType.NewsletterPost,
        name: 'template 1',
        config: {},
        nodes: [
          {
            data: { data: { name: 'test node 1' } },
            tempPosition: {
              id: '1',
              parentId: null,
              prevId: null,
              nextId: null,
            },
          },
          {
            data: { data: { name: 'test node 2' } },
            tempPosition: {
              id: '2',
              parentId: '1',
              prevId: null,
              nextId: null,
            },
          },
        ],
      };

      const created = await createTemplate(user.id, input);
      const template = await getTemplate(user.id, { id: created });

      expect(template.members).toEqual([user]);
      expect(template.name).toEqual(input.name);
      expect(template.type).toEqual(TemplateType.NewsletterPost);

      expect(template.nodes).toEqual([
        {
          id: expect.any(Number),
          templateId: template.id,
          meta: expect.any(Object),
          data: input.nodes[0].data.data,
          position: {
            nextId: null,
            prevId: null,
            parentId: null,
          },
        },
        {
          id: expect.any(Number),
          templateId: template.id,
          meta: expect.any(Object),
          data: input.nodes[1].data.data,
          position: {
            nextId: null,
            prevId: null,
            parentId: template.nodes[0].id,
          },
        },
      ]);
    });
  });

  describe('get template', () => {
    test('get templates for user', async () => {
      const entities1 = await createFixture('user.yaml');
      const entities2 = await createFixture('user.yaml');
      const user1 = _.get(entities1, ['user', 0]) as SelectUser;
      const user2 = _.get(entities2, ['user', 0]) as SelectUser;

      const input1 = createMockTemplateInput(1);
      const input2 = createMockTemplateInput(2);
      const input3 = createMockTemplateInput(3);

      const created1 = await createTemplate(user1.id, input1);
      const created2 = await createTemplate(user1.id, input2);
      const created3 = await createTemplate(user2.id, input3);

      const templates = await getTemplatesByUserId(user1.id);

      expect(templates.length).toEqual(2);
      expect(templates).toEqual([
        {
          id: expect.any(Number),
          meta: expect.any(Object),
          name: input1.name,
          config: input1.config,
          type: input1.type,
        },
        {
          id: expect.any(Number),
          meta: expect.any(Object),
          name: input2.name,
          config: input2.config,
          type: input2.type,
        },
      ]);
    });
  });

  describe.only('update template', () => {
    test('update template', async () => {
      const input: CreateTemplate = {
        type: TemplateType.NewsletterPost,
        name: `template 1`,
        config: {},
        nodes: [
          {
            data: { data: { name: `template 1 node 1` } },
            tempPosition: {
              id: '1',
              parentId: null,
              prevId: null,
              nextId: null,
            },
          },
          {
            data: { data: { name: `template 1 node 2` } },
            tempPosition: {
              id: '2',
              parentId: '1',
              prevId: null,
              nextId: '3',
            },
          },
          {
            data: { data: { name: `template 1 node 3` } },
            tempPosition: {
              id: '3',
              parentId: '1',
              prevId: '2',
              nextId: null,
            },
          },
        ],
      };

      const nodeInput4 = {
        data: { name: `template 1 node 4` },
      };
      const nodeInput5 = {
        data: { name: `template 1 node 5` },
      };
      const created = await createTemplate(user.id, input);

      const template = await getTemplate(user.id, { id: created });

      const node1 = template.nodes[0];
      const node2 = template.nodes[1];
      const node3 = template.nodes[2];

      await updateTemplate(user.id, {
        id: created,
        nodes: {
          createNodes: [
            {
              data: nodeInput4,
              tempPosition: {
                id: '1',
                parentId: '4',
                prevId: null,
                nextId: null,
              },
            },
            {
              data: nodeInput5,
              tempPosition: {
                id: '2',
                parentId: 'unknown',
                prevId: '3',
                nextId: '4',
              },
            },
          ],
          updateNodes: [
            {
              id: node2.id,
              data: {},
              tempPosition: {
                id: '3',
                parentId: 'unknown',
                prevId: null,
                nextId: '2',
              },
            },
            {
              id: node3.id,
              data: {},
              tempPosition: {
                id: '4',
                parentId: 'unknown',
                prevId: '2',
                nextId: null,
              },
            },
          ],
          deleteNodes: [],
        },
      });

      const updated = await getTemplate(user.id, { id: created });
      console.log(
        JSON.stringify(
          updated.nodes.map((n) => _.omit(n, ['templateId', 'meta'])),
          null,
          4
        )
      );
      const updatedNode1 = updated.nodes.find((n) => n.id === node1.id);
      const updatedNode2 = updated.nodes.find((n) => n.id === node2.id);
      const updatedNode3 = updated.nodes.find((n) => n.id === node3.id);
    });
  });

  describe('delete template', () => {
    test('delete', async () => {
      const input = createMockTemplateInput(1);
      const created = await createTemplate(user.id, input);

      await deleteTemplate(user.id, { id: created });

      await expect(getTemplate(user.id, { id: created })).rejects.toEqual(
        new TRPCError({ code: 'no result' as any })
      );
    });
  });
});
