import { useMapEvents, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { CITIES } from './constants';
import { useDebounce } from '../hooks/useDebounce';

export default function MapController({ onBoundsChange }) {
  const { selectedCity, setSelectedCity } = useApp();
  const map = useMap();

  // City jump
  useEffect(() => {
    if (!selectedCity) return;
    const city = CITIES.find(c => c.name === selectedCity);
    if (city) map.flyTo(city.coords, 13, { duration: 1.2 });
  }, [selectedCity, map]);

  // Bounds changed → fetch locations
  const [boundsKey, setBoundsKey] = /* re-use debounce trick */ (() => {
    let _v = { value: null, set: null };
    return [_v.value, (v) => { _v.value = v; _v.set && _v.set(v); }];
  })();

  useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      onBoundsChange({
        north: b.getNorth(), south: b.getSouth(),
        east: b.getEast(), west: b.getWest()
      });
    },
    load: () => {
      const b = map.getBounds();
      onBoundsChange({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() });
    }
  });

  return null;
}
