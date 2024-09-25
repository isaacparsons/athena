import { Button } from '@mui/material';
import ArrowbackBtn from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton(props: BackButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      startIcon={<ArrowbackBtn />}
    >
      Back
    </Button>
  );
}
