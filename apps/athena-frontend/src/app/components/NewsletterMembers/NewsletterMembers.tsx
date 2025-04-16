import { DialogContent, List, Dialog, Stack } from '@mui/material';
import { NewsletterMember } from '@athena/common';
import {
  InviteMembers,
  NewsletterMemberChips,
  NewsletterMemberDetails,
  NewsletterMemberListItem,
  StyledAddIcon,
} from '@frontend/components';
import { useState } from 'react';

interface MembersProps {
  newsletterId: number;
  data: NewsletterMember[];
}

export function NewsletterMembers(props: MembersProps) {
  const { data, newsletterId } = props;
  const [dialogOpen, setDialogOpen] = useState(true);
  const [memberDetails, setMemberDetails] = useState<NewsletterMember | null>(null);
  const [inviteUsersOpen, setInviteUsersOpen] = useState(true);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent sx={{ minWidth: 300, minHeight: 300 }}>
          {inviteUsersOpen ? (
            <InviteMembers
              newsletterId={newsletterId}
              onBackClick={() => setInviteUsersOpen(false)}
            />
          ) : memberDetails === null ? (
            <Stack direction="column">
              <StyledAddIcon
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => setInviteUsersOpen(true)}
              />
              <List>
                {data.map((member) => (
                  <NewsletterMemberListItem
                    data={member}
                    onClick={setMemberDetails}
                  />
                ))}
              </List>
            </Stack>
          ) : (
            <NewsletterMemberDetails
              data={memberDetails}
              newsletterId={newsletterId}
              onClose={() => setMemberDetails(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      <NewsletterMemberChips data={data} onClick={handleOpenDialog} />
    </>
  );
}
