import { InviteNewsletterUser, NewsletterRole } from '@athena/common';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import {
  NewsletterMemberListItem,
  SelectMemberRole,
  StyledAddIcon,
  StyledBackButtonIcon,
} from '@frontend/components';
import { CancelIcon } from '@frontend/icons';
import { useNewsletters } from '@frontend/store';
import { usePromiseWithNotification } from '@frontend/hooks';

interface InviteMembersProps {
  newsletterId: number;
  onBackClick: () => void;
}

export function InviteMembers(props: InviteMembersProps) {
  const { newsletterId, onBackClick } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const { inviteUsers } = useNewsletters();
  const [users, setUsers] = useState<InviteNewsletterUser[]>([]);

  const handleAddUser = (user: InviteNewsletterUser) => {
    setUsers((users) => [...users, user]);
  };

  const handleRemoveUser = (user: InviteNewsletterUser) => {
    setUsers((users) => users.filter((u) => u.email !== user.email));
  };

  const handleInviteUsers = () => {
    promiseWithNotifications.execute(inviteUsers({ newsletterId, users }), {
      successMsg: 'Users invited!',
      errorMsg: 'Unable to invite users :(',
    });
    onBackClick();
  };

  return (
    <Stack direction="column" spacing={1}>
      <StyledBackButtonIcon onClick={onBackClick} />
      <AddUserInput onAddUser={handleAddUser} />
      <AddedUsers data={users} onRemove={handleRemoveUser} />
      <Button
        variant="outlined"
        disabled={users.length === 0}
        onClick={handleInviteUsers}
      >
        Invite
      </Button>
    </Stack>
  );
}

interface AddUserInputProps {
  onAddUser: (user: InviteNewsletterUser) => void;
}

function AddUserInput(props: AddUserInputProps) {
  const { onAddUser } = props;

  const [userTextInput, setUserTextInput] = useState('');
  const [selectedRole, setSelectedRole] = useState(NewsletterRole.READ_ONLY);

  const handleAddUser = () => {
    onAddUser({ email: userTextInput, role: selectedRole });
    setUserTextInput('');
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        label="email"
        variant="outlined"
        value={userTextInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserTextInput(e.target.value)
        }
      />
      <SelectMemberRole
        disabled={false}
        value={selectedRole}
        onChange={setSelectedRole}
      />
      <StyledAddIcon
        sx={{ opacity: userTextInput.length > 0 ? 1 : 0.5 }}
        onClick={userTextInput.length > 0 ? handleAddUser : undefined}
      />
    </Stack>
  );
}

interface AddedUsersProps {
  data: InviteNewsletterUser[];
  onRemove: (user: InviteNewsletterUser) => void;
}

function AddedUsers(props: AddedUsersProps) {
  const { data, onRemove } = props;

  return data.map((member) => (
    <NewsletterMemberListItem
      data={{ ...member, firstName: null, lastName: null, id: 0 }}
      right={
        <Box
          onClick={() => onRemove(member)}
          sx={{
            bgcolor: 'grey',
            height: 25,
            width: 25,
            borderRadius: 12.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CancelIcon
            sx={{
              color: 'white',
              height: 20,
              width: 20,
            }}
          />
        </Box>
      }
    />
  ));
}
