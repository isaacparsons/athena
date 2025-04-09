import {
  TempNodePosition,
  NewsletterPostTypeName,
  newsletterPostSchema,
  metaSchema,
  locationSchema,
  mediaPostDetailsSchema,
  textPostDetailsSchema,
  tempNodePositionSchema,
} from '@athena/common';
import { z } from 'zod';

const mediaDetailsFormSchema = mediaPostDetailsSchema.base
  .partial({ id: true, newsletterPostId: true })
  .extend({ file: z.instanceof(File).optional() });

const textDetailsFormSchema = textPostDetailsSchema.base.partial({
  id: true,
  newsletterPostId: true,
});

export const postDetailsFormSchema = z.discriminatedUnion('type', [
  mediaDetailsFormSchema,
  textDetailsFormSchema,
]);

export const newsletterPostFormSchema = newsletterPostSchema.base
  .partial({ id: true, position: true })
  .extend({
    meta: metaSchema.optional(),
    location: locationSchema.base.partial({ id: true }).optional(),
    details: postDetailsFormSchema,
    tempPosition: tempNodePositionSchema,
  });

export type MediaPostDetailsForm = z.infer<typeof mediaDetailsFormSchema>;
export type TextPostDetailsForm = z.infer<typeof textDetailsFormSchema>;
export type PostDetailsForm = MediaPostDetailsForm | TextPostDetailsForm;

export type NewsletterPostForm = z.infer<typeof newsletterPostFormSchema>;
export type CreateNewsletterPostForm = Omit<NewsletterPostForm, 'tempPosition'> & {
  tempPosition?: TempNodePosition | { id: string };
};

export type UpdateNewsletterPostForm = {
  id: string;
  change: Partial<NewsletterPostForm>;
};

export const isTextDetails = (
  details: PostDetailsForm
): details is TextPostDetailsForm => {
  return (details as TextPostDetailsForm).type === NewsletterPostTypeName.Text;
};

export const isMediaDetails = (
  details: PostDetailsForm
): details is MediaPostDetailsForm => {
  return (details as MediaPostDetailsForm).type === NewsletterPostTypeName.Media;
};

export const postHasId = (
  p: NewsletterPostForm
): p is NewsletterPostForm & { id: number } => p.id !== undefined;
