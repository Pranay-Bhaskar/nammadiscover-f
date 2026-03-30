import { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useApp } from '../store/AppContext';
import { fetchLocations } from '../services/api';
import { useGeolocation } from '../hooks/useGeolocation';
import { useDebounce } from '../hooks/useDebounce';
import MapController from './MapController';
import MarkerLayer from './MarkerLayer';
import UserLocationMarker from './UserLocationMarker';
import SmartSuggestionStrip from './SmartSuggestionStrip';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SavedPlacesPanel from '../components/SavedPlacesPanel';
import ItineraryPanel from '../components/ItineraryPanel';

// Karnataka center
const KARNATAKA_CENTER = [14.5, 75.7];
const KARNATAKA_ZOOM = 7;

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

export default function MapPage() {
  useGeolocation();
  const { selectedCategories, selectedCity, darkMode, language, showSaved, showItinerary, userLocation, t } = useApp();

  // 1. Create a reference for the map instance
  const mapRef = useRef(null);

  const [locations, setLocations] = useState([]);
  const [bounds, setBounds] = useState(null);
  const debouncedBounds = useDebounce(bounds, 350);

  const suggestions = locations.filter(l => l.rating >= 4.5).slice(0, 6);

  useEffect(() => {
    if (!debouncedBounds) return;
    const params = {
      ...debouncedBounds,
      category: selectedCategories.join(','),
      lang: language
    };
    if (selectedCity) params.city = selectedCity;
    fetchLocations(params)
      .then(setLocations)
      .catch(err => console.error('Fetch locations:', err));
  }, [debouncedBounds, selectedCategories, selectedCity, language]);

  const handleBoundsChange = useCallback((b) => setBounds(b), []);

  // 2. Define the re-center function
  const handleRecenter = () => {
  console.log("Full User Location Object:", userLocation); // Look at this in console!
  
  if (!userLocation) return;

  if (mapRef.current) {
    // 1. Try to find the latitude in various common keys
    const lat = userLocation.latitude || userLocation.lat || (userLocation.coords && userLocation.coords.latitude);
    
    // 2. Try to find the longitude in various common keys
    const lng = userLocation.longitude || userLocation.lng || (userLocation.coords && userLocation.coords.longitude);

    if (lat && lng) {
      mapRef.current.flyTo([lat, lng], 14, {
        animate: true,
        duration: 1.5
      });
    } else {
      console.error("Still couldn't find lat/lng. Check the keys in the object above.");
    }
  }
};

  return (
    <div className="map-layout">
      <FilterPanel />

      <div className="map-container" style={{ position: 'relative' }}>
        <SearchBar />

        <MapContainer
          ref={mapRef} // 3. Attach the ref to the MapContainer
          center={KARNATAKA_CENTER}
          zoom={KARNATAKA_ZOOM}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            key={darkMode ? 'dark' : 'light'}
            url={darkMode ? DARK_TILES : LIGHT_TILES}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <MapController onBoundsChange={handleBoundsChange} />
          <MarkerLayer locations={locations} />
          <UserLocationMarker />
        </MapContainer>

        {/* Floating controls */}
        <SmartSuggestionStrip suggestions={suggestions} />

        {/* User location center button */}
        {userLocation && (
          <button
            onClick={handleRecenter} // 4. Add the click handler
            style={{
              position: 'absolute', 
              bottom: 80,   
              right: 16, 
              zIndex: 500,
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-sans)',
              boxShadow: 'var(--shadow)',
              verticalAlign: 'middle',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span>📍</span> {t.youAreHere || 'You Are Here'}
          </button>
        )}
      </div>

      {/* Floating panels */}
      {showSaved && <SavedPlacesPanel />}
      {showItinerary && <ItineraryPanel />}
    </div>
  );
}