import { ReactNode, useState } from 'react';

import { SpeedDial, SpeedDialAction } from '@mui/material';
import { MenuIcon } from '../../icons';

interface Action {
  icon: ReactNode;
  name: string;
  onClick: () => void;
}

interface CustomSpeedDialProps {
  actions: Action[];
  overrideIcon?: ReactNode;
  onOverrideIconClick?: () => void;
  styles?: any;
}

export function CustomSpeedDial(props: CustomSpeedDialProps) {
  const { actions, overrideIcon, onOverrideIconClick, styles } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (overrideIcon && onOverrideIconClick) {
      onOverrideIconClick();
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const handleClick = (action: Action) => {
    action.onClick();
    handleClose();
  };

  return (
    <SpeedDial
      sx={{
        zIndex: 1060,
        position: 'absolute',
        bottom: 16,
        right: 16,
        ...styles,
      }}
      ariaLabel="SpeedDial tooltip example"
      icon={overrideIcon ?? <MenuIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handleClick(action)}
        />
      ))}
    </SpeedDial>
  );
}
