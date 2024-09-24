import { Box, Chip } from '@mui/material';
import { ReadUser } from 'types/types';

interface NewsletterMembersProps {
  members: ReadUser[];
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
