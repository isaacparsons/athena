import { SvgIcon } from '@mui/material';
import { styled } from '@mui/system';

export type SvgIconComponent = typeof SvgIcon;

export const createStyledIcon = (icon: SvgIconComponent) =>
  styled(icon)(({ theme }) => ({
    // height: 25,
    // width: 25,
    padding: theme.spacing(0.5),
    backgroundColor: 'grey',
    borderRadius: theme.spacing(5),
    color: 'white',
  }));
