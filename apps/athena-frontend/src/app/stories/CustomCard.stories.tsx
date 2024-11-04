import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CustomCard } from '../components'
import { Box } from '@mui/material';
import { CustomCardHeader, CustomCardFooter, CustomIconButton } from '../components';
import { ArrowBackIcon, CancelIcon } from '../icons';
import { CustomCheckbox } from '../components/common/CustomCheckbox';

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
    children: <>
      <CustomCardHeader
        left={
          <CustomIconButton
            onClick={() => console.log('click')}
            icon={
              <ArrowBackIcon sx={{ fontSize: 25, color: 'white' }} />
            } />
        }
        right={
          <CustomIconButton
            onClick={() => console.log('click')}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />} />
        }
      />
      <CustomCardFooter /></>
  }
};


export const Other: Story = {
  args: {
    src: `https://picsum.photos/1000/1000`,
    children: <>
      <CustomCardHeader
        left={
          <CustomIconButton
            onClick={() => console.log('click')}
            icon={
              <ArrowBackIcon sx={{ fontSize: 25, color: 'white' }} />
            } />
        }
        right={
          <CustomIconButton
            onClick={() => console.log('click')}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />} />
        }
      />
      <CustomCardFooter /></>
  }
};


export const Selected: Story = {
  args: {
    src: `https://picsum.photos/1000/1000`,
    children: <>
      <CustomCardHeader
        left={
          <CustomCheckbox
            id={1}
            onClick={() => console.log('click')}
            value={true} />
        }
        right={
          <CustomIconButton
            onClick={() => console.log('click')}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />} />
        }
      />
      <CustomCardFooter /></>
  }
};
