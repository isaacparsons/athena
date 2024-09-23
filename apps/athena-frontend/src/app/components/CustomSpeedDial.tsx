import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ReactNode, useState } from 'react';
import { red } from '@mui/material/colors';

interface Action {
  icon: ReactNode;
  name: string;
  onClick: () => void;
}

interface CustomSpeedDialProps {
  actions: Action[];
  overrideIcon?: ReactNode;
  onOverrideIconClick?: () => void;
}

export default function CustomSpeedDial(props: CustomSpeedDialProps) {
  const { actions, overrideIcon, onOverrideIconClick } = props;
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
    <Box
      sx={{
        height: 330,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
    </Box>
  );
}
