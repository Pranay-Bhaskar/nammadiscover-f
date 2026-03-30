import { Marker } from 'react-leaflet';
import { useApp } from '../../store/AppContext';
import { createUserIcon } from './customIcons';

/**
 * Renders a premium pulsated marker at the user's current GPS position.
 */
export default function UserLocationMarker() {
  const { userLocation } = useApp();

  if (!userLocation) return null;

  // Support multiple location formats
  const lat = userLocation.lat || userLocation.latitude || (userLocation.coords && userLocation.coords.latitude);
  const lng = userLocation.lng || userLocation.longitude || (userLocation.coords && userLocation.coords.longitude);

  if (!lat || !lng) return null;

  return (
    <Marker
      position={[lat, lng]}
      icon={createUserIcon()}
      zIndexOffset={1000}
    />
  );
}
