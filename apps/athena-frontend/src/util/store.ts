import _ from 'lodash';
import { NewsletterPost, NewsletterPostPostName } from '@athena/common';
import { StoreNewsletterPost } from '@athena/store';

export const mapToStoreItem = <
  T extends NewsletterPostPostName = NewsletterPostPostName
>(
  item: NewsletterPost<T>
): StoreNewsletterPost<T> => {
  return {
    ..._.omit(item, ['children']),
    childrenIds: item.children.map((c) => c.id),
  };
};

export const traverseItemIds = (
  items: Record<number, StoreNewsletterPost>,
  selectedIds: number[],
  ids: number[]
) => _traverseItemIds(items, selectedIds, ids);

const _traverseItemIds = (
  items: Record<number, StoreNewsletterPost>,
  selectedIds: number[],
  ids: number[]
) => {
  if (ids.length === 0) return _.uniq(selectedIds);

  selectedIds.push(...ids);
  return _traverseItemIds(
    items,
    selectedIds,
    _.flatMap(ids, (id) => {
      const item = items[id];
      return item.childrenIds;
    })
  );
};
