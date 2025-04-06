import { z } from 'zod';
import { makeEntitySchemas, nodePosition, tempNodePosition } from './common';

export enum TemplateType {
  Newsletter = 'newsletter',
  NewsletterPost = 'newsletter-post',
}
const templateType = z.nativeEnum(TemplateType);

export const templateNodeSchema = makeEntitySchemas({
  position: nodePosition,
  templateId: z.coerce.number(),
  data: z.record(z.string(), z.string()),
});

export const createTemplateNodeSchema = templateNodeSchema.create
  .extend({ tempPosition: tempNodePosition })
  .omit({ templateId: true, position: true });

export const createManyTemplateNodesSchema = z.object({
  templateId: z.coerce.number(),
  position: nodePosition,
  nodes: z.array(createTemplateNodeSchema),
});

export const updateTemplateNodeSchema = templateNodeSchema.update;

export const templateSchema = makeEntitySchemas({
  name: z.coerce.string(),
  type: templateType,
  config: z.record(z.string(), z.string()),
});

export const createTemplateSchema = templateSchema.create.extend({
  nodes: z.array(createTemplateNodeSchema),
});

export const updateTemplateSchema = templateSchema.update.extend({
  nodes: z.array(updateTemplateNodeSchema),
});
