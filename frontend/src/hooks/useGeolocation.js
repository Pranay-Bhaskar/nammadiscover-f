import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../store/AppContext';

export function useGeolocation() {
  const { setUserLocation } = useApp();
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(loc);
        setUserLocation(loc);
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  }, [setUserLocation]);

  useEffect(() => { request(); }, [request]);

  return { coords, error };
}
