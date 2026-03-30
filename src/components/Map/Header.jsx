import logoPng from '../../assets/logo.png';
import { useApp } from '../../../store/AppContext';

/* ── Inline SVG icons ─────────────────────────────────────── */
const KarnatakaLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="header-logo-icon">
    <polygon
      points="8,14 12,8 20,7 28,9 36,14 38,22 35,30 30,36 22,38 14,36 9,28 7,20"
      fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"
    />
    <circle cx="22" cy="20" r="5" fill="none" stroke="#D4A017" strokeWidth="1.5" />
    <line x1="22" y1="15" x2="22" y2="13" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="27" x2="22" y2="25" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="17" y1="20" x2="15" y2="20" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="29" y1="20" x2="27" y2="20" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="22" cy="20" r="2" fill="#D4A017" />
    <path d="M22 25 L22 33" stroke="#2D7A35" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="22" cy="34" r="1.5" fill="#2D7A35" />
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Header() {
  const { darkMode, toggleDarkMode, toggleLanguage, t, setShowSaved, setShowItinerary, showFilter, setShowFilter, savedPlaces, itinerary } = useApp();

  return (
    <header className="app-header">
      <div className="header-logo">
        <img 
          src={logoPng} 
          alt="Karnataka Tourism Logo" 
          className="header-logo-image"
        />
        <div>
          <div>{t.appTitle || 'Karnataka Tourism'}</div>
          <div className="header-tagline" style={{ color: 'inherit', opacity: 1 }}>
            {t.tagline || 'Explore the Heart of India'}
          </div>
        </div>
      </div>
      <div className="header-spacer" />
      <button className={`header-btn ${showFilter ? 'active' : ''}`} onClick={() => setShowFilter(p => !p)}>
        <FilterIcon /> {t.filterPanel || 'Filter'}
      </button>
      <button className="header-btn" onClick={() => setShowSaved(p => !p)}>
        <HeartIcon filled={savedPlaces.length > 0} /> {savedPlaces.length > 0 ? `(${savedPlaces.length})` : t.savedPlaces || 'Saved'}
      </button>
      <button className="header-btn" onClick={() => setShowItinerary(p => !p)}>
        <MapIcon /> {itinerary.length > 0 ? `(${itinerary.length})` : t.itinerary || 'Itinerary'}
      </button>
      <button className="header-btn" onClick={toggleLanguage}>
        <GlobeIcon /> {t.language || 'ಕನ್ನಡ'}
      </button>
      <button className="header-btn" onClick={toggleDarkMode}>
        {darkMode ? <SunIcon /> : <MoonIcon />}
        <span style={{ display: 'none' }}>{darkMode ? t.lightMode : t.darkMode}</span>
      </button>
    </header>
  );
}