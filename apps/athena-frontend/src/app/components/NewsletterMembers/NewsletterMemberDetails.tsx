import _ from 'lodash';
import { Stack, Typography, DialogActions, Button } from '@mui/material';
import { NewsletterMember, NewsletterRole } from '@athena/common';
import { useState } from 'react';
import { useNewsletters, useUser } from '@frontend/store';
import { SelectMemberRole } from '@frontend/components';

interface NewsletterMemberDetailsProps {
  data: NewsletterMember;
  newsletterId: number;
  onClose: () => void;
}

export function NewsletterMemberDetails(props: NewsletterMemberDetailsProps) {
  const { data, onClose, newsletterId } = props;
  const { firstName, email, lastName, role, id } = data;
  const { user } = useUser();
  const { updateMember } = useNewsletters();

  const [updatedRole, setUpdatedRole] = useState(role);

  const handleRoleChange = (role: NewsletterRole) => {
    setUpdatedRole(role);
  };

  const handleUpdateMember = () => {
    updateMember({
      newsletterId,
      userId: id,
      role: updatedRole,
    });
  };
  return (
    <>
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
        <SelectMemberRole
          disabled={user?.id === id}
          value={updatedRole}
          onChange={handleRoleChange}
        />
      </Stack>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={updatedRole === role}
          onClick={handleUpdateMember}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}
