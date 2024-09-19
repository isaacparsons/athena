import { Box, Chip } from '@mui/material';
import { User } from 'types/types';

interface NewsletterMembersProps {
  members: User[];
}

export default function NewsletterMembers(props: NewsletterMembersProps) {
  const { members } = props;
  return (
    <Box>
      {members.map((member) => (
        <Chip key={member.email} label={member.email} />
      ))}
    </Box>
  );
}
