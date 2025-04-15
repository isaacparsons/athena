/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type NewsletterRole = "commentor" | "editor" | "owner" | "read-only";

export type TemplateType = "newsletter" | "newsletter-post";

export interface Country {
  code: string;
  id: Generated<number>;
  latitude: number;
  longitude: number;
  name: string;
}

export interface FederatedCredential {
  id: Generated<number>;
  provider: string;
  subjectId: string;
  userId: number;
}

export interface Location {
  country: string | null;
  id: Generated<number>;
  latitude: number | null;
  longitude: number | null;
  name: string | null;
}

export interface Newsletter {
  created: Generated<string>;
  creatorId: number;
  endDate: string | null;
  id: Generated<number>;
  modified: string | null;
  modifierId: number | null;
  name: string;
  ownerId: number;
  startDate: string | null;
}

export interface NewsletterPost {
  created: Generated<string>;
  creatorId: number;
  date: string | null;
  id: Generated<number>;
  locationId: number | null;
  modified: string | null;
  modifierId: number | null;
  newsletterId: number;
  nextId: number | null;
  parentId: number | null;
  prevId: number | null;
  title: string;
}

export interface NewsletterPostMedia {
  caption: string | null;
  fileName: string;
  format: string;
  id: Generated<number>;
  name: string;
  newsletterPostId: number;
  type: string;
}

export interface NewsletterPostText {
  description: string | null;
  id: Generated<number>;
  link: string | null;
  name: string;
  newsletterPostId: number;
  type: string;
}

export interface Template {
  config: Json | null;
  created: Generated<string>;
  creatorId: number;
  id: Generated<number>;
  modified: string | null;
  modifierId: number | null;
  name: string;
  type: TemplateType;
}

export interface TemplateNode {
  created: Generated<string>;
  creatorId: number;
  data: Json | null;
  id: Generated<number>;
  modified: string | null;
  modifierId: number | null;
  nextId: number | null;
  parentId: number | null;
  prevId: number | null;
  templateId: number;
}

export interface User {
  email: string;
  firstName: string | null;
  id: Generated<number>;
  lastName: string | null;
}

export interface UserNewsletter {
  newsletterId: number;
  role: NewsletterRole;
  userId: number;
}

export interface UserTemplate {
  role: string;
  templateId: number;
  userId: number;
}

export interface DB {
  country: Country;
  federated_credential: FederatedCredential;
  location: Location;
  newsletter: Newsletter;
  newsletter_post: NewsletterPost;
  newsletter_post_media: NewsletterPostMedia;
  newsletter_post_text: NewsletterPostText;
  template: Template;
  template_node: TemplateNode;
  user: User;
  user_newsletter: UserNewsletter;
  user_template: UserTemplate;
}
