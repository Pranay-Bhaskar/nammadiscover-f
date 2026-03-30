import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useApp } from '../../store/AppContext';
import { CATEGORIES } from '../../map/constants';
import { createCategoryIcon, createClusterIcon } from './customIcons';

const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return d < 1000 ? `${Math.round(d)}m` : `${(d / 1000).toFixed(1)}km`;
}

export default function MarkerLayer({ locations }) {
  const { userLocation, t, setActiveLocation } = useApp();
  const navigate = useNavigate();

  return (
    <MarkerClusterGroup iconCreateFunction={createClusterIcon} chunkedLoading>
      {locations.map(loc => {
        // MapEngine backend sometimes returns location.coordinates or lat/lng
        const lat = loc.lat || (loc.location && loc.location.coordinates[1]);
        const lng = loc.lng || (loc.location && loc.location.coordinates[0]);

        if (!lat || !lng) return null;

        const catKey = (loc.category || '').toLowerCase();
        const cat = catMap[catKey] || { icon: '📍', label: loc.category };
        const dist = userLocation ? getDistance(userLocation.lat || userLocation.latitude, userLocation.lng || userLocation.longitude, lat, lng) : null;

        return (
          <Marker
            key={loc._id}
            position={[lat, lng]}
            icon={createCategoryIcon(loc.category)}
            eventHandlers={{ click: () => setActiveLocation(loc) }}
          >
            <Popup>
              <div className="preview-popup">
                <div className="preview-category">{cat.icon} {t.category?.[loc.category] || cat.label}</div>
                <div className="preview-name">{loc.displayName || loc.name?.en}</div>
                <div className="preview-desc">{loc.displayDescription || loc.description?.en}</div>
                <div className="preview-meta">
                  <span className="preview-rating">★ {loc.rating?.toFixed(1)}</span>
                  {dist && <span className="preview-distance">📍 {dist} {t.distance || 'away'}</span>}
                  {loc.isVerified && <span style={{ color: '#27AE60', fontSize: '0.75rem' }}>✅ {t.verified || 'Verified'}</span>}
                </div>
                {loc.tags?.length > 0 && (
                  <div className="preview-tags">
                    {loc.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                )}
                <button
                  className="preview-btn"
                  onClick={() => { setActiveLocation(loc); navigate(`/location/${loc._id}`); }}
                >
                  {t.viewDetails || 'View Details'} →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
}
