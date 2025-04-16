import _ from 'lodash';
import { Stack, Avatar, Typography, ListItem, Divider } from '@mui/material';
import { NewsletterMember } from '@athena/common';
import React from 'react';

interface NewsletterMemberListItemProps {
  data: NewsletterMember;
  onClick?: (member: NewsletterMember) => void;
  right?: React.ReactNode;
}

export function NewsletterMemberListItem(props: NewsletterMemberListItemProps) {
  const { onClick, data, right } = props;
  const { firstName, lastName, email, role } = data;

  const handleClick = () => {
    if (onClick) onClick(data);
  };

  return (
    <Stack direction="column">
      <Divider variant="fullWidth" />
      <ListItem onClick={handleClick}>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ mr: 1 }}>
              {_.upperCase(firstName ? firstName[0] : email[0])}
            </Avatar>
            <Typography variant="body1">
              {firstName === null || lastName === null
                ? email
                : `${firstName} ${lastName}`}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography pr={1} variant="body2">{`${role}`}</Typography>
            {right}
          </Stack>
        </Stack>
      </ListItem>
      <Divider variant="fullWidth" />
    </Stack>
  );
}
