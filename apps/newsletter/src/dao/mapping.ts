import _ from 'lodash';
import { MediaFormat, Meta, NewsletterPostTypeName } from '@athena/common';
import {
  SelectLocation,
  SelectNewsletterPostContainer,
  SelectNewsletterPostMedia,
  SelectNewsletterPostText,
  SelectUser,
} from '@athena/db';

export const mapUser = (user: SelectUser) => ({
  ...user,
  firstName: _.isNull(user.firstName) ? null : user.firstName,
  lastName: _.isNull(user.lastName) ? null : user.lastName,
});

export const mapUsers = (users: SelectUser[]) => users.map(mapUser);

export const mapMeta = <T extends Meta>(meta: T) => ({
  created: new Date(meta.created).toISOString(),
  modified: _.isNull(meta.modified) ? null : new Date(meta.modified).toISOString(),
  creator: mapUser(meta.creator),
  modifier: _.isNull(meta.modifier) ? null : mapUser(meta.modifier),
});

export const mapPosition = <
  T extends {
    parentId: number | null;
    prevId: number | null;
    nextId: number | null;
  }
>(
  position: T
) => ({
  parentId: position.parentId,
  nextId: position.nextId,
  prevId: position.prevId,
});

export const mapLocation = <T extends { location: SelectLocation | null }>(
  row: T
) => {
  const { location } = row;
  return location
    ? {
        id: location.id,
        name: _.isNull(location.name) ? null : location.name,
        country: _.isNull(location.countryCode) ? null : location.countryCode,
        geoPosition:
          location.latitude && location.longitude
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
              }
            : null,
      }
    : null;
};

export const mapNewsletterPostDetails = (
  media: SelectNewsletterPostMedia | null,
  text: SelectNewsletterPostText | null,
  container: SelectNewsletterPostContainer | null
) => {
  if (media)
    return {
      newsletterPostId: media.newsletterPostId,
      id: media.id,
      name: media.name,
      type: media.type as NewsletterPostTypeName.Media,
      fileName: media.fileName,
      format: media.format as MediaFormat,
      caption: media.caption,
    };
  if (text)
    return {
      newsletterPostId: text.newsletterPostId,
      id: text.id,
      name: text.name,
      type: text.type as NewsletterPostTypeName.Text,
      description: text.description,
      link: text.link,
    };
  if (container)
    return {
      newsletterPostId: container.newsletterPostId,
      id: container.id,
      name: container.name,
      type: container.type as NewsletterPostTypeName.Container,
    };

  throw new Error('no valid details');
};

export const mapDateRange = <
  T extends {
    startDate: string | null;
    endDate: string | null;
  }
>({
  startDate,
  endDate,
}: T) => ({
  start: _.isNull(startDate) ? null : new Date(startDate).toISOString(),
  end: _.isNull(endDate) ? null : new Date(endDate).toISOString(),
});
