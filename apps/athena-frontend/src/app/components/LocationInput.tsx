import { Button, Typography } from '@mui/material';
import { CreateLocationInput } from '../types';

interface LocationInputProps {
  id: number;
  handleOpenLocationDialog: () => void;
  location: CreateLocationInput;
}
export function LocationInput(props: LocationInputProps) {
  const { location, handleOpenLocationDialog } = props;
  return (
    <Button onClick={handleOpenLocationDialog}>
      <Typography>{location.name ?? 'set location'}</Typography>
    </Button>
  );
}

export default LocationInput;
