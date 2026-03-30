import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { CATEGORIES } from './constants';

const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

export default function SmartSuggestionStrip({ suggestions }) {
  const { t, setActiveLocation } = useApp();
  const navigate = useNavigate();
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 500, display: 'flex', gap: 10, overflowX: 'auto', maxWidth: '70vw', padding: '0 4px 4px', pointerEvents: 'none' }}>
      {suggestions.slice(0, 6).map(loc => {
        const cat = catMap[loc.category] || { icon: '📍' };
        return (
          <div
            key={loc._id}
            className="suggestion-card"
            style={{ pointerEvents: 'auto' }}
            onClick={() => { setActiveLocation(loc); navigate(`/location/${loc._id}`); }}
          >
            <div className="suggestion-cat">{cat.icon} {loc.category}</div>
            <div className="suggestion-name">{loc.displayName || loc.name?.en}</div>
            <div className="suggestion-rating">★ {loc.rating?.toFixed(1)} · {loc.city}</div>
          </div>
        );
      })}
    </div>
  );
}
