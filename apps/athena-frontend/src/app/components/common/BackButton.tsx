import _ from 'lodash';
import { Button } from '@mui/material';
import ArrowbackBtn from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = useMemo(() => {
    const path = location.pathname.split('/');
    const lastPath = path.at(-1);
    const _path =
      lastPath && _.parseInt(lastPath) ? path.slice(0, -2) : path.slice(0, -1);
    return _path.length > 1 ? _path.join('/') : '/';
  }, [location.pathname]);

  return (
    <Button
      onClick={() =>
        navigate(backPath, {
          replace: true,
        })
      }
      variant="contained"
      startIcon={<ArrowbackBtn />}
    >
      Back
    </Button>
  );
}
