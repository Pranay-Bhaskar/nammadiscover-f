import { useApp } from '../../store/AppContext';
import { CATEGORIES, CITIES } from '../../map/constants';
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  CheckCheck,
} from 'lucide-react';

/* ── SVG icon library ─────────────────────────────────────── */
const CategorySVGs = {
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  stay: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  hidden_gem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  local_pick: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 4-2 8-2s4 2 8 2V14C14 14 12 10 17 8z" />
    </svg>
  ),
  temple: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  heritage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="1" /><path d="M3 11l9-9 9 9" /><rect x="9" y="14" width="6" height="8" />
    </svg>
  ),
  photo_spot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  secret_cafe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  street_food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  niche_gaming: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M7 12h2" /><path d="M8 11v2" /><path d="M15 11l2 2" /><path d="M15 13l2-2" />
    </svg>
  ),
  indie_bookstore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
};

const DefaultCatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function FilterPanel() {
  const {
    selectedCategories,
    toggleCategory,
    setAllCategories,
    selectedCity,
    setSelectedCity,
    showFilter,
    setShowFilter,
    t,
    language,
  } = useApp();

  const allSelected = selectedCategories.length === CATEGORIES.length;

  return (
    <>
      {/* ── Backdrop (mobile) ── */}
      {showFilter && (
        <div
          className="fp-backdrop"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* ── Toggle Tab ── */}
      <button
        className={`fp-tab ${showFilter ? 'fp-tab--open' : ''}`}
        onClick={() => setShowFilter(v => !v)}
        aria-label={showFilter ? 'Close filters' : 'Open filters'}
      >
        {showFilter ? (
          <ChevronLeft size={18} strokeWidth={2.5} />
        ) : (
          <>
            <ChevronRight size={14} strokeWidth={2.5} />
          </>
        )}
      </button>

      {/* ── Panel ── */}
      <aside className={`fp-panel ${showFilter ? 'fp-panel--open' : ''}`}>
        {/* Header */}
        <div className="fp-header">
          <SlidersHorizontal size={16} strokeWidth={2} className="fp-header-icon" />
          <span className="fp-header-title">{t.filters || 'Filters'}</span>
          <button
            className="fp-close-btn"
            onClick={() => setShowFilter(false)}
            aria-label="Close"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Categories ── */}
        <section className="fp-section">
          <div className="fp-section-label">
            <Sparkles size={13} strokeWidth={2} />
            <span>{t.categories || 'Categories'}</span>
          </div>

          {/* All Categories pill */}
          <button
            className={`fp-all-btn ${allSelected ? 'fp-all-btn--active' : ''}`}
            onClick={setAllCategories}
          >
            <CheckCheck size={14} strokeWidth={2} />
            <span>{t.allCategories || 'All Categories'}</span>
          </button>

          {/* Category grid */}
          <div className="fp-cat-grid">
            {CATEGORIES.map(cat => {
              const active = selectedCategories.includes(cat.id);
              const Icon = CategorySVGs[cat.id];
              return (
                <button
                  key={cat.id}
                  className={`fp-cat-btn ${active ? 'fp-cat-btn--active' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                  style={
                    active
                      ? {
                        '--cat-color': cat.color,
                        borderColor: cat.color,
                        color: cat.color,
                        background: cat.color + '18',
                      }
                      : { '--cat-color': cat.color }
                  }
                >
                  <span
                    className="fp-cat-icon"
                    style={{ color: active ? cat.color : undefined }}
                  >
                    {Icon ? Icon : <DefaultCatIcon />}
                  </span>
                  <span className="fp-cat-label">
                    {language === 'kn' ? cat.labelKn : cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── City Jump ── */}
        <section className="fp-section">
          <div className="fp-section-label">
            <MapPin size={13} strokeWidth={2} />
            <span>{t.quickJump || 'Quick City Jump'}</span>
          </div>

          <div className="fp-city-list">
            {CITIES.map(city => {
              const active = selectedCity === city.name;
              return (
                <button
                  key={city.name}
                  className={`fp-city-btn ${active ? 'fp-city-btn--active' : ''}`}
                  onClick={() =>
                    setSelectedCity(active ? null : city.name)
                  }
                >
                  <MapPin
                    size={13}
                    strokeWidth={active ? 2.5 : 2}
                    className="fp-city-pin"
                  />
                  <span>{language === 'kn' ? city.namekn : city.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </aside>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ── Backdrop ── */
        .fp-backdrop {
          position: fixed;
          inset: 0;
          z-index: 899;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(2px);
          animation: fpFadeIn 0.2s ease;
        }
        @keyframes fpFadeIn { from { opacity:0 } to { opacity:1 } }

        /* ── Toggle Tab ── */
        .fp-tab {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          width: 28px;
          height: 64px;
          background: #1a3c2e;
          color: #e8c97e;
          border: none;
          border-radius: 0 10px 10px 0;
          cursor: pointer;
          box-shadow: 3px 0 12px rgba(0,0,0,0.18);
          transition: width 0.2s ease, background 0.2s ease;
        }
        .fp-tab:hover {
          width: 32px;
          background: #234d3b;
        }
        .fp-tab--open {
          left: 290px;
          border-radius: 0 10px 10px 0;
          background: #1a3c2e;
          transition: left 0.32s cubic-bezier(0.4,0,0.2,1), width 0.2s ease;
        }

        /* ── Panel ── */
        .fp-panel {
          position: fixed;
          top: 0;
          left: -300px;
          width: 290px;
          height: 100dvh;
          z-index: 900;
          background: #f7f3ed;
          border-right: 1px solid rgba(0,0,0,0.08);
          box-shadow: 4px 0 24px rgba(0,0,0,0.12);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: left 0.32s cubic-bezier(0.4,0,0.2,1);
          font-family: 'DM Sans', sans-serif;
        }
        .fp-panel--open {
          left: 0;
        }

        /* Dark mode */
        body.dark .fp-panel {
          background: #111c16;
          border-right-color: rgba(255,255,255,0.06);
        }
        body.dark .fp-tab {
          background: #0e1f16;
        }

        /* Scrollbar */
        .fp-panel::-webkit-scrollbar { width: 4px; }
        .fp-panel::-webkit-scrollbar-track { background: transparent; }
        .fp-panel::-webkit-scrollbar-thumb { background: #c8bfb0; border-radius: 4px; }
        body.dark .fp-panel::-webkit-scrollbar-thumb { background: #2e4035; }

        /* ── Header ── */
        .fp-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 18px 18px 14px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          position: sticky;
          top: 0;
          background: #f7f3ed;
          z-index: 2;
        }
        body.dark .fp-header {
          background: #111c16;
          border-bottom-color: rgba(255,255,255,0.06);
        }
        .fp-header-icon {
          color: #1a3c2e;
          flex-shrink: 0;
        }
        body.dark .fp-header-icon { color: #e8c97e; }
        .fp-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #1a3c2e;
          letter-spacing: 0.01em;
          flex: 1;
        }
        body.dark .fp-header-title { color: #e8f5e2; }
        .fp-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: none;
          background: rgba(26,60,46,0.08);
          color: #1a3c2e;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .fp-close-btn:hover { background: rgba(26,60,46,0.16); }
        body.dark .fp-close-btn {
          background: rgba(232,201,126,0.1);
          color: #e8c97e;
        }

        /* ── Sections ── */
        .fp-section {
          padding: 16px 16px 12px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        body.dark .fp-section { border-bottom-color: rgba(255,255,255,0.05); }

        .fp-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a7d6b;
          margin-bottom: 12px;
        }
        body.dark .fp-section-label { color: #6b8c73; }

        /* ── All Categories btn ── */
        .fp-all-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          padding: 9px 13px;
          border: 1.5px solid #d4ccc0;
          border-radius: 8px;
          background: transparent;
          color: #4a5568;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          margin-bottom: 10px;
        }
        .fp-all-btn:hover {
          border-color: #1a3c2e;
          color: #1a3c2e;
          background: rgba(26,60,46,0.05);
        }
        .fp-all-btn--active {
          border-color: #1a3c2e !important;
          background: #1a3c2e !important;
          color: #e8c97e !important;
        }
        body.dark .fp-all-btn {
          border-color: #2a3d30;
          color: #9ab89f;
        }
        body.dark .fp-all-btn:hover {
          border-color: #e8c97e;
          color: #e8c97e;
          background: rgba(232,201,126,0.06);
        }
        body.dark .fp-all-btn--active {
          border-color: #e8c97e !important;
          background: rgba(232,201,126,0.12) !important;
          color: #e8c97e !important;
        }

        /* ── Category Grid ── */
        .fp-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
        }
        .fp-cat-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px 6px;
          border: 1.5px solid #ddd6cc;
          border-radius: 10px;
          background: #fff;
          color: #4a5568;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          line-height: 1.2;
        }
        .fp-cat-btn:hover {
          border-color: var(--cat-color, #1a3c2e);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
        }
        .fp-cat-btn--active {
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        body.dark .fp-cat-btn {
          background: #1a2b1f;
          border-color: #2a3d30;
          color: #9ab89f;
        }
        .fp-cat-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fp-cat-icon svg {
          width: 100%;
          height: 100%;
        }
        .fp-cat-label {
          text-align: center;
        }

        /* ── City List ── */
        .fp-city-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .fp-city-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 9px 12px;
          border: 1.5px solid transparent;
          border-radius: 8px;
          background: transparent;
          color: #4a5568;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }
        .fp-city-btn:hover {
          background: rgba(26,60,46,0.06);
          color: #1a3c2e;
        }
        .fp-city-btn--active {
          background: #1a3c2e;
          color: #e8c97e;
          font-weight: 500;
          border-color: #1a3c2e;
        }
        .fp-city-btn--active .fp-city-pin { color: #e8c97e; }
        .fp-city-pin { color: #8a7d6b; flex-shrink: 0; }
        body.dark .fp-city-btn { color: #9ab89f; }
        body.dark .fp-city-btn:hover {
          background: rgba(232,201,126,0.07);
          color: #e8c97e;
        }
        body.dark .fp-city-btn--active {
          background: rgba(232,201,126,0.12);
          color: #e8c97e;
          border-color: #e8c97e;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .fp-panel { width: 260px; }
          .fp-tab--open { left: 260px; }
        }
      `}</style>
    </>
  );
}