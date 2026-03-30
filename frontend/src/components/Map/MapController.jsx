import { useMapEvents, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { CITIES } from '../../map/constants';

export default function MapController({ onBoundsChange }) {
  const { selectedCity } = useApp();
  const map = useMap();

  // Handle city jumps (from sidebar or global city selector)
  useEffect(() => {
    if (!selectedCity) return;
    const city = CITIES.find(c => c.name.toLowerCase() === selectedCity.toLowerCase());
    if (city) {
      map.flyTo(city.coords, 13, { animate: true, duration: 1.5 });
    }
  }, [selectedCity, map]);

  // Sync map bounds with parent component for location fetching
  useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      onBoundsChange({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest()
      });
    },
    load: () => {
      const b = map.getBounds();
      onBoundsChange({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest()
      });
    }
  });

  return null;
}
