import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LocationDialog } from '@athena/components'

const meta: Meta<typeof LocationDialog> = {
  component: LocationDialog,
  title: 'LocationDialog',
};
export default meta;
type Story = StoryObj<typeof LocationDialog>;


export const Primary = {
  args: {
    open: true
  },
};
