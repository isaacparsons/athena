import _ from 'lodash';
import {
  CreateTemplateNode,
  NewsletterPost,
  NewsletterPostTypeName,
} from '@athena/common';

export const toTemplateNodes = (posts: NewsletterPost[]): CreateTemplateNode[] =>
  posts.map((p) => {
    const data: Record<string, string> = {
      title: p.title,
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

    return {
      tempPosition: {
        id: p.id.toString(),
        parentId: p.position.parentId?.toString() ?? null,
        nextId: p.position.nextId?.toString() ?? null,
        prevId: p.position.prevId?.toString() ?? null,
      },
      data,
    };
  });
