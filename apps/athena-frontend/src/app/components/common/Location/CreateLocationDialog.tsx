import { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import { LocationIcon } from '@athena/icons';
import { CreateLocation, GeoPosition } from '@athena/common';
import { StyledDialog } from '@athena/components';

const MAP_ZOOM = 12;
const GOOGLE_API_KEY = 'AIzaSyCQJxFCjWTq0wD0rZgKNWva92xJ2oDiuCU';

interface CustomLocationDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (location: T) => void;
}

const formatLatLng = (pos: GeoPosition) => ({
  lat: pos.latitude,
  lng: pos.longitude,
});

export function CreateLocationDialog<T extends CreateLocation>({
  open,
  onClose,
  onSave,
}: CustomLocationDialogProps<T>) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [currentLocation, setCurrentLocation] = useState<GeoPosition | null>(null);

  useEffect(() => {
    setLoading(true);
    window.navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    setLoading(false);
  }, []);

  const handleLocationChange = (e: GoogleMap.ClickEventValue) => {
    setCurrentLocation({ latitude: e.lat, longitude: e.lng });
  };

  const handleSave = () => {
    const pos =
      currentLocation?.latitude && currentLocation?.longitude
        ? {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }
        : null;
    onSave({
      name: name.length > 0 ? name : null,
      country: null, // TODO: fix this
      geoPosition: pos,
    } as T);
  };

  return (
    <StyledDialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', height: 400 }}>
          {currentLocation && !loading ? (
            <GoogleMap
              onClick={handleLocationChange}
              bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
              center={formatLatLng(currentLocation)}
              zoom={MAP_ZOOM}
              //options={createMapOptions}
            >
              <div {...formatLatLng(currentLocation)}>
                <LocationIcon />
              </div>
            </GoogleMap>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <TextField
          margin="dense"
          id={'location.name'}
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={name}
          name={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
