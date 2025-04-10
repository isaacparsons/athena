import {
  ArrowBackIcon,
  TemplateIcon,
  CloseIcon as Close,
  ArrowForwardIcon,
  EditIcon as Edit,
  DeleteIcon as Delete,
} from '@frontend/icons';
import { SvgIcon } from '@mui/material';
import { styled } from '@mui/system';

export type SvgIconComponent = typeof SvgIcon;

export const createStyledIcon = (icon: SvgIconComponent) =>
  styled(icon)(({ theme }) => ({
    height: 25,
    width: 25,
    padding: theme.spacing(0.5),
    // margin: theme.spacing(0.3),
    backgroundColor: 'grey',
    borderRadius: theme.spacing(5),
    color: 'white',
  }));

export const CreateTemplateIcon = createStyledIcon(TemplateIcon);
export const BackButtonIcon = createStyledIcon(ArrowBackIcon);
export const CloseIcon = createStyledIcon(Close);
export const DetailsCardIcon = createStyledIcon(ArrowForwardIcon);
export const EditIcon = createStyledIcon(Edit);
export const DeleteIcon = createStyledIcon(Delete);
