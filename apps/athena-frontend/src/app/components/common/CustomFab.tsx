import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface CustomFabProps {
  onClick: () => void;
}

export default function CustomFab(props: CustomFabProps) {
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
