import {
  NewsletterItem,
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  NewsletterItemType,
} from '@athena/athena-common';

function getDetails(item: MappedType) {
  if (item.mediaDetails) {
    return {
      ...item.mediaDetails,
      type: NewsletterItemType.media,
    } as NewsletterItemDetailsMedia;
  } else if (item.textDetails) {
    return {
      ...item.textDetails,
      type: NewsletterItemType.text,
    } as NewsletterItemDetailsText;
  }
}

type MappedType = {
  id: number;
  date: string | null;
  newsletterId: number;
  parentId: number | null;
  nextItemId: number | null;
  previousItemId: number | null;
  modified: string | null;
  created: string;
  title: string;
  mediaDetails: {
    name: string;
    caption: string | null;
    fileName: string;
    id: number;
    type: string;
    newsletterItemId: number;
  } | null;
  textDetails: {
    link: string | null;
    name: string;
    id: number;
    type: string;
    newsletterItemId: number;
    description: string | null;
  } | null;
  location: {
    name: string | null;
    id: number;
    countryCode: string | null;
    lattitude: number | null;
    longitude: number | null;
  } | null;
  creator: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
  modifier: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
};

export const mapItem = (item: MappedType) => {
  return {
    id: item.id,
    title: item.title,
    date: item.date,
    parentId: item.parentId,
    nextItemId: item.nextItemId,
    previousItemId: item.previousItemId,
    meta: {
      modifier: item.modifier,
      modified: item.modified,
      creator: item.creator,
      created: item.created,
    },
    location: item.location
      ? {
          id: item.location.id,
          country: item.location.countryCode,
          name: item.location.name,
          position:
            item.location.lattitude && item.location.longitude
              ? {
                  lattitude: item.location.lattitude,
                  longitude: item.location.longitude,
                }
              : null,
        }
      : null,
    details: getDetails(item),
  };
};

export const mapItems = (id: number, items: MappedType[]): NewsletterItem => {
  const _parentItem = items.find((item) => item.id === id);
  if (!_parentItem) throw new Error('invalid');
  const parentItem = mapItem(_parentItem);
  const childItems = items
    .filter((item) => item.id !== id)
    .map((item) => mapItem(item));
  return {
    ...parentItem,
    children: childItems,
  };
};
