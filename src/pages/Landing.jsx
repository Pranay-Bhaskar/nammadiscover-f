import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import './Home.css';

/* ── tiny scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ── animated counter ── */
function useCounter(target, active, duration = 1800) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = target / (duration / 16);
        const id = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(id); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(id);
    }, [active, target, duration]);
    return val;
}

/* ══ DATA ══════════════════════════════════════════════════════════ */
const SPOTS = [
    { emoji: '🏯', tag: 'Heritage', title: 'Hampi Ruins', sub: 'Vijayanagara, Ballari', desc: 'A UNESCO World Heritage City — 1500s empire frozen in stone. Explore 1,600 monuments across a surreal boulder landscape.', gradient: 'linear-gradient(145deg,#b85c0a,#7c3205)', verified: true, rating: 4.9 },
    { emoji: '🌊', tag: 'Nature', title: 'Jog Falls', sub: 'Shivamogga', desc: "India's second-highest plunge waterfall. Locals know the hidden trail to the misty base that no tourist guide mentions.", gradient: 'linear-gradient(145deg,#1a6b4a,#093d28)', verified: true, rating: 4.8 },
    { emoji: '☕', tag: 'Food', title: 'Coorg Plantations', sub: 'Kodagu', desc: 'Family-run coffee estates where they pour freshly brewed estate coffee before you\'ve even checked in. No filters — literal or figurative.', gradient: 'linear-gradient(145deg,#6b3a1a,#3d1e09)', verified: true, rating: 5.0 },
    { emoji: '🛕', tag: 'Temples', title: 'Belur & Halebidu', sub: 'Hassan District', desc: '12th-century Hoysala temples with 1,000+ sculptures carved without mortar. Each panel is a story waiting for a local to tell it.', gradient: 'linear-gradient(145deg,#c8652a,#7a3210)', verified: true, rating: 4.9 },
    { emoji: '🎭', tag: 'Culture', title: 'Yakshagana Show', sub: 'Udupi / Dharwad', desc: 'Ancient dance-drama merging music, costume and folklore — performed overnight in village courtyards, not on a tourist stage.', gradient: 'linear-gradient(145deg,#8b1a1a,#4a0d0d)', verified: false, rating: 4.7 },
    { emoji: '🏝️', tag: 'Nature', title: 'Murudeshwar Shore', sub: 'Uttara Kannada', desc: 'Beyond the famous Shiva statue is a quiet shoreline where fishermen dry nets at dawn and nobody else is around.', gradient: 'linear-gradient(145deg,#0d4f6b,#072d3d)', verified: true, rating: 4.8 },
];

const TESTIMONIALS = [
    { name: 'Priya Nair', city: 'Bengaluru → Coorg', text: 'NammaDiscover changed how I travel. I met a coffee farmer who invited us to his family dinner. That evening was worth more than any resort stay.', rating: 5, avatar: '👩' },
    { name: 'Arjun Hegde', city: 'Mumbai → Hampi', text: "My guide Ravi showed me cave temples not on any map. Zero tourists, pure magic. I've used a dozen travel apps — none come close to this.", rating: 5, avatar: '👨' },
    { name: 'Divya Krishnamurthy', city: 'Hyderabad → Hassan', text: 'The bilingual listing for Belur was incredible — Kannada descriptions unlocked stories the English ones missed entirely. Masterpiece of a product.', rating: 5, avatar: '👩' },
    { name: 'Suresh Patil', city: 'Pune → Dharwad', text: 'NammaBot told me about a Yakshagana performance in a village 12 km off the highway. Slept under stars afterwards. Unreal.', rating: 5, avatar: '🧑' },
];

const GUIDES = [
    { name: 'Meera Iyer', city: 'Mysuru', emoji: '👩', specialty: 'Heritage & Palace Walks', reviews: 142, trips: 89, languages: 'Kannada, English, Hindi' },
    { name: 'Ravi Gowda', city: 'Coorg', emoji: '👨', specialty: 'Coffee Estates & Forests', reviews: 98, trips: 61, languages: 'Kannada, English' },
    { name: 'Anjali Shetty', city: 'Mangaluru', emoji: '👩', specialty: 'Coastal Cuisine & Temples', reviews: 211, trips: 134, languages: 'Kannada, Tulu, English' },
    { name: 'Vinod Kumar', city: 'Hampi', emoji: '🧑', specialty: 'Ruins & Mythology', reviews: 175, trips: 110, languages: 'Kannada, English, French' },
];

const WHY_US = [
    { icon: '🧑‍🤝‍🧑', label: 'Guide Type', us: 'Verified local residents', them: 'Freelance contractors' },
    { icon: '📍', label: 'Spot Curation', us: 'Community-vetted gems', them: 'Algorithm + sponsored listings' },
    { icon: '🗣️', label: 'Language', us: 'Kannada-first, bilingual', them: 'English only' },
    { icon: '💰', label: 'Pricing', us: 'Direct, transparent, fair', them: 'Commission-heavy markups' },
    { icon: '🤖', label: 'AI', us: 'NammaBot — hyper-local AI', them: 'Generic global recommendations' },
    { icon: '📵', label: 'Offline', us: 'Full offline maps included', them: 'Requires constant data' },
];

/* ══ NAVBAR ════════════════════════════════════════════════════════ */
const Navbar = ({ t, language, setLanguage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const links = [
        { href: '#discover-section', label: t('Explore', 'ಅನ್ವೇಷಿಸಿ') },
        { href: '#how-it-works', label: t('How It Works', 'ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ') },
        { href: '#guides', label: t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು') },
        { href: '#about', label: t('About', 'ನಮ್ಮ ಬಗ್ಗೆ') },
    ];

    return (
        <nav className={`nd-nav${scrolled ? ' nd-nav--scrolled' : ''}`}>
            <div className="nd-nav__inner container">
                <Link to="/" className="nd-nav__logo">
                    <div className="nd-logo-mark">ND</div>
                    <span className="nd-logo-text">Namma<strong>Discover</strong></span>
                </Link>

                <ul className="nd-nav__links">
                    {links.map((l, i) => (
                        <li key={i}><a href={l.href} className="nd-nav__link">{l.label}</a></li>
                    ))}
                </ul>

                <div className="nd-nav__right">
                    <button className="nd-lang-btn"
                        onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}>
                        {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
                    </button>
                    <Link to="/login" className="nd-nav__signin">{t('Sign In', 'ಲಾಗಿನ್')}</Link>
                    <Link to="/login" className="nd-nav__cta">{t('Join Free', 'ಉಚಿತ ಸೇರಿ')}</Link>
                    <button className={`nd-hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            <div className={`nd-mobile-menu${menuOpen ? ' open' : ''}`}>
                {links.map((l, i) => (
                    <a key={i} href={l.href} className="nd-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
                ))}
                <Link to="/login" className="nd-mobile-cta" onClick={() => setMenuOpen(false)}>
                    {t('Join NammaDiscover Free', 'NammaDiscover ಉಚಿತ ಸೇರಿ')}
                </Link>
            </div>
        </nav>
    );
};

/* ══ FOOTER ════════════════════════════════════════════════════════ */
const Footer = ({ t }) => (
    <footer className="nd-footer">
        <div className="nd-footer__wave" aria-hidden="true">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
            </svg>
        </div>
        <div className="nd-footer__body container">
            <div className="nd-footer__brand">
                <div className="nd-footer__logo">
                    <div className="nd-logo-mark sm">ND</div>
                    <span className="nd-logo-text">Namma<strong>Discover</strong></span>
                </div>
                <p>{t('Explore Karnataka through the eyes of those who call it home.', 'ಕರ್ನಾಟಕವನ್ನು ಸ್ಥಳೀಯರ ಕಣ್ಣಿನಿಂದ ಅನ್ವೇಷಿಸಿ.')}</p>
                <div className="nd-socials">
                    {['𝕏', 'in', 'f', '▶'].map((s, i) => <a key={i} href="#" className="nd-social">{s}</a>)}
                </div>
            </div>

            {[
                { title: t('Explore', 'ಅನ್ವೇಷಿಸಿ'), links: [t('Hidden Gems', 'ರಹಸ್ಯ ತಾಣಗಳು'), t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು'), t('Heritage Sites', 'ಪಾರಂಪರಿಕ ಸ್ಥಳಗಳು'), t('Food Trails', 'ಆಹಾರ ಪ್ರಯಾಣ'), 'NammaBot AI'] },
                { title: t('Regions', 'ಪ್ರದೇಶಗಳು'), links: ['Bengaluru', 'Mysuru', 'Coorg', 'Mangaluru', 'Hampi', 'Badami', 'Dandeli'] },
                { title: t('Company', 'ಕಂಪನಿ'), links: [t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ'), t('Blog', 'ಬ್ಲಾಗ್'), t('Careers', 'ವೃತ್ತಿ'), t('Press', 'ಮಾಧ್ಯಮ'), t('Contact', 'ಸಂಪರ್ಕ')] },
            ].map((col, i) => (
                <div key={i} className="nd-footer__col">
                    <h4>{col.title}</h4>
                    {col.links.map((l, j) => <a key={j} href="#" className="nd-footer__link">{l}</a>)}
                </div>
            ))}

            <div className="nd-footer__newsletter">
                <h4>{t('Local stories in your inbox', 'ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ಸ್ಥಳೀಯ ಕಥೆಗಳು')}</h4>
                <p>{t('Weekly Karnataka dispatches. No spam, ever.', 'ಸಾಪ್ತಾಹಿಕ ಕರ್ನಾಟಕ ಸಂದೇಶಗಳು. ಸ್ಪ್ಯಾಮ್ ಇಲ್ಲ.')}</p>
                <div className="nd-newsletter-row">
                    <input type="email" placeholder={t('your@email.com', 'ನಿಮ್ಮ ಇಮೇಲ್')} className="nd-newsletter-input" />
                    <button className="nd-newsletter-btn">→</button>
                </div>
                <p className="nd-newsletter-note">8,400+ {t('Karnataka lovers already in', 'ಕರ್ನಾಟಕ ಪ್ರಿಯರು')}</p>
            </div>
        </div>
        <div className="nd-footer__bottom container">
            <p>© 2025 NammaDiscover · {t('Made with ♥ for Karnataka', 'ಕರ್ನಾಟಕಕ್ಕಾಗಿ ♥ ನಿಂದ ತಯಾರಿಸಲಾಗಿದೆ')}</p>
            <div className="nd-footer__legal">
                {[t('Privacy', 'ಗೌಪ್ಯತೆ'), t('Terms', 'ನಿಯಮಗಳು'), t('Cookies', 'ಕುಕೀಸ್')].map((l, i) => <a key={i} href="#">{l}</a>)}
            </div>
        </div>
    </footer>
);

/* ══ MAIN LANDING ══════════════════════════════════════════════════ */
const Landing = () => {
    const { state, dispatch } = useApp();
    const location = useLocation();
    const t = (en, kn) => state.language === 'en' ? en : kn;
    const setLanguage = (lang) => dispatch({ type: 'SET_LANGUAGE', payload: lang });

    const [activeCategory, setActiveCategory] = useState('All');
    const [testimonialIdx, setTestimonialIdx] = useState(0);

    const [statsRef, statsVisible] = useReveal(0.3);
    const [howRef, howVisible] = useReveal(0.1);
    const [whyRef, whyVisible] = useReveal(0.1);
    const [aboutRef, aboutVisible] = useReveal(0.1);
    const [botRef, botVisible] = useReveal(0.1);
    const [guidesRef, guidesVisible] = useReveal(0.1);
    const [featRef, featVisible] = useReveal(0.1);

    const c1 = useCounter(340, statsVisible);
    const c2 = useCounter(1200, statsVisible);
    const c3 = useCounter(28, statsVisible);
    const c4 = useCounter(96, statsVisible);

    useEffect(() => {
        const id = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' }), 300);
            window.history.replaceState({}, '');
        }
    }, [location.state]);

    const categories = ['All', t('Heritage', 'ಪಾರಂಪರಿಕ'), t('Nature', 'ಪ್ರಕೃತಿ'), t('Food', 'ಆಹಾರ'), t('Temples', 'ದೇವಾಲಯ'), t('Culture', 'ಸಂಸ್ಕೃತಿ')];
    const filteredSpots = activeCategory === 'All' ? SPOTS : SPOTS.filter(s => s.tag === activeCategory);

    return (
        <div className="home-page">
            <Navbar t={t} language={state.language} setLanguage={setLanguage} />

            {/* ══ HERO ══ */}
            <section className="hero">
                <div className="hero__grain" aria-hidden="true" />
                <div className="hero__blob hero__blob--1" aria-hidden="true" />
                <div className="hero__blob hero__blob--2" aria-hidden="true" />
                <div className="hero__blob hero__blob--3" aria-hidden="true" />
                <div className="hero__bg-kn" aria-hidden="true">ಕರ್ನಾಟಕ</div>
                <div className="hero__ring hero__ring--1" aria-hidden="true" />
                <div className="hero__ring hero__ring--2" aria-hidden="true" />
                <div className="hero__ring hero__ring--3" aria-hidden="true" />

                <div className="hero__float hero__float--1">🏯 Hampi</div>
                <div className="hero__float hero__float--2">☕ Coorg</div>
                <div className="hero__float hero__float--3">★ 4.9</div>
                <div className="hero__float hero__float--4">🛕 Belur</div>
                <div className="hero__float hero__float--5">🌿 1,200+ Locals</div>

                <div className="hero__content container">
                    <div className="hero__left">
                        <div className="badge-primary">
                            <span className="badge-dot" />
                            {t('Authenticity First · Since 2023', 'ಅಪ್ಪಟತನವೇ ಮೊದಲು · 2023 ರಿಂದ')}
                        </div>
                        <h1 className="hero__title">
                            <span className="hero__word hero__word--1">{t('Rediscover', 'ಮರುಶೋಧಿಸಿ')}</span>
                            <span className="hero__word hero__word--2 text-gradient">Karnataka</span>
                            <span className="hero__word hero__word--3 hero__italic">
                                {t('Through Local Eyes', 'ಸ್ಥಳೀಯರ ಕಣ್ಣಿನಿಂದ')}
                            </span>
                        </h1>
                        <p className="hero__subtitle">
                            {t(
                                "Escape tourist traps. Connect with family-run gems, heritage spots, and verified local guides across Karnataka's 30 districts.",
                                "ಪ್ರವಾಸಿ ಮೋಸದಿಂದ ಪಾರಾಗಿ. ಕರ್ನಾಟಕದ 30 ಜಿಲ್ಲೆಗಳ ಕುಟುಂಬ ರತ್ನಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ."
                            )}
                        </p>
                        <div className="hero__actions">
                            <Link to="/login" className="btn btn-primary btn-hero">
                                {t('Start Exploring', 'ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ')}
                                <span className="btn-arrow">→</span>
                            </Link>
                            <a href="#discover-section" className="btn btn-ghost">
                                {t('See the Spots', 'ತಾಣಗಳನ್ನು ನೋಡಿ')}
                            </a>
                        </div>
                        <div className="hero__trust">
                            <div className="trust-avatars">
                                {['🧑', '👩', '👨', '👩', '🧑'].map((e, i) => (
                                    <span key={i} className="trust-avatar">{e}</span>
                                ))}
                            </div>
                            <div>
                                <div className="trust-stars">★★★★★</div>
                                <div className="trust-label">
                                    {t('1,200+ locals sharing Karnataka', '1,200+ ಸ್ಥಳೀಯರು ಕರ್ನಾಟಕ ಹಂಚಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero__right">
                        <div className="hero__card-stack">
                            {SPOTS.slice(0, 3).map((s, i) => (
                                <div key={i} className={`hero-stack__card hero-stack__card--${i}`}
                                    style={{ background: s.gradient }}>
                                    <div className="hero-stack__emoji">{s.emoji}</div>
                                    <div className="hero-stack__title">{s.title}</div>
                                    <div className="hero-stack__sub">📍 {s.sub}</div>
                                    {s.verified && <div className="hero-stack__badge">✓ {t('Verified', 'ಪರಿಶೀಲಿಸಿದ')}</div>}
                                    <div className="hero-stack__rating">★ {s.rating}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hero__scroll-hint">
                    <div className="scroll-mouse"><div className="scroll-wheel" /></div>
                    <span>{t('scroll to discover', 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ')}</span>
                </div>
            </section>

            {/* ══ DUAL TICKER ══ */}
            <div className="ticker-outer">
                <div className="ticker-row ticker-row--fwd">
                    {[...Array(4)].flatMap((_, set) =>
                        ['🏯 Hampi', '☕ Coorg Coffee', '🌊 Jog Falls', '🛕 Belur Temples', '🎭 Yakshagana',
                            '🏔️ Kudremukh', '🎨 Channapatna Toys', '🌺 Mysore Dasara', '🐘 Dubare Reserve']
                            .map((it, i) => <span key={`f${set}-${i}`} className="ticker-item">{it}</span>)
                    )}
                </div>
                <div className="ticker-row ticker-row--rev">
                    {[...Array(4)].flatMap((_, set) =>
                        ['🌿 Nagarhole Safari', '🕌 Gol Gumbaz', '🌄 Nandi Hills', '🍀 Sakleshpur Trek',
                            '🦋 Bannerghatta', '🌸 Lalbagh Garden', '💎 Bhadra Wildlife', '🎯 Badami Caves']
                            .map((it, i) => <span key={`r${set}-${i}`} className="ticker-item ticker-item--light">{it}</span>)
                    )}
                </div>
            </div>

            {/* ══ STATS ══ */}
            <section className="stats-section container" ref={statsRef}>
                <div className="stats-grid">
                    {[
                        { val: c1, suffix: '+', label: t('Hidden Gems Listed', 'ರಹಸ್ಯ ತಾಣಗಳು'), icon: '🗺️' },
                        { val: c2, suffix: '+', label: t('Verified Locals', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳೀಯರು'), icon: '🧑‍🤝‍🧑' },
                        { val: c3, suffix: '', label: t('Districts Covered', 'ಜಿಲ್ಲೆಗಳು'), icon: '📍' },
                        { val: c4, suffix: '%', label: t('Satisfaction Rate', 'ತೃಪ್ತಿ ದರ'), icon: '⭐' },
                    ].map((s, i) => (
                        <div key={i} className={`stat-card${statsVisible ? ' stat-card--in' : ''}`}
                            style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-number">
                                {s.val}<span className="stat-suffix">{s.suffix}</span>
                            </div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ SPOTS CAROUSEL ══ */}
            <section id="discover-section" className="spots-section container">
                <div className="section-header">
                    <div>
                        <p className="section-eyebrow">{t('Curated by Locals', 'ಸ್ಥಳೀಯರಿಂದ ಆಯ್ದ')}</p>
                        <h2 className="section-title">{t('Spots Worth the Detour', 'ದಾರಿ ತಪ್ಪಿ ಹೋಗಲು ಯೋಗ್ಯ ತಾಣಗಳು')}</h2>
                    </div>
                    <Link to="/login" className="section-link">{t('View all 340+ spots →', 'ಎಲ್ಲ 340+ ತಾಣಗಳು →')}</Link>
                </div>
                <div className="category-pills">
                    {categories.map((c, i) => (
                        <button key={i}
                            className={`cat-pill${activeCategory === c ? ' active' : ''}`}
                            onClick={() => setActiveCategory(c)}>
                            {c}
                        </button>
                    ))}
                </div>
                <div className="spots-track">
                    {filteredSpots.map((spot, i) => (
                        <div key={spot.title} className="spot-card" style={{ '--i': i }}>
                            <div className="spot-card__hero" style={{ background: spot.gradient }}>
                                <div className="spot-card__emoji">{spot.emoji}</div>
                                <span className="spot-card__tag">{spot.tag}</span>
                                {spot.verified && <span className="spot-card__verified">✓ Verified</span>}
                                <div className="spot-card__rating">★ {spot.rating}</div>
                            </div>
                            <div className="spot-card__body">
                                <h3 className="spot-card__title">{spot.title}</h3>
                                <p className="spot-card__sub">📍 {spot.sub}</p>
                                <p className="spot-card__desc">{spot.desc}</p>
                                <Link to="/login" className="spot-card__cta">{t('Explore →', 'ಅನ್ವೇಷಿಸಿ →')}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ HOW IT WORKS ══ */}
            <section id="how-it-works" className="how-section" ref={howRef}>
                <div className="how-section__bg" aria-hidden="true" />
                <div className="container how-inner">
                    <div className="section-header section-header--center">
                        <p className="section-eyebrow">{t('Simple & Honest', 'ಸರಳ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ')}</p>
                        <h2 className="section-title">{t('How NammaDiscover Works', 'NammaDiscover ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ')}</h2>
                    </div>
                    <div className="how-grid">
                        {[
                            { num: '01', icon: '🔍', title: t('Discover', 'ಅನ್ವೇಷಿಸಿ'), desc: t('Browse a community-vetted map of authentic Karnataka spots — no paid placements, no fake reviews.', 'ಪಾವತಿ ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಇಲ್ಲದ ಸ್ಥಳೀಯ-ಪರಿಶೀಲಿತ ನಕ್ಷೆ ಹುಡುಕಿ.') },
                            { num: '02', icon: '🤝', title: t('Connect', 'ಸಂಪರ್ಕಿಸಿ'), desc: t('Message verified local guides and family businesses directly — zero commission, zero middleman.', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ — ಯಾವ ಕಮಿಷನ್ ಇಲ್ಲ.') },
                            { num: '03', icon: '🌟', title: t('Experience', 'ಅನುಭವಿಸಿ'), desc: t('Immerse in the real Karnataka — stories, flavours, festivals no guidebook knows.', 'ಯಾವ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕವೂ ಹೇಳದ ಕಥೆಗಳು.') },
                            { num: '04', icon: '📸', title: t('Share', 'ಹಂಚಿಕೊಳ್ಳಿ'), desc: t('Post finds, earn Explorer badges, and help the next traveller skip the tourist traps.', 'ನಿಮ್ಮ ಆವಿಷ್ಕಾರ ಹಂಚಿ ಮತ್ತು ಎಕ್ಸ್‌ಪ್ಲೋರರ್ ಬ್ಯಾಡ್ಜ್ ಗಳಿಸಿ.') },
                        ].map((step, i) => (
                            <div key={i}
                                className={`how-card${howVisible ? ' how-card--in' : ''}`}
                                style={{ '--delay': `${i * 0.15}s` }}>
                                <div className="how-card__connector" aria-hidden="true" />
                                <div className="how-card__num">{step.num}</div>
                                <div className="how-card__icon">{step.icon}</div>
                                <h3 className="how-card__title">{step.title}</h3>
                                <p className="how-card__desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ WHY CHOOSE US ══ */}
            <section className="why-section container" ref={whyRef}>
                <div className="section-header section-header--center">
                    <p className="section-eyebrow">{t('No Compromises', 'ಯಾವ ರಾಜಿಯಿಲ್ಲ')}</p>
                    <h2 className="section-title">{t('Why NammaDiscover?', 'ನಮ್ಮ ಡಿಸ್ಕವರ್ ಏಕೆ?')}</h2>
                    <p className="section-sub">{t('We built the app we always wanted when travelling Karnataka — honest, local-first, and beautifully bilingual.', 'ಕರ್ನಾಟಕ ಪ್ರಯಾಣಿಸುವಾಗ ನಾವು ಬಯಸಿದ ಆ್ಯಪ್ ನಾವೇ ನಿರ್ಮಿಸಿದೆವು.')}</p>
                </div>
                <div className="why-table">
                    <div className="why-table__head">
                        <div className="why-cell why-cell--feat" />
                        <div className="why-cell why-cell--us">
                            <div className="nd-logo-mark sm">ND</div> NammaDiscover
                        </div>
                        <div className="why-cell why-cell--them">{t('Other Apps', 'ಇತರ ಆ್ಯಪ್‌ಗಳು')}</div>
                    </div>
                    {WHY_US.map((row, i) => (
                        <div key={i}
                            className={`why-row${whyVisible ? ' why-row--in' : ''}`}
                            style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="why-cell why-cell--feat">
                                <span className="why-icon">{row.icon}</span> {row.label}
                            </div>
                            <div className="why-cell why-cell--us why-cell--yes">
                                <span className="why-check">✓</span> {row.us}
                            </div>
                            <div className="why-cell why-cell--them why-cell--no">
                                <span className="why-cross">✗</span> {row.them}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ FEATURES ══ */}
            <section id="features" className="features-section container" ref={featRef}>
                <div className="section-header section-header--center">
                    <p className="section-eyebrow">{t('Everything You Need', 'ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ')}</p>
                    <h2 className="section-title">{t('Built for Real Karnataka Travel', 'ನಿಜ ಕರ್ನಾಟಕ ಪ್ರಯಾಣಕ್ಕಾಗಿ')}</h2>
                </div>
                <div className="features-grid">
                    {[
                        { icon: '🛡️', title: t('Verified Authenticity', 'ಪರಿಶೀಲಿಸಿದ ಅಪ್ಪಟತನ'), desc: t('Every spot vetted for cultural significance and local ownership — no chains, no fakes.', 'ಪ್ರತಿ ತಾಣ ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ ಮತ್ತು ಸ್ಥಳೀಯ ಮಾಲೀಕತ್ವಕ್ಕಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.'), accent: '#c8652a' },
                        { icon: '🧭', title: t('Explorer Network', 'ಅನ್ವೇಷಕರ ಜಾಲ'), desc: t('Connect directly with locals who know the pulse of their city, district, or village.', 'ತಮ್ಮ ನಗರದ ನಾಡಿ ತಿಳಿದ ಸ್ಥಳೀಯರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ.'), accent: '#1a6b4a' },
                        { icon: '🤖', title: 'NammaBot AI', desc: t('Hyper-local AI that understands Kannada culture, festivals, and which darshini opens at 6 AM.', 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಋತುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ AI.'), accent: '#7b2d8b' },
                        { icon: '📸', title: t('Community Videos', 'ಸಮುದಾಯ ವೀಡಿಯೊಗಳು'), desc: t('Real short videos by locals — not stock footage or influencer tours. Just honest Karnataka.', 'ಸ್ಥಳೀಯರು ತೆಗೆದ ನಿಜ ವೀಡಿಯೊಗಳು — ಅಪ್ಪಟ ಕರ್ನಾಟಕ.'), accent: '#0d4f6b' },
                        { icon: '🗺️', title: t('Offline Maps', 'ಆಫ್‌ಲೈನ್ ನಕ್ಷೆಗಳು'), desc: t('Download maps that work in Coorg forests and Kodagu ghats — no data required.', 'ಕೊಡಗಿನ ಕಾಡಿನಲ್ಲೂ ಕೆಲಸ ಮಾಡುವ ಆಫ್‌ಲೈನ್ ನಕ್ಷೆಗಳು.'), accent: '#2d6b1a' },
                        { icon: '🌐', title: t('Bilingual First', 'ದ್ವಿಭಾಷಿ ಮೊದಲು'), desc: t('Every listing, review, and story in Kannada and English — Karnataka speaks both.', 'ಪ್ರತಿ ಪಟ್ಟಿ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ.'), accent: '#b85c0a' },
                    ].map((f, i) => (
                        <div key={i}
                            className={`feature-card glass-card${featVisible ? ' feature-card--in' : ''}`}
                            style={{ '--accent': f.accent, '--delay': `${i * 0.1}s` }}>
                            <div className="feature-card__icon" style={{ background: f.accent + '18', color: f.accent }}>{f.icon}</div>
                            <h3 className="feature-card__title">{f.title}</h3>
                            <p className="feature-card__desc">{f.desc}</p>
                            <div className="feature-card__bar" style={{ background: f.accent }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ ABOUT US ══ */}
            <section id="about" className="about-section" ref={aboutRef}>
                <div className="about-section__bg" aria-hidden="true" />
                <div className="container about-inner">
                    <div className={`about-text${aboutVisible ? ' about-text--in' : ''}`}>
                        <p className="section-eyebrow">{t('Our Story', 'ನಮ್ಮ ಕಥೆ')}</p>
                        <h2 className="section-title">{t('We Got Lost in Karnataka. Then We Stayed.', 'ನಾವು ಕರ್ನಾಟಕದಲ್ಲಿ ದಾರಿ ತಪ್ಪಿದೆವು. ನಂತರ ಉಳಿದೆವು.')}</h2>
                        <p className="about-p">
                            {t(
                                "NammaDiscover was born on a rainy September evening in Bengaluru, when three friends returned from Hampi frustrated that Google Maps had sent them to a tourist restaurant — instead of the dabbawala who'd been feeding stone-cutters for 40 years.",
                                "ಒಂದು ಮಳೆಯ ಸಂಜೆ, ಮೂರು ಸ್ನೇಹಿತರು ಹಂಪಿಯಿಂದ ತಿರುಗಿ ಬಂದರು — Google Maps 40 ವರ್ಷದ ದಬ್ಬಾವಾಲಾ ಬದಲು ಪ್ರವಾಸಿ ರೆಸ್ಟೋರೆಂಟ್‌ಗೆ ಕರೆದೊಯ್ದಿತ್ತು."
                            )}
                        </p>
                        <p className="about-p">
                            {t(
                                "So we built the app we always wished existed: curated by locals, spoken in Kannada, and fiercely protective of the places that make Karnataka extraordinary.",
                                "ಹೀಗೆ ನಾವು ಸ್ಥಳೀಯರಿಂದ ಕ್ಯುರೇಟ್ ಮಾಡಲ್ಪಟ್ಟ, ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುವ ಆ್ಯಪ್ ನಿರ್ಮಿಸಿದೆವು."
                            )}
                        </p>
                        <div className="about-team">
                            {['Kiran S.', 'Nandini R.', 'Aakash G.'].map((name, i) => (
                                <div key={i} className="about-member">
                                    <div className="about-member__avatar">{['👨', '👩', '🧑'][i]}</div>
                                    <span className="about-member__name">{name}</span>
                                    <span className="about-member__role">{[t('CEO', 'CEO'), t('CTO', 'CTO'), t('Design', 'ಡಿಸೈನ್')][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`about-mosaic-wrap${aboutVisible ? ' about-mosaic-wrap--in' : ''}`}>
                        <div className="about-mosaic">
                            {[
                                { emoji: '🏯', label: 'Hampi' },
                                { emoji: '🌊', label: 'Jog Falls' },
                                { emoji: '☕', label: 'Coorg' },
                                { emoji: '🛕', label: 'Belur' },
                                { emoji: '🎭', label: 'Yakshagana' },
                                { emoji: '🦁', label: 'Nagarhole' },
                            ].map((tile, i) => (
                                <div key={i} className={`mosaic-tile mosaic-tile--${i}`}>
                                    <span className="mosaic-tile__emoji">{tile.emoji}</span>
                                    <span className="mosaic-tile__label">{tile.label}</span>
                                </div>
                            ))}
                            <div className="mosaic-center">ND</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ GUIDES ══ */}
            <section id="guides" className="guides-section container" ref={guidesRef}>
                <div className="section-header">
                    <div>
                        <p className="section-eyebrow">{t('Real People', 'ನಿಜ ಜನರು')}</p>
                        <h2 className="section-title">{t('Meet Your Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು')}</h2>
                    </div>
                    <Link to="/login" className="section-link">{t('Browse all →', 'ಎಲ್ಲರನ್ನು ನೋಡಿ →')}</Link>
                </div>
                <div className="guides-grid">
                    {GUIDES.map((g, i) => (
                        <div key={i}
                            className={`guide-card${guidesVisible ? ' guide-card--in' : ''}`}
                            style={{ '--delay': `${i * 0.12}s` }}>
                            <div className="guide-card__inner">
                                <div className="guide-card__front">
                                    <div className="guide-avatar">{g.emoji}</div>
                                    <h4 className="guide-name">{g.name}</h4>
                                    <p className="guide-city">📍 {g.city}</p>
                                    <p className="guide-specialty">🎯 {g.specialty}</p>
                                    <div className="guide-stats">
                                        <div><span className="guide-stat__num">{g.reviews}</span><span className="guide-stat__lbl">{t('reviews', 'ವಿಮರ್ಶೆ')}</span></div>
                                        <div><span className="guide-stat__num">{g.trips}</span><span className="guide-stat__lbl">{t('trips', 'ಪ್ರಯಾಣ')}</span></div>
                                    </div>
                                </div>
                                <div className="guide-card__back">
                                    <div className="guide-avatar">{g.emoji}</div>
                                    <p className="guide-back__lang">🌐 {g.languages}</p>
                                    <p className="guide-back__spec">{g.specialty}</p>
                                    <Link to="/login" className="guide-back__btn">{t('Connect Now', 'ಈಗ ಸಂಪರ್ಕಿಸಿ')}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ TESTIMONIALS ══ */}
            <section className="testimonials-section">
                <div className="testimonials-section__bg" aria-hidden="true" />
                <div className="container testimonials-inner">
                    <div className="section-header section-header--center">
                        <p className="section-eyebrow">{t('Explorer Stories', 'ಅನ್ವೇಷಕರ ಕಥೆಗಳು')}</p>
                        <h2 className="section-title">{t('What Travellers Say', 'ಪ್ರಯಾಣಿಕರು ಏನು ಹೇಳುತ್ತಾರೆ')}</h2>
                    </div>
                    <div className="tm-carousel">
                        <div className="tm-track" style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
                            {TESTIMONIALS.map((tm, i) => (
                                <div key={i} className="tm-slide">
                                    <div className="tm-card glass-card">
                                        <div className="tm-stars">{'★'.repeat(tm.rating)}</div>
                                        <p className="tm-text">"{tm.text}"</p>
                                        <div className="tm-author">
                                            <span className="tm-avatar">{tm.avatar}</span>
                                            <div>
                                                <div className="tm-name">{tm.name}</div>
                                                <div className="tm-city">📍 {tm.city}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tm-dots">
                            {TESTIMONIALS.map((_, i) => (
                                <button key={i}
                                    className={`tm-dot${i === testimonialIdx ? ' active' : ''}`}
                                    onClick={() => setTestimonialIdx(i)} />
                            ))}
                        </div>
                        <div className="tm-nav">
                            <button className="tm-arrow" onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>←</button>
                            <button className="tm-arrow" onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}>→</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ NAMMABOT ══ */}
            <section className="bot-section container" ref={botRef}>
                <div className={`bot-inner${botVisible ? ' bot-inner--in' : ''}`}>
                    <div className="bot-text">
                        <span className="bot-badge">🤖 NammaBot AI</span>
                        <h2 className="bot-title">
                            {t('Ask NammaBot —', 'NammaBot ಕೇಳಿ —')}
                            <br />
                            <span className="text-gradient">{t('"Where to eat in Mysuru tonight?"', '"ಇಂದು ರಾತ್ರಿ ಮೈಸೂರಿನಲ್ಲಿ ಎಲ್ಲಿ ತಿನ್ನಲಿ?"')}</span>
                        </h2>
                        <p className="bot-desc">
                            {t(
                                "NammaBot knows the 60-year-old darshini that closes at 11 AM and the family homestay 3 km off the highway. Powered by local knowledge, not just maps.",
                                "NammaBot 60 ವರ್ಷ ಹಳೆಯ ದರ್ಶಿನಿ ಮತ್ತು ಹೆದ್ದಾರಿಯಿಂದ 3 ಕಿ.ಮೀ ಹೋಮ್‌ಸ್ಟೇ ತಿಳಿದಿದೆ."
                            )}
                        </p>
                        <div className="bot-pills">
                            {[t('Understands Kannada', 'ಕನ್ನಡ'), t('Festival-aware', 'ಹಬ್ಬ-ಅರಿವು'), t('Seasonal tips', 'ಋತು ಸಲಹೆ'), t('Works Offline', 'ಆಫ್‌ಲೈನ್')].map((f, i) =>
                                <span key={i} className="bot-pill">{f}</span>
                            )}
                        </div>
                        <Link to="/login" className="btn btn-primary btn-hero">
                            {t('Try NammaBot Free', 'NammaBot ಉಚಿತ ಪ್ರಯತ್ನ')} <span className="btn-arrow">→</span>
                        </Link>
                    </div>
                    <div className="bot-chat">
                        <div className="bot-chat__bar">
                            <span className="bot-bar__dots"><i /><i /><i /></span>
                            <span className="bot-bar__title">NammaBot</span>
                            <span className="bot-bar__status">● {t('online', 'ಆನ್‌ಲೈನ್')}</span>
                        </div>
                        <div className="bot-messages">
                            <div className="msg msg--user">{t('"Best non-touristy breakfast in Bengaluru?"', '"ಬೆಂಗಳೂರಿನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಉಪಾಹಾರ?"')}</div>
                            <div className="msg msg--bot">🍽️ {t('Try "Veena Stores" in Malleshwaram — family-run since 1936, cash only, closes 11 AM. Queue at 7.', '"ವೀಣಾ ಸ್ಟೋರ್ಸ್" — 1936 ರಿಂದ, ಬೆಳಿಗ್ಗೆ 11 ಕ್ಕೆ ಮುಚ್ಚುತ್ತದೆ.')}</div>
                            <div className="msg msg--user">{t('"Off-the-beaten path near Hampi?"', '"ಹಂಪಿ ಬಳಿ ರಹಸ್ಯ ತಾಣ?"')}</div>
                            <div className="msg msg--bot">🏯 {t('Anegundi village across the river — older than Vijayanagara itself. Coracle for ₹30. No tourists.', 'ನದಿಯ ಆಚೆ ಅನೆಗುಂದಿ — ₹30 ಕ್ಕೆ ದೋಣಿ. ಪ್ರವಾಸಿಗರಿಲ್ಲ.')}</div>
                            <div className="msg msg--bot msg--typing"><span /><span /><span /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ CTA ══ */}
            <section className="cta-section container">
                <div className="cta-container">
                    <div className="cta-grain" aria-hidden="true" />
                    <div className="cta-ring cta-ring--1" aria-hidden="true" />
                    <div className="cta-ring cta-ring--2" aria-hidden="true" />
                    <div className="cta-motif cta-motif--1" aria-hidden="true">🪔</div>
                    <div className="cta-motif cta-motif--2" aria-hidden="true">🌺</div>
                    <div className="cta-motif cta-motif--3" aria-hidden="true">🛕</div>
                    <p className="section-eyebrow" style={{ color: 'var(--primary)' }}>
                        {t('The real Karnataka awaits', 'ನಿಜ ಕರ್ನಾಟಕ ಕಾಯುತ್ತಿದೆ')}
                    </p>
                    <h2 className="cta-title">{t('Ready for an Authentic Adventure?', 'ಅಪ್ಪಟ ಸಾಹಸಕ್ಕೆ ಸಿದ್ಧರಿದ್ದೀರಾ?')}</h2>
                    <p className="cta-sub">{t('Join thousands discovering the hidden soul of Karunadu — one local story at a time.', 'ಕರುನಾಡಿನ ಗುಪ್ತ ಆತ್ಮ ಅನ್ವೇಷಿಸಲು ಸಾವಿರಾರು ಪ್ರಯಾಣಿಕರೊಂದಿಗೆ ಸೇರಿ.')}</p>
                    <div className="cta-actions">
                        <Link to="/login" className="btn btn-primary btn-lg btn-hero">
                            {t('Join NammaDiscover Free', 'NammaDiscover ಉಚಿತ ಸೇರಿ')} <span className="btn-arrow">→</span>
                        </Link>
                        <a href="#features" className="btn btn-glass btn-lg">{t('Explore Features', 'ವೈಶಿಷ್ಟ್ಯಗಳು')}</a>
                    </div>
                    <p className="cta-note">{t('Free forever · No credit card · Always local-first', 'ಯಾವಾಗಲೂ ಉಚಿತ · ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಇಲ್ಲ · ಸ್ಥಳೀಯ-ಮೊದಲು')}</p>
                </div>
            </section>

            <Footer t={t} />
        </div>
    );
};

export default Landing;