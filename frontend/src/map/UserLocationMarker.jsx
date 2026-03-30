import { Marker } from 'react-leaflet';
import { useApp } from '../store/AppContext';
import { createUserIcon } from './customIcons';

export default function UserLocationMarker() {
  const { userLocation } = useApp();
  if (!userLocation) return null;
  return (
    <Marker
      position={[userLocation.lat, userLocation.lng]}
      icon={createUserIcon()}
      zIndexOffset={1000}
    />
  );
}
