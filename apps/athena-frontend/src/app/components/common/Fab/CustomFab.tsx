import { Fab } from '@mui/material';
import { AddIcon } from '@athena/icons';

interface CustomFabProps {
  onClick: () => void;
}

export function CustomFab(props: CustomFabProps) {
  const { onClick } = props;
  return (
    <Fab
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}
