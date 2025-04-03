import _ from 'lodash';
import {
  CreateTemplateNode,
  NewsletterPostTypeName,
  Template,
} from '@athena/common';
import { Post, PostInput } from '../app/types';
import { nanoid } from 'nanoid';

export const toTemplateNodes = (posts: Post[]): CreateTemplateNode[] =>
  posts.map((p) => {
    const data: Record<string, string> = {
      title: p.title ?? p.details.name,
    };
    if (p.date !== null) _.set(data, ['date'], p.date);

    if (p.details.type === NewsletterPostTypeName.Text) {
      _.set(data, ['details.type'], NewsletterPostTypeName.Text);
      _.set(data, ['details.name'], p.details.name);
      if (p.details.description !== null)
        _.set(data, ['details.description'], p.details.description);
      if (p.details.link !== null) _.set(data, ['details.link'], p.details.link);
    } else if (p.details.type === NewsletterPostTypeName.Media) {
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

export const templateToPosts = (
  newsletterId: number,
  template: Template
): PostInput[] => {
  const { nodes } = template;

  const base = {
    newsletterId,
    title: '',
    date: null,
  };

  const idMap = new Map(nodes.map((n) => [n.id, nanoid()]));

  return nodes.map((node) =>
    _.toPairs(node.data).reduce((prev, curr) => {
      _.set(prev, curr[0], curr[1]);
      const tempPosition = {
        id: idMap.get(node.id),
        parentId:
          node.position.parentId === null
            ? undefined
            : idMap.get(node.position.parentId),
        nextId:
          node.position.nextId === null ? null : idMap.get(node.position.nextId),
        prevId:
          node.position.prevId === null ? null : idMap.get(node.position.prevId),
      };

      return { ...prev, tempPosition };
    }, base)
  ) as PostInput[];
};
