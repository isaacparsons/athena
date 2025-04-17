import _ from 'lodash';
import {
  addTempPositionToItems,
  CreateTemplateNode,
  NewsletterPostTypeName,
  ReadTemplate,
} from '@athena/common';
import { CreateNewsletterPostForm, NewsletterPostForm } from '../app/types';

export const toTemplateNodes = (posts: NewsletterPostForm[]): CreateTemplateNode[] =>
  posts.map((p) => {
    const data: Record<string, string> = {
      title: p.title ?? p.details?.name ?? '',
    };
    if (p.date !== null) _.set(data, ['date'], p.date);

    if (
      !_.isUndefined(p.details) &&
      p.details.type === NewsletterPostTypeName.Text
    ) {
      _.set(data, ['details.type'], NewsletterPostTypeName.Text);
      _.set(data, ['details.name'], p.details.name);
      if (p.details.description !== null)
        _.set(data, ['details.description'], p.details.description);
      if (p.details.link !== null) _.set(data, ['details.link'], p.details.link);
    } else if (
      !_.isUndefined(p.details) &&
      p.details.type === NewsletterPostTypeName.Media
    ) {
      _.set(data, ['details.type'], NewsletterPostTypeName.Media);
      _.set(data, ['details.name'], p.details.name);
      _.set(data, ['details.fileName'], p.details.fileName);
      _.set(data, ['details.format'], p.details.fileName);

      if (p.details.caption !== null)
        _.set(data, ['details.caption'], p.details.caption);
    }

    const parentId = posts.find(
      (p2) => p2.tempPosition.id === p.tempPosition.parentId
    );
    const nextId = posts.find((p2) => p2.tempPosition.id === p.tempPosition.nextId);
    const prevId = posts.find((p2) => p2.tempPosition.id === p.tempPosition.prevId);

    return {
      tempPosition: {
        id: p.tempPosition.id,
        parentId: parentId === undefined ? null : p.tempPosition.parentId,
        nextId: nextId === undefined ? null : p.tempPosition.nextId,
        prevId: prevId === undefined ? null : p.tempPosition.prevId,
      },
      data,
    };
  });

export const templateToPosts = <T = CreateNewsletterPostForm>(
  newsletterId: number,
  template: ReadTemplate
) => {
  const { nodes } = template;

  const base = {
    newsletterId,
    title: '',
    date: null,
  };

  return addTempPositionToItems(nodes).map((node) => {
    const { data, ...rest } = node;
    return {
      ...rest,
      ..._.toPairs(data).reduce((prev, curr) => {
        _.set(prev, curr[0], curr[1]);
        return prev;
      }, base),
    };
  }) as T[];
};
