import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';

export default function SavedPlacesPanel() {
  const { savedPlaces, toggleSaved, setShowSaved, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="floating-panel animate-slide-left">
      <div className="panel-header">
        <span className="panel-title">🤍 {t.savedPlaces || 'Saved Places'}</span>
        <button className="panel-close" onClick={() => setShowSaved(false)}>✕</button>
      </div>
      <div className="panel-body">
        {savedPlaces.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🤍</div>
            <div>{t.noSaved || 'No saved places yet.'}</div>
          </div>
        ) : savedPlaces.map(loc => (
          <div key={loc._id} className="saved-item" onClick={() => navigate(`/location/${loc._id}`)}>
            <span className="saved-icon">📍</span>
            <span className="saved-name">{loc.displayName || loc.name?.en}</span>
            <button className="saved-remove" onClick={e => { e.stopPropagation(); toggleSaved(loc); }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
