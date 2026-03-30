import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';

export default function ItineraryPanel() {
  const { itinerary, removeFromItinerary, setShowItinerary, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="floating-panel animate-slide-left">
      <div className="panel-header">
        <span className="panel-title">📋 {t.itinerary || 'Itinerary'}</span>
        <button className="panel-close" onClick={() => setShowItinerary(false)}>✕</button>
      </div>
      <div className="panel-body">
        {itinerary.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div>{t.noItinerary || 'Your itinerary is empty.'}</div>
          </div>
        ) : itinerary.map((loc, idx) => (
          <div key={loc._id} className="saved-item" onClick={() => navigate(`/location/${loc._id}`)}>
            <div className="itinerary-badge">{idx + 1}</div>
            <span className="saved-name">{loc.displayName || loc.name?.en}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginRight: 4 }}>{loc.city}</span>
            <button className="saved-remove" onClick={e => { e.stopPropagation(); removeFromItinerary(loc._id); }}>✕</button>
          </div>
        ))}
        {itinerary.length > 1 && (
          <div style={{ marginTop: 12, padding: 10, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            📍 {itinerary.length} stops · Tap to view details
          </div>
        )}
      </div>
    </div>
  );
}
