import {
  ArrowBackIcon,
  TemplateIcon,
  CloseIcon as Close,
  ArrowForwardIcon,
  EditIcon as Edit,
  DeleteIcon as Delete,
  AddIcon,
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

export const StyledCreateTemplateIcon = createStyledIcon(TemplateIcon);
export const StyledBackButtonIcon = createStyledIcon(ArrowBackIcon);
export const StyledCloseIcon = createStyledIcon(Close);
export const StyledDetailsCardIcon = createStyledIcon(ArrowForwardIcon);
export const StyledEditIcon = createStyledIcon(Edit);
export const StyledDeleteIcon = createStyledIcon(Delete);
export const StyledAddIcon = createStyledIcon(AddIcon);
