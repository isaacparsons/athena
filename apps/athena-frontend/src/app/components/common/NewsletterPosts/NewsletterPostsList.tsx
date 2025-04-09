import { StyledCard } from '@athena/components';

import { List, ListItem } from '@mui/material';
import React from 'react';
import { useFilterArray } from '@athena/hooks';
import { NewsletterPostForm } from '../../../types';

interface NewsletterPostsListProps {
  posts: NewsletterPostForm[];
  parent: null | NewsletterPostForm;
  render: (post: NewsletterPostForm) => React.ReactNode;
}

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
