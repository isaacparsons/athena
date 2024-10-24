import _ from 'lodash';
import { UserBase } from '@athena/athena-common';
import { Chip, Stack, Avatar } from '@mui/material';

interface NewsletterMembersProps {
  members: UserBase[];
}

export function NewsletterMembers(props: NewsletterMembersProps) {
  const { members } = props;

  return (
    <Stack>
      {members.map((member) => (
        <Stack direction="row" spacing={1}>
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
