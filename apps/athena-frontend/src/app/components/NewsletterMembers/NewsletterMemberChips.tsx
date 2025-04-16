import _ from 'lodash';
import { Chip, Stack, Avatar } from '@mui/material';
import { NewsletterMember } from '@athena/common';

interface NewsletterMemberChipsProps {
  onClick: () => void;
  data: NewsletterMember[];
}

export function NewsletterMemberChips(props: NewsletterMemberChipsProps) {
  const { onClick, data } = props;

  return (
    <Stack onClick={onClick} spacing={1} direction="row">
      {data.map((member) => (
        <Stack direction="row" spacing={1} key={member.id.toString()}>
          <Chip
            avatar={
              <Avatar>
                {_.upperCase(
                  member.firstName ? member.firstName[0] : member.email[0]
                )}
              </Avatar>
            }
            label={member.firstName ? member.firstName : member.email}
          />
        </Stack>
      ))}
    </Stack>
  );
}
