import { BackButtonIcon } from '@frontend/components';
import { useLocation, useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <BackButtonIcon onClick={() => navigate(-1)} />;
}
