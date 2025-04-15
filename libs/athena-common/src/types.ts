import { z } from 'zod';
import {
  countrySchema,
  createLocationSchema,
  createManyTemplateNodesSchema,
  createMediaPostDetailsSchema,
  createNewsletterSchema,
  createTemplateNodeSchema,
  createTemplateSchema,
  createTextPostDetailsSchema,
  readPostUploadLinksSchema,
  inviteNewsletterUserSchema,
  removeNewsletterMemberSchema,
  locationSchema,
  mediaPostDetailsSchema,
  newsletterPostSchema,
  newsletterSchema,
  templateNodeSchema,
  templateSchema,
  textPostDetailsSchema,
  updateLocationSchema,
  updateMediaPostDetailsSchema,
  updateNewsletterSchema,
  updateTemplateNodeSchema,
  updateTemplateSchema,
  updateTextPostDetailsSchema,
  userSchema,
  geoPositionSchema,
  readSchema,
  deleteSchema,
  deleteManySchema,
  dateRangeSchema,
  nodePositionSchema,
  tempNodePositionSchema,
  nodePositionInputSchema,
  createUserSchema,
  createFederatedCredentialSchema,
  federatedCredentialSchema,
  updateNewsletterMemberSchema,
} from './lib';
import {
  createManyNewsletterPostsSchema,
  createNewsletterPostSchema,
  metaSchema,
  readNewsletterMemberSchema,
  updateManyNewsletterPostsSchema,
  updateNewsletterPostSchema,
} from './entity';
/**
 * Common
 */
export type GeoPosition = z.infer<typeof geoPositionSchema>;

export type Read = z.infer<typeof readSchema>;

export type Delete = z.infer<typeof deleteSchema>;
export type DeleteMany = z.infer<typeof deleteManySchema>;

export type DateRange = z.infer<typeof dateRangeSchema>;

export type NodePosition = z.infer<typeof nodePositionSchema>;
export type TempNodePosition = z.infer<typeof tempNodePositionSchema>;
export type NodePositionInput = z.infer<typeof nodePositionInputSchema>;

/**
 * Federated Credential
 */
export type FederatedCredential = z.infer<typeof federatedCredentialSchema>;
export type CreateFederatedCredential = z.infer<
  typeof createFederatedCredentialSchema
>;

/**
 * User
 */
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;

export type Meta = z.infer<typeof metaSchema>;

export type Entity = { id: number; meta: Meta };
export type WithEntity<T> = T & Entity;

export type ReadUser = User & {
  newsletters: Newsletter[];
  templates: Template[];
};

/**
 * Newsletter
 */

export type Newsletter = WithEntity<z.infer<typeof newsletterSchema.base>>;
export type NewsletterMember = z.infer<typeof readNewsletterMemberSchema>;

export type ReadNewsletter = Newsletter & {
  members: NewsletterMember[];
  posts: ReadNewsletterPost[];
  owner: NewsletterMember;
  children?: Newsletter;
};

export type CreateNewsletter = z.infer<typeof createNewsletterSchema>;
export type UpdateNewsletter = z.infer<typeof updateNewsletterSchema>;

export type InviteNewsletterUser = z.infer<typeof inviteNewsletterUserSchema>;
export type RemoveNewsletterMember = z.infer<typeof removeNewsletterMemberSchema>;
export type UpdateNewsletterMember = z.infer<typeof updateNewsletterMemberSchema>;

/**
 * Newsletter Post
 */

export type TextPostDetails = z.infer<typeof textPostDetailsSchema.base>;
export type CreateTextPostDetails = z.infer<typeof createTextPostDetailsSchema>;
export type UpdateTextPostDetails = z.infer<typeof updateTextPostDetailsSchema>;

export type MediaPostDetails = z.infer<typeof mediaPostDetailsSchema.base>;
export type CreateMediaPostDetails = z.infer<typeof createMediaPostDetailsSchema>;
export type UpdateMediaPostDetails = z.infer<typeof updateMediaPostDetailsSchema>;

export type UpdatePostDetails = UpdateTextPostDetails | UpdateMediaPostDetails;
export type NewsletterPostDetails = TextPostDetails | MediaPostDetails;

export type NewsletterPost<T extends NewsletterPostDetails = NewsletterPostDetails> =
  WithEntity<z.infer<typeof newsletterPostSchema.base>> & {
    details: T;
  };

export type ReadNewsletterPost = NewsletterPost & {
  position: NodePosition;
  location: Location | null;
  children?: Omit<ReadNewsletterPost, 'children'>[];
};

export type CreateNewsletterPost = z.infer<typeof createNewsletterPostSchema>;
export type UpdateNewsletterPost = z.infer<typeof updateNewsletterPostSchema>;

export type UpdateManyNewsletterPosts = z.infer<
  typeof updateManyNewsletterPostsSchema
>;

export type CreateManyNewsletterPosts = z.infer<
  typeof createManyNewsletterPostsSchema
>;

export type ReadPostUploadLinks = z.infer<typeof readPostUploadLinksSchema>;

export type PostUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

export type ReadPostUploadLinksResponse = PostUploadLink[];

/**
 * Template
 */

export type TemplateNode = WithEntity<z.infer<typeof templateNodeSchema.base>>;
export type CreateTemplateNode = z.infer<typeof createTemplateNodeSchema>;
export type UpdateTemplateNode = z.infer<typeof updateTemplateNodeSchema>;
export type CreateManyTemplateNodes = z.infer<typeof createManyTemplateNodesSchema>;

export type Template = WithEntity<z.infer<typeof templateSchema.base>>;
export type CreateTemplate = z.infer<typeof createTemplateSchema>;
export type ReadTemplate = Template & { members: User[]; nodes: TemplateNode[] };
export type UpdateTemplate = z.infer<typeof updateTemplateSchema>;

/**
 * Location
 */

export type Location = z.infer<typeof locationSchema.base>;
export type CreateLocation = z.infer<typeof createLocationSchema>;
export type UpdateLocation = z.infer<typeof updateLocationSchema>;

/**
 * Country
 */
export type Country = z.infer<typeof countrySchema>;

export type WithTempPosition<T> = T & { tempPosition: TempNodePosition };
