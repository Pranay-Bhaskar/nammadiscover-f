import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../store/AppContext';
import axios from 'axios';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useDebounce } from '../../hooks/useDebounce';
import MapController from '../Map/MapController';
import MarkerLayer from '../Map/MarkerLayer';
import UserLocationMarker from '../Map/UserLocationMarker';
import SmartSuggestionStrip from '../Map/SmartSuggestionStrip';
import FilterPanel from '../Map/FilterPanel';
import SearchBar from '../Map/SearchBar';
import SavedPlacesPanel from '../Map/SavedPlacesPanel';
import ItineraryPanel from '../Map/ItineraryPanel';

const KARNATAKA_CENTER = [14.5, 75.7];
const KARNATAKA_ZOOM = 7;

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

const MapSection = () => {
    useGeolocation();
    const { darkMode, language, userLocation, t, t_func, selectedCategories, selectedCity, showSaved, showItinerary } = useApp();
    const mapRef = useRef(null);

    const [locations, setLocations] = useState([]);
    const [bounds, setBounds] = useState(null);
    const debouncedBounds = useDebounce(bounds, 350);

    const suggestions = locations.filter(l => l.rating >= 4.5).slice(0, 6);

    useEffect(() => {
        if (!debouncedBounds) return;
        const fetchMapLocations = async () => {
            try {
                const params = {
                    ...debouncedBounds,
                    category: selectedCategories.join(','),
                    lang: language
                };
                if (selectedCity) params.city = selectedCity;
                const res = await axios.get('http://localhost:5001/api/locations', { params });
                setLocations(res.data);
            } catch (err) {
                console.error('Fetch locations:', err);
            }
        };
        fetchMapLocations();
    }, [debouncedBounds, selectedCategories, selectedCity, language]);

    const handleBoundsChange = useCallback((b) => setBounds(b), []);

    const handleRecenter = () => {
        if (!userLocation || !mapRef.current) return;
        const lat = userLocation.latitude || userLocation.lat || (userLocation.coords && userLocation.coords.latitude);
        const lng = userLocation.longitude || userLocation.lng || (userLocation.coords && userLocation.coords.longitude);
        if (lat && lng) {
            mapRef.current.flyTo([lat, lng], 14, { animate: true, duration: 1.5 });
        }
    };

    return (
        <>
            {/* 🔥 PREMIUM MAP CSS */}
            <style>{`
                .map-wrapper {
                    padding: 3rem 1rem;
                }

                .map-title {
                    font-size: 2rem;
                    font-weight: 800;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .map-box {
                    max-width: 1200px;
                    margin: auto;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(12px);
                }
            `}</style>

            <section id="map-section" className="section no-padding">

                <div className="map-wrapper">

                    {/* ✅ TITLE */}
                    <h2 className="map-title">Maps</h2>

                    {/* ✅ BOX CONTAINER */}
                    <div className="map-box">
                        <div className="map-layout" style={{ display: 'flex', width: '100%', height: '650px' }}>

                            <FilterPanel />

                            <div className="map-container" style={{ flex: 1, position: 'relative', height: '100%' }}>

                                <SearchBar />

                                <MapContainer
                                    ref={mapRef}
                                    center={KARNATAKA_CENTER}
                                    zoom={KARNATAKA_ZOOM}
                                    style={{ width: '100%', height: '100%' }}
                                    zoomControl={false}
                                >
                                    <TileLayer
                                        key={darkMode ? 'dark' : 'light'}
                                        url={darkMode ? DARK_TILES : LIGHT_TILES}
                                        attribution='&copy; OSM & CARTO'
                                    />
                                    <MapController onBoundsChange={handleBoundsChange} />
                                    <MarkerLayer locations={locations} />
                                    <UserLocationMarker />
                                </MapContainer>

                                <SmartSuggestionStrip suggestions={suggestions} />

                                {userLocation && (
                                    <button
                                        onClick={handleRecenter}
                                        className="map-recenter-btn glass-card"
                                        style={{
                                            position: 'absolute',
                                            bottom: 80,
                                            right: 20,
                                            zIndex: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '10px 15px'
                                        }}
                                    >
                                        <span>📍</span> {t_func('You Are Here', 'ನೀವು ಇಲ್ಲಿದ್ದೀರಿ')}
                                    </button>
                                )}
                            </div>

                            {showSaved && <SavedPlacesPanel />}
                            {showItinerary && <ItineraryPanel />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MapSection;