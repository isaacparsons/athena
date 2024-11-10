import { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import { LocationIcon } from '@athena/icons';
import { LocationInput, Position } from '@athena/common';

const MAP_ZOOM = 12
const GOOGLE_API_KEY = 'AIzaSyCQJxFCjWTq0wD0rZgKNWva92xJ2oDiuCU';

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (location: LocationInput) => void
}

const formatLatLng = (pos: Position) => ({
  lat: pos.latitude,
  lng: pos.longitude,
})

export function LocationDialog({ open, onClose, onSave }: LocationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [currentLocation, setCurrentLocation] =
    useState<Position | null>(null);

  useEffect(() => {
    setLoading(true);
    window.navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
    setLoading(false);
  }, []);

  const handleLocationChange = (e: GoogleMap.ClickEventValue) => {
    setCurrentLocation({ latitude: e.lat, longitude: e.lng })
  }

  const handleSave = () => {
    onSave({
      name: name.length > 0 ? name : undefined,
      latitude: currentLocation?.latitude,
      longitude: currentLocation?.longitude
    })
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
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
              <div {...formatLatLng(currentLocation)} >
                <LocationIcon />
              </div>
            </GoogleMap>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <TextField
          margin="dense"
          id={"location.name"}
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
        <Button type="submit" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
