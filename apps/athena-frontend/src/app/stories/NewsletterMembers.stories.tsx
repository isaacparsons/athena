import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { NewsletterMembers } from '@frontend/components';
import { NewsletterRole } from '@athena/common';
import { useStore, useUser } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};

function WithStoreUser({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useStore.setState({
      user: {
        data: {
          ...user,
          newsletters: [],
          templates: [],
        },
      } as any,
    });
  }, []);
  return <>{children}</>;
}

const meta: Meta<typeof NewsletterMembers> = {
  component: NewsletterMembers,
  title: 'NewsletterMembers',
  decorators: [
    (Story) => {
      return (
        <ThemeProvider theme={theme}>
          <WithStoreUser>
            <Story />
          </WithStoreUser>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NewsletterMembers>;

const owner = {
  ...user,
  role: NewsletterRole.OWNER,
};

const readOnly = {
  id: 2,
  email: 'user2@email.com',
  firstName: 'user',
  lastName: 'two',
  role: NewsletterRole.READ_ONLY,
};

const editor = {
  id: 3,
  email: 'user3@email.com',
  firstName: 'user',
  lastName: 'three',
  role: NewsletterRole.EDITOR,
};

export const Primary = {
  args: {
    data: [owner, readOnly, editor],
  },
};

export const Overflow = {
  args: {
    data: [owner, readOnly, editor, readOnly, editor],
  },
};
