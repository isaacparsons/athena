import { z } from 'zod';

export type Nullable<T> = T | null;

export enum MediaFormat {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}

export enum NewsletterPostTypeName {
  Media = 'media',
  Text = 'text',
  Container = 'container',
}

export const getInput = z.object({
  id: z.coerce.number(),
});
export type GetInput = z.infer<typeof getInput>;

export const deleteInput = z.object({
  id: z.coerce.number(),
});
export type DeleteInput = z.infer<typeof deleteInput>;

export const deleteBatchInput = z.object({
  ids: z.array(z.coerce.number()),
});
export type DeleteBatchInput = z.infer<typeof deleteBatchInput>;

/**
 * User
 */

export const userBase = z.object({
  id: z.coerce.number(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UserBase = z.infer<typeof userBase>;

/**
 * Meta data
 */

export const meta = z.object({
  creator: userBase,
  modifier: userBase.optional(),
  created: z.string(),
  modified: z.string().optional(),
});

export type Meta = z.infer<typeof meta>;

export const positionInput = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

/**
 * Country
 */

export const country = z.object({
  name: z.string(),
  position: positionInput,
});

export type Position = z.infer<typeof positionInput>;

/**
 * Date
 */

export const dateInput = z.string().min(8);

export const dateRangeInput = z.object({
  start: dateInput.optional(),
  end: dateInput.optional(),
});

export type DateRange = z.infer<typeof dateRangeInput>;

/**
 * Location
 */

export const locationInput = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  country: z.string().optional(),
  position: z
    .object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number(),
    })
    .optional(),
});

export type LocationInput = z.infer<typeof locationInput>;
export type Location = LocationInput;

export const createLocation = locationInput.omit({ id: true });

export type CreateLocation = z.infer<typeof createLocation>;

export const updateLocation = locationInput;

export type UpdateLocation = z.infer<typeof updateLocation>;

/**
 * Newsletter Item
 */

// details
const mediaFormat = z.nativeEnum(MediaFormat);

export const postDetailType = z.union([
  z.literal(NewsletterPostTypeName.Media),
  z.literal(NewsletterPostTypeName.Text),
  z.literal(NewsletterPostTypeName.Container),
]);

export const basePostDetails = z.object({
  id: z.coerce.number(),
  newsletterPostId: z.coerce.number(),
  name: z.string(),
});

export type BaseItemDetails = z.infer<typeof basePostDetails>;

export const mediaPostDetails = z
  .object({
    type: z.literal(NewsletterPostTypeName.Media),
    fileName: z.string(),
    format: mediaFormat,
    caption: z.string().optional().nullable(),
  })
  .merge(basePostDetails);

export type MediaPostDetails = z.infer<typeof mediaPostDetails>;

export const textPostDetails = z
  .object({
    type: z.literal(NewsletterPostTypeName.Text),
    description: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
  })
  .merge(basePostDetails);

export type TextPostDetails = z.infer<typeof textPostDetails>;

export const containerPostDetails = z
  .object({
    type: z.literal(NewsletterPostTypeName.Container),
  })
  .merge(basePostDetails);

export type ContainerPostDetails = z.infer<typeof containerPostDetails>;

export const newsletterPostDetails = z.discriminatedUnion('type', [
  mediaPostDetails,
  textPostDetails,
  containerPostDetails,
]);

export type NewsletterPostDetails<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName.Text
  ? TextPostDetails
  : T extends NewsletterPostTypeName.Media
  ? MediaPostDetails
  : T extends NewsletterPostTypeName.Container
  ? ContainerPostDetails
  : z.infer<typeof newsletterPostDetails>;

export const createNewsletterPostDetailsMedia = mediaPostDetails.omit({
  id: true,
  newsletterPostId: true,
});
export const createNewsletterPostDetailsText = textPostDetails.omit({
  id: true,
  newsletterPostId: true,
});
export const createNewsletterPostDetailsContainer = containerPostDetails.omit({
  id: true,
  newsletterPostId: true,
});

export type CreateNewsletterPostDetailsMedia = z.infer<
  typeof createNewsletterPostDetailsMedia
>;
export type CreateNewsletterPostDetailsText = z.infer<
  typeof createNewsletterPostDetailsText
>;
export type CreateNewsletterPostDetailsContainer = z.infer<
  typeof createNewsletterPostDetailsContainer
>;

export const createNewsletterPostDetails = z.discriminatedUnion('type', [
  createNewsletterPostDetailsMedia,
  createNewsletterPostDetailsText,
  createNewsletterPostDetailsContainer,
]);

export type CreateNewsletterPostDetails<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName.Text
  ? CreateNewsletterPostDetailsText
  : T extends NewsletterPostTypeName.Media
  ? CreateNewsletterPostDetailsMedia
  : T extends NewsletterPostTypeName.Container
  ? CreateNewsletterPostDetailsContainer
  : z.infer<typeof createNewsletterPostDetails>;

export const updateNewsletterPostDetailsMedia = mediaPostDetails
  .pick({ type: true })
  .merge(mediaPostDetails.omit({ type: true }).partial())
  .merge(basePostDetails.omit({ id: true }).partial())
  .merge(basePostDetails.pick({ id: true }));

export const updateNewsletterPostDetailsText = textPostDetails
  .pick({ type: true })
  .merge(textPostDetails.omit({ type: true }).partial())
  .merge(basePostDetails.omit({ id: true }).partial())
  .merge(basePostDetails.pick({ id: true }));

export const updateNewsletterPostDetailsContainer = containerPostDetails
  .pick({ type: true })
  .merge(containerPostDetails.omit({ type: true }).partial())
  .merge(basePostDetails.omit({ id: true }).partial())
  .merge(basePostDetails.pick({ id: true }));

export type UpdateNewsletterPostDetailsMedia = z.infer<
  typeof updateNewsletterPostDetailsMedia
>;
export type UpdateNewsletterPostDetailsText = z.infer<
  typeof updateNewsletterPostDetailsText
>;
export type UpdateNewsletterPostDetailsContainer = z.infer<
  typeof updateNewsletterPostDetailsContainer
>;

export const updateNewsletterPostDetails = z.discriminatedUnion('type', [
  updateNewsletterPostDetailsMedia,
  updateNewsletterPostDetailsText,
  updateNewsletterPostDetailsContainer,
]);

export type UpdateNewsletterPostDetails<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName.Text
  ? UpdateNewsletterPostDetailsText
  : T extends NewsletterPostTypeName.Media
  ? UpdateNewsletterPostDetailsMedia
  : T extends NewsletterPostTypeName.Container
  ? UpdateNewsletterPostDetailsContainer
  : z.infer<typeof updateNewsletterPostDetails>;

export const nodePosition = z.object({
  parentId: z.coerce.number().nullable(),
  nextId: z.coerce.number().nullable(),
  prevId: z.coerce.number().nullable(),
});

export type NodePosition = z.infer<typeof nodePosition>;

export const newsletterPostBase = z.object({
  id: z.coerce.number(),
  newsletterId: z.coerce.number(),
  position: nodePosition,
  title: z.string(),
  date: z.string().nullable().optional(),
  location: locationInput.optional(),
  details: newsletterPostDetails,
});

export type NewsletterPostBase = z.infer<typeof newsletterPostBase>;

export const newsletterPost = newsletterPostBase.merge(
  z.object({
    children: z.array(newsletterPostBase),
    meta: meta,
  })
);

export type NewsletterPost<
  T extends NewsletterPostTypeName | undefined = undefined
> = z.infer<typeof newsletterPost> & {
  details: NewsletterPostDetails<T>;
};

export const isMediaPost = (
  item: NewsletterPostBase
): item is NewsletterPost<NewsletterPostTypeName.Media> => {
  return (
    (item as NewsletterPost<NewsletterPostTypeName.Media>).details.type ===
    NewsletterPostTypeName.Media
  );
};

export const isTextPost = (
  item: NewsletterPostBase
): item is NewsletterPost<NewsletterPostTypeName.Text> => {
  return (
    (item as NewsletterPost<NewsletterPostTypeName.Text>).details.type ===
    NewsletterPostTypeName.Text
  );
};

export const isContainerItem = (
  item: NewsletterPostBase
): item is NewsletterPost<NewsletterPostTypeName.Container> => {
  return (
    (item as NewsletterPost<NewsletterPostTypeName.Container>).details.type ===
    NewsletterPostTypeName.Container
  );
};

export const createNewsletterPost = newsletterPost
  .omit({
    id: true,
    children: true,
    details: true,
    location: true,
    meta: true,
  })
  .merge(
    z.object({
      details: createNewsletterPostDetails,
      location: createLocation.optional(),
    })
  );

export type CreateNewsletterPost<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName
  ? Omit<z.infer<typeof createNewsletterPost>, 'details'> & {
      details: CreateNewsletterPostDetails<T>;
    }
  : z.infer<typeof createNewsletterPost>;

export const updateNewsletterPost = newsletterPost
  .pick({ id: true, newsletterId: true })
  .merge(
    newsletterPost
      .omit({
        id: true,
        newsletterId: true,
        details: true,
        position: true,
        children: true,
      })
      .partial()
  )
  .merge(z.object({ details: updateNewsletterPostDetails.optional() }))
  .merge(
    z.object({
      childPositions: z
        .array(nodePosition.merge(z.object({ id: z.coerce.number() })))
        .optional(),
    })
  );

export type UpdateNewsletterPost = z.infer<typeof updateNewsletterPost>;

export const tempNewsletterPostIds = z.object({
  id: z.string(),
  parentId: z.coerce.string().nullable(),
  nextId: z.coerce.string().nullable(),
  prevId: z.coerce.string().nullable(),
});

export type TempNewsletterPostIds = z.infer<typeof tempNewsletterPostIds>;

export const createNewsletterPostsBatchItem = createNewsletterPost
  .omit({ position: true })
  .merge(z.object({ temp: tempNewsletterPostIds }));

export type CreateNewsletterPostBatchItem<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName
  ? Omit<z.infer<typeof createNewsletterPostsBatchItem>, 'details'> & {
      details: CreateNewsletterPostDetails<T>;
    }
  : z.infer<typeof createNewsletterPostsBatchItem>;

export const createNewsletterPostsBatch = z.object({
  newsletterId: z.coerce.number(),
  position: nodePosition,
  batch: z.array(createNewsletterPostsBatchItem),
});

export type CreateNewsletterPostsBatch = z.infer<typeof createNewsletterPostsBatch>;

export const getItemUploadLinks = z.object({
  items: z.array(z.object({ id: z.string() })),
});

export type GetItemUploadLinks = z.infer<typeof getItemUploadLinks>;

export type GetItemUploadLinksResponse = ItemUploadLink[];

export type ItemUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

/**
 * Newsletter
 */

export const newsletterProperties = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long' })
    .max(100, { message: 'Name must be at less than 100 characters long' }),
  dateRange: dateRangeInput,
});

export type NewsletterProperties = z.infer<typeof newsletterProperties>;

export const newsletterBase = z
  .object({
    id: z.coerce.number(),
  })
  .merge(
    z.object({
      properties: newsletterProperties,
      owner: userBase,
      meta: meta,
    })
  );

export type NewsletterBase = z.infer<typeof newsletterBase>;

export const newsletter = newsletterBase.merge(
  z.object({
    members: z.array(userBase),
    items: z.array(newsletterPostBase),
  })
);

export type Newsletter = z.infer<typeof newsletter>;

export const createNewsletter = newsletter.omit({
  id: true,
  owner: true,
  meta: true,
  members: true,
  items: true,
});

export type CreateNewsletter = z.infer<typeof createNewsletter>;

export const updateNewsletter = newsletter.pick({ id: true }).merge(
  z.object({
    properties: newsletterProperties.partial(),
  })
);

export type UpdateNewsletter = z.infer<typeof updateNewsletter>;

/**
 * Newsletter item template
 */

// const newsletterItemTemplateDataDetails = z
//   .discriminatedUnion('type', [
//     createNewsletterPostDetailsMedia,
//     createNewsletterPostDetailsText,
//     createNewsletterPostDetailsContainer,
//   ])
//   .optional();

// export type NewsletterPostTemplateDataDetails<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName.Text
//   ? CreateNewsletterPostDetailsText
//   : T extends NewsletterPostTypeName.Media
//   ? CreateNewsletterPostDetailsMedia
//   : T extends NewsletterPostTypeName.Container
//   ? CreateNewsletterPostDetailsContainer
//   : z.infer<typeof newsletterItemTemplateDataDetails>;

// export const newsletterItemTemplateData = z.object({
//   id: z.coerce.number(),
//   position: nodePosition,
//   templateId: z.coerce.number().optional(),
//   data: newsletterItemTemplateDataDetails,
// });

// export type NewsletterPostTemplateData = z.infer<typeof newsletterItemTemplateData>;

// export const createNewsletterPostTemplateData = newsletterItemTemplateData
//   .omit({ position: true, id: true })
//   .merge(z.object({ temp: tempNewsletterPostIds }));

// export const newsletterItemTemplateBase = z.object({
//   id: z.coerce.number(),
//   meta: meta,
//   name: z.string(),
// });

// export type NewsletterPostTemplateBase = z.infer<typeof newsletterItemTemplateBase>;

// export const newsletterItemTemplate = newsletterItemTemplateBase.merge(
//   z.object({
//     items: z.array(newsletterItemTemplateData),
//     templates: z.array(newsletterItemTemplateBase),
//   })
// );

// export type NewsletterPostTemplate = z.infer<typeof newsletterItemTemplate>;

// export const createNewsletterPostTemplate = newsletterItemTemplate
//   .omit({
//     id: true,
//     templates: true,
//     items: true,
//     meta: true,
//   })
//   .merge(z.object({ data: z.array(createNewsletterPostTemplateData) }));

// export type CreateNewsletterPostTemplate = z.infer<
//   typeof createNewsletterPostTemplate
// >;

/**
 * User
 */

export const user = userBase.merge(
  z.object({
    newsletters: z.array(newsletterBase),
    // newsletterItemTemplates: z.array(newsletterItemTemplateBase),
  })
);

export type User = z.infer<typeof user>;

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export type Entity =
  | Location
  | User
  // | NewsletterPostTemplate
  | Newsletter
  | NewsletterPost;

/**
 * Helpers
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
