import { createContext, useContext, useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_API_KEY } from '@frontend/config';
import { GeoPosition } from '@athena/common';

const LocationContext = createContext<{
  loading: boolean;
  position: GeoPosition | null;
}>({
  loading: false,
  position: null,
});

export const useLocation = () => useContext(LocationContext);

interface LocationProviderProps {
  children: React.ReactNode;
}

export function LocationProvider(props: LocationProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GeoPosition | null>(null);
  const [loading, setLoading] = useState(false);

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
  return (
    <LocationContext.Provider value={{ loading, position: currentLocation }}>
      <APIProvider
        apiKey={GOOGLE_API_KEY}
        onLoad={() => console.log('Maps API has loaded.')}
      >
        {props.children}
      </APIProvider>
    </LocationContext.Provider>
  );
}
