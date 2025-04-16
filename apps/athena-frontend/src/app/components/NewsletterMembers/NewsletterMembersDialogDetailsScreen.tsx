import _ from 'lodash';
import { Stack, Typography, DialogActions, Button } from '@mui/material';
import { NewsletterMember, NewsletterRole } from '@athena/common';
import { useState } from 'react';
import { useNewsletters, useUser } from '@frontend/store';
import {
  NewsletterMembersDialogScreen,
  NewsletterMembersScreenFooter,
  NewsletterMembersScreenHeader,
  SelectMemberRole,
  StyledBackButtonIcon,
} from '@frontend/components';

interface NewsletterMembersDialogDetailsScreenProps {
  data: NewsletterMember;
  newsletterId: number;
  onBack: () => void;
}

export function NewsletterMembersDialogDetailsScreen(
  props: NewsletterMembersDialogDetailsScreenProps
) {
  const { data, onBack, newsletterId } = props;
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
    <NewsletterMembersDialogScreen
      header={
        <NewsletterMembersScreenHeader
          left={<StyledBackButtonIcon onClick={onBack} />}
        />
      }
      content={
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
      }
      footer={
        <NewsletterMembersScreenFooter
          center={
            <Button
              disabled={updatedRole === role}
              onClick={handleUpdateMember}
              autoFocus
            >
              Confirm
            </Button>
          }
        />
      }
    />
  );
}
