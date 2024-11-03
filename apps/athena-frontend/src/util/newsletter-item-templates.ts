import _ from 'lodash';
import { nanoid } from 'nanoid';
import { StoreNewsletterItem } from '../app/store';

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

export const convertFromTemplateItems = (items: StoreNewsletterItem[]) => {
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
