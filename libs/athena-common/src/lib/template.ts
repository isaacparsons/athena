import { z } from 'zod';
import {
  makeEntitySchemas,
  nodePositionSchema,
  tempNodePositionSchema,
} from './common';

export enum TemplateType {
  Newsletter = 'newsletter',
  NewsletterPost = 'newsletter-post',
}
const templateType = z.nativeEnum(TemplateType);

const templateNodeInput = {
  position: nodePositionSchema,
  data: z.record(z.string(), z.string()),
};

export const templateNodeInputSchema = z.object(templateNodeInput);

export const templateNodeSchema = makeEntitySchemas({
  ...templateNodeInput,
  templateId: z.coerce.number(),
});

export const updateTemplateNodeSchema = templateNodeSchema.update.omit({ id: true });

const templateInput = {
  name: z.coerce.string(),
  config: z.record(z.string(), z.string()),
};

export const templateInputSchema = z.object(templateInput);

export const templateSchema = makeEntitySchemas({
  ...templateInput,
  type: templateType,
});
