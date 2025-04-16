import _ from 'lodash';
import { Avatar, AvatarGroup } from '@mui/material';
import { NewsletterMember } from '@athena/common';

interface NewsletterMemberChipsProps {
  onClick: () => void;
  data: NewsletterMember[];
}

function formatAvatarLabel(data: NewsletterMember) {
  const { firstName, lastName, email } = data;
  return firstName
    ? _.upperCase(firstName[0]) + (lastName ? _.upperCase(lastName[0]) : '')
    : _.upperCase(email[0]);
}

export function NewsletterMemberChips(props: NewsletterMemberChipsProps) {
  const { onClick, data } = props;

  return (
    <AvatarGroup max={4} onClick={onClick}>
      {data.map((member) => (
        <Avatar sx={{ bgcolor: 'primary.main' }}>{formatAvatarLabel(member)}</Avatar>
      ))}
    </AvatarGroup>
  );
}
