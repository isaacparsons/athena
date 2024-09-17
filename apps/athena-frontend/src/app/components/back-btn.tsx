import { Button } from '@mui/material';
import ArrowbackBtn from '@mui/icons-material/ArrowBack';

export default function BackBtn() {
  return (
    <Button variant="contained" startIcon={<ArrowbackBtn />}>
      Back
    </Button>
  );
}
