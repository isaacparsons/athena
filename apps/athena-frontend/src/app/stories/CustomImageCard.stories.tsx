import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Box } from '@mui/material';
import { CustomImageCard } from '../components/common/CustomImageCard';

const meta: Meta<typeof CustomImageCard> = {
  component: CustomImageCard,
  title: 'CustomImageCard',
};
export default meta;
type Story = StoryObj<typeof CustomImageCard>;


export const Primary = {
  args: {

  },
};

export const Heading: Story = {
  args: {
    src: `https://picsum.photos/1000/1000`
  }
};
