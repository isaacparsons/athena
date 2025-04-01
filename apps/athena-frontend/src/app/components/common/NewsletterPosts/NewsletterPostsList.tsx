import _ from 'lodash';
import {
  CreateNewsletterPost,
  NewsletterPost,
  NewsletterPostDetails,
} from '@athena/common';
import { StyledCard } from '@athena/components';

import { List, ListItem } from '@mui/material';
import React from 'react';
import { useFilterArray } from '@athena/hooks';

interface NewsletterPostsListProps {
  posts: Post[];
  parent: null | Post;
  render: (post: Post) => React.ReactNode;
}

type Post = Partial<Omit<NewsletterPost, 'details'>> & {
  details: Omit<NewsletterPostDetails, 'id' | 'newsletterPostId'>;
  tempPosition: CreateNewsletterPost['tempPosition'];
  file?: File;
};

export function NewsletterPostsList(props: NewsletterPostsListProps) {
  const { posts, parent, render } = props;

  const postsAtCurrentDepth = useFilterArray(posts, [
    (p) => p.tempPosition.parentId === (parent?.tempPosition.id ?? null),
  ]);

  return (
    <List dense sx={{ width: '100%' }}>
      {postsAtCurrentDepth.map((value) => (
        <ListItem key={value.tempPosition.id.toString()} disablePadding>
          <StyledCard>{render(value)}</StyledCard>
        </ListItem>
      ))}
    </List>
  );
}
