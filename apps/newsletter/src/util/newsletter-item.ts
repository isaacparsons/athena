import { isMediaItem, NewsletterPostBase } from '@athena/common';
import { IGCSManager } from '@athena/services';

export const signMediaItemUrls =
  (gcs: IGCSManager) =>
  async (items: NewsletterPostBase[]): Promise<NewsletterPostBase[]> =>
    Promise.all(items.map(async (item) => signMediaItemUrl(gcs)(item)));

export const signMediaItemUrl =
  (gcs: IGCSManager) =>
  async (item: NewsletterPostBase): Promise<NewsletterPostBase> => {
    if (isMediaItem(item)) {
      const signedUrl = await gcs.getSignedUrl(item.details.fileName, 'read');
      return {
        ...item,
        details: {
          ...item.details,
          fileName: signedUrl,
        },
      };
    }
    return item;
  };
