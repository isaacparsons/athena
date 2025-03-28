import _ from 'lodash';
import { Chip, Stack, Avatar } from '@mui/material';
import { UserBase } from '@athena/common';

interface MembersProps {
  data: UserBase[];
}

export function Members(props: MembersProps) {
  const { data } = props;

  return (
    // sx={{ pb: 1 }}
    <Stack spacing={1} direction="row">
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
