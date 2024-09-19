import {
  Box,
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  SvgIcon,
} from '@mui/material';

import { useAuthContext } from '../context/auth';
import { useEffect, useState } from 'react';

interface Action {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

interface CustomSpeedDialProps {
  actions: Action[];
}

export default function CustomSpeedDial(props: CustomSpeedDialProps) {
  const { actions } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
        icon={<SpeedDialIcon />}
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
