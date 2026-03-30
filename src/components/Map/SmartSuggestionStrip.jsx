import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { CATEGORIES } from '../../map/constants';

const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

const SmartSuggestionStrip = ({ suggestions }) => {
  const { t, setActiveLocation } = useApp();
  const navigate = useNavigate();

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestion-strip">
      {suggestions.map(loc => {
        const cat = catMap[loc.category] || { icon: '📍', label: loc.category };
        return (
          <div
            key={loc._id}
            className="suggestion-card glass-card"
            onClick={() => {
              setActiveLocation(loc);
              navigate(`/dashboard?location=${loc._id}`); // Keep in dashboard for now or sub-route
            }}
          >
            <div className="suggestion-cat">
              <span className="suggestion-icon">{cat.icon}</span>
              {t.category?.[loc.category] || cat.label}
            </div>
            <div className="suggestion-name">{loc.displayName || loc.name?.en}</div>
            <div className="suggestion-rating">★ {loc.rating?.toFixed(1)} · {loc.city}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SmartSuggestionStrip;
