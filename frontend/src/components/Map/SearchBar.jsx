import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { searchLocations } from '../../services/mapApi';
import { useDebounce } from '../../hooks/useDebounce';
import { CATEGORIES } from '../../map/constants';

export default function SearchBar() {
  const { language, t, setActiveLocation } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const debouncedQ = useDebounce(query, 300);
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!debouncedQ.trim()) { setResults([]); setOpen(false); return; }
    searchLocations(debouncedQ, language)
      .then(data => { setResults(data.slice(0, 8)); setOpen(true); })
      .catch(() => { });
  }, [debouncedQ, language]);

  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cat = (id) => CATEGORIES.find(c => c.id === id) || { icon: '📍' };

  const handleSelect = (loc) => {
    setActiveLocation(loc);
    setQuery('');
    setOpen(false);
    navigate(`/location/${loc._id}`);
  };

  return (
    <div className="search-wrap" ref={wrapRef}>
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder={t.search || 'Search places...'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem' }}>✕</button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="search-dropdown animate-slide-up">
          {results.map(loc => {
            const c = cat(loc.category);
            return (
              <div key={loc._id} className="search-result-item" onClick={() => handleSelect(loc)}>
                <span className="search-result-icon">{c.icon}</span>
                <div>
                  <div className="search-result-name">{loc.displayName || loc.name?.en || ''}</div>
                  <div className="search-result-meta">{loc.city} · {t.category?.[loc.category] || loc.category}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '0.8rem' }}>★ {loc.rating}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
