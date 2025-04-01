import _ from 'lodash';
import { Newsletter, NewsletterPost } from '@athena/common';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export const usePosts = (
  newsletterId: number | undefined,
  posts: Record<number, NewsletterPost>
) =>
  useMemo(
    () =>
      newsletterId === undefined
        ? []
        : Object.values(posts).filter((p) => p.newsletterId === newsletterId),
    [newsletterId, posts]
  );

export const useFilterArray = <T>(array: T[], filters: ((val: T) => boolean)[]) =>
  useMemo(() => array.filter((i) => _.overEvery(filters)(i)), [array, filters]);

export const useNewsletter = (
  newsletterId: number | undefined,
  newsletters: Record<number, Newsletter>
) =>
  useMemo(
    () =>
      newsletterId !== undefined && newsletters[newsletterId]
        ? newsletters[newsletterId]
        : undefined,
    [newsletterId, newsletters]
  );

export const useParamId = (key: string) => {
  const params = useParams();
  return useMemo(() => {
    const id = _.get(params, [key]);
    return id !== undefined && !_.isNaN(id) ? _.parseInt(id) : undefined;
  }, [params, key]);
};

export const useSelectItems = <T>(data: T[], key: string) => {
  const [selected, setSelected] = useState(new Set<string>());

  const allSelected = useMemo(
    () => _.every(data, (i) => selected.has(_.get(i, key))),
    [data, selected, key]
  );

  const handleSelectAll = () => {
    const newSelected = allSelected ? [] : data.map((i) => _.get(i, key));
    console.log(newSelected);
    setSelected(new Set(newSelected));
  };

  const handleSelect = (id: string) => {
    setSelected((selected) => {
      const newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else newSelected.add(id);
      return newSelected;
    });
  };

  return { selected, handleSelect, allSelected, handleSelectAll };
};
