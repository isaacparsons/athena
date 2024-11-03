import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CustomCard } from '../components'
import { Box } from '@mui/material';

const meta: Meta<typeof CustomCard> = {
  component: CustomCard,
  title: 'CustomCard',
};
export default meta;
type Story = StoryObj<typeof CustomCard>;


export const Primary = {
  args: {

  },
};

export const Heading: Story = {
  args: {
    children: <Box>

      <img
        // srcSet={`https://picsum.photos/200/300`}
        src={`https://picsum.photos/1000/1000`}
        alt={"test"}
        loading="lazy"
      />
    </Box>,
  }
};
