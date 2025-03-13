import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CustomLocationDialog } from '@athena/components';

const meta: Meta<typeof CustomLocationDialog> = {
  component: CustomLocationDialog,
  title: 'CustomLocationDialog',
};
export default meta;
type Story = StoryObj<typeof CustomLocationDialog>;

export const Primary = {
  args: {
    open: true,
  },
};
