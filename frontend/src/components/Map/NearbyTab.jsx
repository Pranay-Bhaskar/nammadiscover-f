/*import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../store/AppContext';
import { fetchNearby } from '../../../services/mapApi';

const FILTERS = [
  { id: '', label: '📍 Best Places' },
  { id: 'food', label: '🍛 Food' },
  { id: 'nature', label: '💧 Nature' },
  { id: 'hidden_gem', label: '🌿 Hidden' },
  { id: 'shop', label: '🛍 Shops' },
  { id: 'photo_spot', label: '📸 Photo' },
];

export default function NearbyTab({ locationId, defaultCategory = '' }) {
  const { language, t, setActiveLocation } = useApp();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(defaultCategory);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    fetchNearby(locationId, 15000, activeFilter, language)
      .then(setNearby)
      .catch(() => {});
  }, [locationId, activeFilter, language]);

  const ICONS = { food:'🍛', stay:'🏨', shop:'🛍', hidden_gem:'🌿', local_pick:'🧺', nature:'💧', temple:'🛕', heritage:'🏛', photo_spot:'📸' };

  return (
    <div>
      <div className="nearby-filter">
        {FILTERS.map(f => (
          <button key={f.id} className={`nearby-filter-btn ${activeFilter === f.id ? 'active' : ''}`} onClick={() => setActiveFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      {nearby.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">🗺</div><div>No nearby places found</div></div>
      ) : nearby.map(loc => (
        <div key={loc._id} className="nearby-card animate-slide-left"
          onClick={() => { setActiveLocation(loc); navigate(`/location/${loc._id}`); }}>
          <span className="nearby-icon">{ICONS[loc.category] || '📍'}</span>
          <div style={{ flex: 1 }}>
            <div className="nearby-name">{loc.displayName || loc.name?.en}</div>
            <div className="nearby-meta">★ {loc.rating?.toFixed(1)} · {loc.city}</div>
          </div>
          {loc.distance && <span className="nearby-dist">{loc.distance < 1000 ? `${loc.distance}m` : `${(loc.distance/1000).toFixed(1)}km`}</span>}
        </div>
      ))}
    </div>
  );
}*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../store/AppContext";
import { fetchNearby } from "../../services/api";

/* CATEGORY FALLBACK IMAGES */

const CATEGORY_FALLBACKS = {
  food: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stay: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJUo-NnW7_kPqmT9aQpgyEPqqDu8oXnj0cA&s",
  shop: "https://www.thebengalurulive.com/wp-content/uploads/2021/01/Garuda-Mall.jpg",
  hidden_gem:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Mn-vSbX-sJW8OI5Bjk_rRXwdIjaIccEoQw&s",
  local_pick:
    "https://images.hindustantimes.com/img/2021/07/06/550x309/Karnataka_1625550341795_1625550353626.jpg",
  nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
  temple:
    "https://plus.unsplash.com/premium_photo-1697730413851-1e09e3252314?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  heritage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEuXftvPX1zW3Co4aGXHhimfaUYTyZ0fTZA&s",
  photo_spot:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJqfRQdOMOXXlPRaZemBW8bi7imzsYPIj_Q&s",
};

const FILTERS = [
  { id: "", label: "📍 Best Places" },
  { id: "food", label: "🍛 Food" },
  { id: "nature", label: "💧 Nature" },
  { id: "hidden_gem", label: "🌿 Hidden" },
  { id: "shop", label: "🛍 Shops" },
  { id: "photo_spot", label: "📸 Photo" },
];

export default function NearbyTab({ locationId, defaultCategory = "" }) {
  const { language, setActiveLocation } = useApp();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState(defaultCategory);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    fetchNearby(locationId, 15000, activeFilter, language)
      .then(setNearby)
      .catch(() => {});
  }, [locationId, activeFilter, language]);

  return (
    <div>
      {/* FILTER BUTTONS */}

      <div className="nearby-filter">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`nearby-filter-btn ${
              activeFilter === f.id ? "active" : ""
            }`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* GRID */}

      <div className="nearby-grid">
        {nearby.map((loc) => {
          const name = loc.displayName || loc.name?.en;

          /* IMAGE RESOLVER — same pattern as LocationDetailPage */
          const imgSrc =
            loc.heroImage ||
            loc.images?.[0] ||
            CATEGORY_FALLBACKS[loc.category] ||
            CATEGORY_FALLBACKS.nature;

          return (
            <div
              key={loc._id}
              className="tourism-card"
              onClick={() => {
                setActiveLocation(loc);
                navigate(`/location/${loc._id}`);
              }}
            >
              {/* IMAGE */}

              <div className="card-image">
                <img src={imgSrc} alt={name} />

                <div className="card-badges">
                  <span className="badge category">
                    {loc.category || "Nature"}
                  </span>

                  <span className="badge verified">✔ Verified</span>
                </div>
              </div>

              {/* BODY */}

              <div className="card-body">
                <div className="card-location">
                  📍 {loc.city || "Karnataka"}
                </div>

                <h3 className="card-title">{name}</h3>

                <p className="card-desc">
                  Explore one of Karnataka's beautiful attractions loved by
                  travelers.
                </p>

                <div className="card-footer">
                  <div className="score">
                    <div className="score-bar">
                      <div className="score-fill"></div>
                    </div>
                    <span>88/100</span>
                  </div>

                  <div className="rating">
                    ⭐ {loc.rating?.toFixed(1) || "4.5"}
                  </div>

                  <button className="view-btn">View</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}