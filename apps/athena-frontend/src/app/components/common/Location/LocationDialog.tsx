import { useCallback, useEffect, useState } from 'react';
import {
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import type { Marker } from '@googlemaps/markerclusterer';
import {
  Button,
  DialogActions,
  DialogContent,
  CircularProgress,
  TextField,
} from '@mui/material';
import { CreateLocation, GeoPosition } from '@athena/common';
import { StyledDialog, useLocation } from '@frontend/components';
import { GOOGLE_MAP_ID } from '@frontend/config';

interface LocationDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (location: T) => void;
}

const formatLatLng = (pos: GeoPosition): google.maps.LatLngLiteral => ({
  lat: pos.latitude,
  lng: pos.longitude,
});

const DEFAULT_POSITION = { lat: 0, lng: 0 };

export function LocationDialog<T extends CreateLocation>({
  open,
  onClose,
  onSave,
}: LocationDialogProps<T>) {
  const [name, setName] = useState('');
  const [marker, setMarker] = useState<Marker | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const map = useMap();
  const { loading, position } = useLocation();

  useEffect(() => {
    if (position) {
      map?.panTo(formatLatLng(position));
      setCurrentLocation(formatLatLng(position));
    }
  }, [position, map]);

  const handleSave = () => {
    onSave({
      name: name.length > 0 ? name : null,
      country: null, // TODO: fix this
      geoPosition: currentLocation
        ? {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          }
        : null,
    } as T);
  };

  const handleClick = useCallback(
    (ev: MapMouseEvent) => {
      if (!map) return;
      if (!ev.detail.latLng) return;
      map.panTo(ev.detail.latLng);
      setCurrentLocation(ev.detail.latLng);
    },
    [map]
  );

  const setMarkerRef = (marker: Marker | null) => {
    setMarker(marker);
  };

  if (loading) return <CircularProgress />;

  return (
    <StyledDialog fullScreen open={open} onClose={onClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <LocationMap
          onClick={handleClick}
          location={currentLocation}
          setMarkerRef={setMarkerRef}
        />
        <LocationName name={name} onChange={setName} />
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

interface LocationNameProps {
  name: string;
  onChange: (name: string) => void;
}
function LocationName(props: LocationNameProps) {
  const { name, onChange } = props;

  return (
    <TextField
      margin="dense"
      id={'location.name'}
      label="Name"
      type="text"
      fullWidth
      variant="standard"
      defaultValue={name}
      name={name}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

interface LocationMapProps {
  onClick: (ev: MapMouseEvent) => void;
  location: google.maps.LatLngLiteral | null;
  setMarkerRef: (marker: Marker | null) => void;
}
function LocationMap(props: LocationMapProps) {
  const { onClick, location, setMarkerRef } = props;
  return (
    <Map
      onClick={onClick}
      defaultZoom={13}
      mapId={GOOGLE_MAP_ID}
      defaultCenter={DEFAULT_POSITION}
    >
      <AdvancedMarker
        position={location ? location : DEFAULT_POSITION}
        ref={(marker) => setMarkerRef(marker)}
        clickable={true}
      >
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
      </AdvancedMarker>
    </Map>
  );
}
