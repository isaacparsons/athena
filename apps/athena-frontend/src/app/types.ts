import { NewsletterPost, PostDetailsInput, TempNodePosition } from '@athena/common';

export type Post = Partial<Omit<NewsletterPost, 'details'>> & {
  details: PostDetailsInput;
  tempPosition: TempNodePosition;
  file?: File;
};

export type FileMap = Record<string, File>;
