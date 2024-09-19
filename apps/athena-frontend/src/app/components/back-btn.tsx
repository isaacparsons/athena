import { Button } from '@mui/material';
import ArrowbackBtn from '@mui/icons-material/ArrowBack';

interface BackBtnProps {
  onClick: () => void;
}

export default function BackBtn(props: BackBtnProps) {
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
