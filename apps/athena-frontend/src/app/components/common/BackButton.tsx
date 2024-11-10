import { IconButton } from '@mui/material';
import { ArrowBackIcon } from '@athena/icons';
import { useLocation, useNavigate } from 'react-router-dom';


export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <BackButtonIcon onClick={() => navigate(-1)} />
}

interface BackButtonIconProps {
  onClick: () => void;
}

export function BackButtonIcon(props: BackButtonIconProps) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick}>
      <ArrowBackIcon htmlColor={'#fff'} />
    </IconButton>
  );
}
