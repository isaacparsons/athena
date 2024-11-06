import _ from 'lodash';
import { nanoid } from 'nanoid';
import { StoreAddNewsletterItemInput, StoreNewsletterItem } from '../app/store';
import {
  NewsletterItemTemplate,
  NewsletterItemTemplateData,
} from '@athena/athena-common';

export const convertToTemplateItems = (items: StoreNewsletterItem[]) => {
  const realIdTempIdMap: Map<number, string> = new Map(
    items.reduce((ids, i) => {
      ids.push([i.id, nanoid()]);
      if (i.nextItemId) ids.push([i.nextItemId, nanoid()]);
      if (i.previousItemId) ids.push([i.previousItemId, nanoid()]);
      if (i.parentId) ids.push([i.parentId, nanoid()]);
      return ids;
    }, [] as [number, string][])
  );

  const getTempId = (id: number) => {
    const tempId = realIdTempIdMap.get(id);
    if (!tempId) throw new Error('Invalid id');
    return tempId;
  };

  return items.map((i) => {
    const parent = items.find((item) => item.childrenIds.includes(i.id));
    return {
      temp: {
        id: getTempId(i.id),
        parentId: parent ? getTempId(parent.id) : null,
        nextId: i.nextItemId ? getTempId(i.nextItemId) : null,
        prevId: i.previousItemId ? getTempId(i.previousItemId) : null,
      },
      data: _.omit(i.details, ['id']),
    };
  });
};

export const convertFromTemplateItems = (
  items: NewsletterItemTemplateData[]
): StoreAddNewsletterItemInput[] => {
  const realIdTempIdMap: Map<number, string> = new Map(
    items.reduce((ids, i) => {
      ids.push([i.id, nanoid()]);
      if (i.nextId) ids.push([i.nextId, nanoid()]);
      if (i.prevId) ids.push([i.prevId, nanoid()]);
      if (i.parentId) ids.push([i.parentId, nanoid()]);
      return ids;
    }, [] as [number, string][])
  );

  const getTempId = (id: number) => {
    const tempId = realIdTempIdMap.get(id);
    if (!tempId) throw new Error('Invalid id');
    return tempId;
  };

  return items.map((i) => {
    return {
      title: '',
      date: new Date().toISOString(),
      location: undefined,
      details: i.data?.type === 'media' ? { ...i.data, file: null } : i.data,
      temp: {
        id: getTempId(i.id),
        parentId: i.parentId ? getTempId(i.parentId) : null,
        nextId: i.nextId ? getTempId(i.nextId) : null,
        prevId: i.prevId ? getTempId(i.prevId) : null,
      },
    };
  });
};
