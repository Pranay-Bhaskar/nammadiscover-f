import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getVideos, getExplorers } from '../services/videoService';
import { useAuth } from '../context/AuthContext';
import './VideoGallery.css';

/* ─── Constants ────────────────────────────────────────────────────────────── */
const CATEGORIES = ['Nature', 'Culture', 'Food', 'Travel', 'Events', 'Sports', 'Education', 'Other'];

const CAT_META = {
  Nature:    { icon: '🌿', kn: 'ಪ್ರಕೃತಿ',    color: '#1B4D2A', accent: '#3A8C54' },
  Culture:   { icon: '🎭', kn: 'ಸಂಸ್ಕೃತಿ',  color: '#5A1A00', accent: '#B84A10' },
  Food:      { icon: '🍛', kn: 'ಆಹಾರ',      color: '#6B2800', accent: '#D4781A' },
  Travel:    { icon: '✈️', kn: 'ಪ್ರಯಾಣ',    color: '#0A2040', accent: '#1A5C9A' },
  Events:    { icon: '🎉', kn: 'ಉತ್ಸವ',     color: '#4A0A2E', accent: '#9A2060' },
  Sports:    { icon: '⚽', kn: 'ಕ್ರೀಡೆ',    color: '#0A2A40', accent: '#1A7A8A' },
  Education: { icon: '📚', kn: 'ಶಿಕ್ಷಣ',    color: '#1A1A40', accent: '#3A3A9A' },
  Other:     { icon: '🎬', kn: 'ಇತರ',       color: '#2A1A00', accent: '#7A5A1A' },
};

const KA_DESTINATIONS = [
  'Mysuru', 'Hampi', 'Coorg', 'Gokarna', 'Badami', 'Belur', 'Halebid', 'Dandeli',
  'Sakleshpur', 'Chikmagalur', 'Udupi', 'Mangaluru', 'Hospet', 'Dharwad', 'Sirsi',
  'Jog Falls', 'Kabini', 'Nagarhole', 'Bandipur', 'Kudremukh', 'Agumbe', 'Murudeshwara',
];

const FEATURED_CATS = [
  { cat: 'Nature',  title: 'Western Ghats', sub: 'Forests, waterfalls & wildlife corridors', size: 'large' },
  { cat: 'Culture', title: 'Living Heritage', sub: 'Temples, festivals & Kannada traditions', size: 'small' },
  { cat: 'Food',    title: 'Flavours of ಕರ್ನಾಟಕ', sub: 'Bisibelebath, Coorg curry & more', size: 'small' },
  { cat: 'Travel',  title: 'Hidden Routes', sub: 'Backroads, hillforts & secret beaches', size: 'medium' },
  { cat: 'Events',  title: 'Dasara & Beyond', sub: "Mysuru's grandest celebrations", size: 'medium' },
];

/* ─── Hooks ────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [vis, ref];
}

function useCountUp(target, duration = 2200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick); else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ─── Ticker ───────────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [...KA_DESTINATIONS, ...KA_DESTINATIONS];
  return (
    <div className="vg-ticker">
      <div className="vg-ticker-label">ಕರ್ನಾಟಕ</div>
      <div className="vg-ticker-track">
        <div className="vg-ticker-inner">
          {items.map((d, i) => (
            <span key={i} className="vg-ticker-item">
              <span className="vg-ticker-dot">◆</span> {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Discovery Bento Grid ─────────────────────────────────────────────────── */
function DiscoveryGrid({ onFilter, scrollToVideos }) {
  const [vis, ref] = useInView(0.1);
  return (
    <section id="discover-section" className="vg-section vg-discovery" ref={ref}>
      <div className="vg-discovery-head">
        <div className={`vg-section-tag${vis ? ' vg-reveal' : ''}`}>DISCOVER KARNATAKA</div>
        <h2 className={`vg-section-title${vis ? ' vg-reveal vg-delay-1' : ''}`}>
          Every Corner<br />
          <em>Has a Story</em>
        </h2>
        <p className={`vg-section-sub${vis ? ' vg-reveal vg-delay-2' : ''}`}>
          From the misty peaks of Coorg to the ancient ruins of Hampi —<br />
          explore Karnataka through real community videos.
        </p>
      </div>
      <div className={`vg-bento${vis ? ' vg-reveal vg-delay-2' : ''}`}>
        {FEATURED_CATS.map((f, i) => {
          const meta = CAT_META[f.cat];
          return (
            <BentoCard key={f.cat} {...f} meta={meta} index={i}
              onClick={() => { onFilter(f.cat); scrollToVideos(); }}
            />
          );
        })}
      </div>
    </section>
  );
}

function BentoCard({ cat, title, sub, size, meta, index, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`vg-bento-card vg-bento-${size}`}
      style={{ background: `linear-gradient(145deg, ${meta.color}, ${meta.accent})`, transitionDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <div className="vg-bento-bg-icon" style={{ transform: hov ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)' }}>
        {meta.icon}
      </div>
      <div className="vg-bento-kn">{meta.kn}</div>
      <div className="vg-bento-body">
        <div className="vg-bento-cat">{meta.icon} {cat}</div>
        <h3 className="vg-bento-title">{title}</h3>
        <p className="vg-bento-sub">{sub}</p>
        <div className="vg-bento-arrow" style={{ opacity: hov ? 1 : 0, transform: hov ? 'translateX(0)' : 'translateX(-10px)' }}>
          Explore Videos →
        </div>
      </div>
    </div>
  );
}

/* ─── Stats Strip ──────────────────────────────────────────────────────────── */
function StatsStrip({ videos }) {
  const safeVideos = Array.isArray(videos) ? videos : [];
  const total = safeVideos.reduce((s, v) => s + (v.views || 0), 0);
  const [vis, ref] = useInView(0.2);
  return (
    <div className="vg-stats" ref={ref}>
      <div className="vg-stats-bg-text">ಅಂಕಿ</div>
      <div className="vg-stats-inner">
        {[
          { val: safeVideos.length, suf: '', lab: 'Videos Published', icon: '🎬' },
          { val: CATEGORIES.length, suf: '', lab: 'Explore Categories', icon: '📂' },
          { val: total, suf: '+', lab: 'Community Views', icon: '👁' },
          { val: KA_DESTINATIONS.length, suf: '+', lab: 'Karnataka Destinations', icon: '📍' },
        ].map((s, i) => (
          <StatBlock key={i} {...s} vis={vis} delay={i * 0.12} />
        ))}
      </div>
    </div>
  );
}

function StatBlock({ val, suf, lab, icon, vis, delay }) {
  const [count, ref] = useCountUp(val);
  return (
    <div ref={ref} className="vg-stat-block"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      <span className="vg-stat-icon">{icon}</span>
      <span className="vg-stat-num">{typeof val === 'number' ? count.toLocaleString() : val}{suf}</span>
      <span className="vg-stat-lab">{lab}</span>
    </div>
  );
}

/* ─── Video Card ───────────────────────────────────────────────────────────── */
function VideoCard({ video, onClick, index }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const meta = CAT_META[video?.category] || CAT_META.Other;
  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div ref={ref} className="vg-vcard"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(30px)',
        transition: `opacity 0.55s ease ${Math.min(index * 0.06, 0.5)}s, transform 0.35s cubic-bezier(.25,.8,.25,1)`,
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onClick(video)}
    >
      <div className="vg-vcard-thumb">
        {video?.thumbnail_url
          ? <img src={video.thumbnail_url} alt={video.title} loading="lazy"
              style={{ transform: hov ? 'scale(1.08)' : 'scale(1)' }} />
          : <div className="vg-vcard-no-thumb" style={{ background: `linear-gradient(145deg,${meta.color},${meta.accent})` }}>
              <span>{meta.icon}</span>
            </div>
        }
        <div className="vg-vcard-overlay" />
        <div className="vg-vcard-play" style={{ opacity: hov ? 1 : 0, transform: `scale(${hov ? 1 : 0.75})` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--vg-gold)"><polygon points="6,3 20,12 6,21" /></svg>
        </div>
        <div className="vg-vcard-cat-badge" style={{ background: meta.accent }}>{meta.icon} {video?.category}</div>
        <div className="vg-vcard-views">
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          {(video?.views || 0).toLocaleString()}
        </div>
      </div>
      <div className="vg-vcard-body">
        <p className="vg-vcard-title">{video?.title}</p>
        <div className="vg-vcard-meta">
          {video?.place_name && <span className="vg-vcard-place">📍 {video.place_name}</span>}
          <span className="vg-vcard-date">{fmt(video?.upload_time)}</span>
        </div>
        {video?.tags?.length > 0 && (
          <div className="vg-vcard-tags">
            {video.tags.slice(0, 2).map(t => <span key={t} className="vg-vcard-tag">#{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Video Modal ──────────────────────────────────────────────────────────── */
function VideoModal({ video, onClose }) {
  const vRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const meta = CAT_META[video?.category] || CAT_META.Other;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
  }, [onClose]);

  return (
    <div className="vg-modal-back" onClick={onClose}>
      <div className="vg-modal" onClick={e => e.stopPropagation()}>
        <div className="vg-modal-player">
          {playing
            ? <video ref={vRef} src={video?.video_url} controls autoPlay playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            : <div className="vg-modal-cover" onClick={() => setPlaying(true)}>
                {video?.thumbnail_url
                  ? <img src={video.thumbnail_url} alt={video.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg,${meta.color},${meta.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>{meta.icon}</div>
                }
                <div className="vg-modal-play-wrap">
                  <div className="vg-modal-play-ring" />
                  <div className="vg-modal-play-btn">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--vg-gold)"><polygon points="7,3 21,12 7,21" /></svg>
                  </div>
                </div>
              </div>
          }
        </div>
        <div className="vg-modal-info">
          <button className="vg-modal-close" onClick={onClose}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <div className="vg-modal-cat" style={{ color: meta.accent }}>{meta.icon} {video?.category} · {meta.kn}</div>
          <h2 className="vg-modal-title">{video?.title}</h2>
          <div className="vg-modal-meta">
            {video?.place_name && <span>📍 {video.place_name}</span>}
            <span>👁 {(video?.views || 0).toLocaleString()} views</span>
            <span>📅 {video?.upload_time ? new Date(video.upload_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}</span>
          </div>
          {video?.description && <p className="vg-modal-desc">{video.description}</p>}
          {video?.tags?.length > 0 && (
            <div className="vg-modal-tags">
              {video.tags.map(t => <span key={t} className="vg-modal-tag">#{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Video Feed Section ───────────────────────────────────────────────────── */
function VideoSection({ videos, loading, error, categoryFilter, setCategoryFilter, search, setSearch, onSelectVideo }) {
  const [vis, ref] = useInView(0.05);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const safeVideos = Array.isArray(videos) ? videos : [];
  const filtered = safeVideos.filter(v => {
    if (!debouncedSearch) return true;
    const q = debouncedSearch.toLowerCase();
    return v?.title?.toLowerCase().includes(q) || v?.place_name?.toLowerCase().includes(q) || v?.tags?.some(t => t.toLowerCase().includes(q));
  });

  return (
    <section id="gallery-section" className="vg-section vg-video-sec" ref={ref}>
      <div className="vg-video-sec-inner">
        <div className="vg-vsec-header">
          <div>
            <div className={`vg-section-tag${vis ? ' vg-reveal' : ''}`}>COMMUNITY VIDEOS</div>
            <h2 className={`vg-section-title${vis ? ' vg-reveal vg-delay-1' : ''}`}>
              {categoryFilter
                ? <>{CAT_META[categoryFilter]?.icon} {categoryFilter} Stories</>
                : <>Real Stories,<br /><em>Real Karnataka</em></>
              }
            </h2>
          </div>
          <div className={`vg-vsec-controls${vis ? ' vg-reveal vg-delay-2' : ''}`}>
            <div className="vg-search" style={{ boxShadow: focused ? '0 0 0 2.5px var(--vg-gold)' : 'none' }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input placeholder="Search places, food, temples…" value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="vg-search-input" />
              {search && <button className="vg-search-clear" onClick={() => setSearch('')}>×</button>}
            </div>
            {/* <Link to="/my-videos" className="vg-upload-btn">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Video
            </Link> */}
          </div>
        </div>

        <div className="vg-filmstrip">
          <button className={`vg-film-btn${categoryFilter === '' ? ' vg-film-active' : ''}`} onClick={() => setCategoryFilter('')}>All Stories</button>
          {CATEGORIES.map(c => (
            <button key={c}
              className={`vg-film-btn${categoryFilter === c ? ' vg-film-active' : ''}`}
              style={categoryFilter === c ? { background: CAT_META[c].accent, borderColor: CAT_META[c].accent } : {}}
              onClick={() => setCategoryFilter(c === categoryFilter ? '' : c)}
            >{CAT_META[c]?.icon} {c}</button>
          ))}
        </div>

        {debouncedSearch && (
          <div className="vg-search-result-label">
            <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''} for <strong>"{debouncedSearch}"</strong></span>
            <button onClick={() => setSearch('')} className="vg-clear-btn">Clear search ×</button>
          </div>
        )}

        {error && (
          <div className="vg-error">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {loading && (
          <div className="vg-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="vg-skeleton">
                <div className="vg-skel-thumb" />
                <div className="vg-skel-body">
                  <div className="vg-skel-line" style={{ width: '78%' }} />
                  <div className="vg-skel-line" style={{ width: '48%', marginTop: '0.45rem' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="vg-empty">
            <div className="vg-empty-kn">ಖಾಲಿ</div>
            <h3 className="vg-empty-title">{debouncedSearch ? `No videos found for "${debouncedSearch}"` : 'No videos yet'}</h3>
            <p className="vg-empty-sub">{debouncedSearch ? 'Try different keywords or browse all stories.' : 'Karnataka is waiting to be discovered. Be first.'}</p>
            {!debouncedSearch && <Link to="/my-videos" className="vg-empty-btn">Upload First Video</Link>}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="vg-grid">
            {filtered.map((v, i) => (
              <VideoCard key={v._id} video={v} index={i} onClick={onSelectVideo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Local Explorers Section ──────────────────────────────────────────────── */
// function LocalExplorers({ explorers }) {
//   const [vis, ref] = useInView(0.1);
//   const safeExplorers = Array.isArray(explorers) ? explorers : [];

//   if (safeExplorers.length === 0) return null;

//   const avatarColors = ['#3A8C54', '#B84A10', '#D4781A', '#1A5C9A', '#9A2060', '#1A7A8A', '#3A3A9A', '#7A5A1A'];
  
//   return (
//     <section className="vg-section vg-explorers-section" ref={ref}>
//       <div className="vg-explorers-inner">
//         <div className={`vg-section-tag${vis ? ' vg-reveal' : ''}`}>COMMUNITY</div>
//         <h2 className={`vg-section-title${vis ? ' vg-reveal vg-delay-1' : ''}`}>
//           Our Local<br /><em>Explorers</em>
//         </h2>
//         <p className={`vg-section-sub${vis ? ' vg-reveal vg-delay-2' : ''}`}>
//           Meet the people who bring Karnataka alive through their lens. Every explorer adds a unique story.
//         </p>

//         <div className={`vg-explorer-grid${vis ? ' vg-reveal vg-delay-3' : ''}`}>
//           {safeExplorers.map((ex, idx) => {
//             const color = avatarColors[idx % avatarColors.length];
//             const initials = (ex.username || 'U')[0].toUpperCase();
//             return (
//               <div key={ex._id} className="vg-explorer-card"
//                 style={{ animationDelay: `${idx * 0.08}s`, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.6s ease ${idx * 0.08}s` }}>
//                 <div className="vg-explorer-avatar" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
//                   {ex.avatar ? <img src={ex.avatar} alt={ex.username} /> : <span>{initials}</span>}
//                 </div>
//                 <div className="vg-explorer-name">{ex.username}</div>
//                 <div className="vg-explorer-count">
//                   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
//                   </svg>
//                   {ex.videoCount} video{ex.videoCount !== 1 ? 's' : ''}
//                 </div>
//                 <div className="vg-explorer-badge">🧭 Explorer</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─── Main Export: VideoGallery ─────────────────────────────────────────────── */
export default function VideoGallery() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [explorers, setExplorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = { status: 'approved' };
      if (categoryFilter) params.category = categoryFilter;
      const res = await getVideos(params);
      setVideos(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Could not connect to the server.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  useEffect(() => {
    const fetchExplorers = async () => {
      try {
        const res = await getExplorers();
        setExplorers(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        console.error('Fetch explorers error:', e);
      }
    };
    fetchExplorers();
  }, []);

  const scrollToVideos = () =>
    document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="vg-root">
      <Ticker />
      <DiscoveryGrid onFilter={setCategoryFilter} scrollToVideos={scrollToVideos} />
      <StatsStrip videos={videos} />
      <VideoSection
        videos={videos} loading={loading} error={error}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        search={search} setSearch={setSearch}
        onSelectVideo={setSelectedVideo}
      />
      {/* <LocalExplorers explorers={explorers} /> */}

      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
}
