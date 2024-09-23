import GoogleMap from 'google-map-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

const GOOGLE_API_KEY = 'AIzaSyCQJxFCjWTq0wD0rZgKNWva92xJ2oDiuCU';

interface EditItemLocationProps {
  open: boolean;
  handleClose: () => void;
}

function EditItemLocation(props: EditItemLocationProps) {
  const { open, handleClose } = props;
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position.coords);
    });
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
            {currentLocation ? (
              <GoogleMap
                bootstrapURLKeys={{
                  key: GOOGLE_API_KEY,
                }}
                center={{
                  lat: currentLocation.latitude,
                  lng: currentLocation.longitude,
                }}
                zoom={9}
                //options={createMapOptions}
              ></GoogleMap>
            ) : null}
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

export default EditItemLocation;
