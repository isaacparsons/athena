import { NewsletterMember } from '@athena/common';
import {
  NewsletterMemberChips,
  NewsletterMembersDialog,
  NewsletterMembersDialogDetailsScreen,
  NewsletterMembersDialogDisplayScreen,
  NewsletterMembersDialogInviteScreen,
} from '@frontend/components';
import { Box } from '@mui/material';
import { useState } from 'react';

interface MembersProps {
  newsletterId: number;
  data: NewsletterMember[];
}

type DisplayScreen = {
  type: 'display';
};

type DetailsScreen = {
  type: 'details';
  member: NewsletterMember;
};

type InviteScreen = {
  type: 'invite';
};

type ScreenState = DisplayScreen | DetailsScreen | InviteScreen;

const isDisplayScreen = (screen: ScreenState): screen is DisplayScreen => {
  return screen.type === 'display';
};

const isDetailsScreen = (screen: ScreenState): screen is DetailsScreen => {
  return screen.type === 'details';
};

const isInviteScreen = (screen: ScreenState): screen is InviteScreen => {
  return screen.type === 'invite';
};

export function NewsletterMembers(props: MembersProps) {
  const { data, newsletterId } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [screenState, setScreenState] = useState<{
    prev: ScreenState | null;
    curr: ScreenState;
  }>({
    prev: null,
    curr: { type: 'display' },
  });

  const handleSetScreenState = (newState: ScreenState) => {
    setScreenState((state) => ({
      prev: state.curr,
      curr: newState,
    }));
  };

  const handleSetScreenStateToPrev = () => {
    setScreenState((state) =>
      state.prev
        ? {
            prev: state.curr,
            curr: state.prev,
          }
        : state
    );
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const { curr } = screenState;

  return (
    <Box width={'100%'} display="flex" alignItems={'flex-start'}>
      <NewsletterMembersDialog open={dialogOpen} onClose={handleCloseDialog}>
        {isDisplayScreen(curr) ? (
          <NewsletterMembersDialogDisplayScreen
            data={data}
            onInvite={() => handleSetScreenState({ type: 'invite' })}
            onClick={(member) => handleSetScreenState({ type: 'details', member })}
          />
        ) : isDetailsScreen(curr) ? (
          <NewsletterMembersDialogDetailsScreen
            data={curr.member}
            newsletterId={newsletterId}
            onBack={handleSetScreenStateToPrev}
          />
        ) : (
          <NewsletterMembersDialogInviteScreen
            newsletterId={newsletterId}
            onBack={handleSetScreenStateToPrev}
          />
        )}
      </NewsletterMembersDialog>

      <NewsletterMemberChips data={data} onClick={handleOpenDialog} />
    </Box>
  );
}
