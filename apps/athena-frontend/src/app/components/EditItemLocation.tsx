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
} from '@mui/material';

const GOOGLE_API_KEY = 'AIzaSyCQJxFCjWTq0wD0rZgKNWva92xJ2oDiuCU';

interface EditItemLocationProps {
  open: boolean;
  handleClose: () => void;
}

export function EditItemLocation(props: EditItemLocationProps) {
  const { open, handleClose } = props;
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    setLoading(true);
    window.navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position.coords);
    });
    setLoading(false);
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          handleClose();
        },
      }}
    >
      <DialogTitle>Edit Location</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ width: 400, height: 400 }}>
            {currentLocation && !loading ? (
              <GoogleMap
                bootstrapURLKeys={{
                  key: GOOGLE_API_KEY,
                }}
                center={{
                  lat: currentLocation.latitude,
                  lng: currentLocation.longitude,
                }}
                zoom={12}
              //options={createMapOptions}
              >
                {/* <div
                  lat={currentLocation.latitude}
                  lng={currentLocation.longitude}
                >
                  <RoomIcon />
                </div> */}
              </GoogleMap>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
