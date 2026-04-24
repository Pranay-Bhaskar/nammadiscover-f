import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import heroVideo from '../assets/bg video.mp4';

const particleCount = 25; // Increased for richer atmosphere

const Hero = () => {
    const { state, dispatch } = useApp();
    const [radius, setRadius] = useState(50);
    const [showPanel, setShowPanel] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeStatIdx, setActiveStatIdx] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [typeIdx, setTypeIdx] = useState(0);
    const [phaseIdx, setPhaseIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const heroRef = useRef(null);
    const floatingCardRef = useRef(null);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const currentCity = state.cities?.find(c => c.slug === state.currentCity) || {
        name: 'Karnataka',
        overview: 'Discover the hidden gems of the Karunadu.',
        highlights: ['Culture', 'Heritage', 'Nature'],
        bestTime: 'Year-round'
    };

    const phrases = [
        t('Hidden Waterfalls', 'ಅಡಗಿದ ಜಲಪಾತಗಳು'),
        t('Ancient Temples', 'ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳು'),
        t('Local Street Food', 'ಸ್ಥಳೀಯ ಬೀದಿ ಆಹಾರ'),
        t('Secret Trails', 'ರಹಸ್ಯ ಮಾರ್ಗಗಳು'),
    ];

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onMove = (e) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    useEffect(() => {
        const phrase = phrases[phaseIdx];
        const speed = isDeleting ? 40 : 90;
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setTypedText(phrase.slice(0, typeIdx + 1));
                if (typeIdx + 1 === phrase.length) {
                    setTimeout(() => setIsDeleting(true), 1400);
                } else {
                    setTypeIdx(i => i + 1);
                }
            } else {
                setTypedText(phrase.slice(0, typeIdx - 1));
                if (typeIdx - 1 === 0) {
                    setIsDeleting(false);
                    setPhaseIdx(p => (p + 1) % phrases.length);
                    setTypeIdx(0);
                } else {
                    setTypeIdx(i => i - 1);
                }
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [typeIdx, isDeleting, phaseIdx]);

    useEffect(() => {
        const timer = setInterval(() => setActiveStatIdx(i => (i + 1) % 4), 2800);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        { num: '500+', label: t('Verified Spots', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
        { num: '50k+', label: t('Happy Travelers', 'ಸಂತುಷ್ಟ ಪ್ರಯಾಣಿಕರು'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
        { num: '200+', label: t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> },
        { num: '4.9★', label: t('Avg Rating', 'ಸರಾಸರಿ ರೇಟಿಂಗ್'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
    ];

    return (
        <section id="hero" ref={heroRef} className="premium-hero">
            <style>{`
                :root {
                    --accent-gold: #FFD166;
                    --accent-orange: #FF6B35;
                    --glass-bg: rgba(255, 255, 255, 0.03);
                    --glass-border: rgba(255, 255, 255, 0.1);
                    --text-main: #FFFFFF;
                    --text-dim: rgba(255, 255, 255, 0.6);
                }

                .premium-hero {
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    background: #050505;
                    font-family: 'Inter', -apple-system, sans-serif;
                    color: var(--text-main);
                }

                .hero-video-wrap {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }

                .hero-video-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);
                    z-index: 2;
                }

                .hero-inner {
                    position: relative;
                    z-index: 10;
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    padding-top: 12vh;
                    align-items: center;
                }

                .hero-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    color: var(--accent-gold);
                }

                .hero-title {
                    font-size: clamp(3rem, 6vw, 5.5rem);
                    line-height: 1.05;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    letter-spacing: -2px;
                }

                .hero-title .highlight {
                    background: linear-gradient(120deg, var(--accent-orange), #FF4D6D);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-desc {
                    font-size: 1.2rem;
                    color: var(--text-dim);
                    max-width: 550px;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .hero-ctas {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .btn-premium {
                    padding: 16px 32px;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .btn-primary-glow {
                    background: var(--accent-orange);
                    color: white;
                    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
                }

                .btn-primary-glow:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.5);
                }

                .btn-glass {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    color: white;
                }

                .btn-glass:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.3);
                }

                .hero-search-bar {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 8px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    max-width: 800px;
                    margin-top: 2rem;
                }

                .search-input-group {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-left: 15px;
                }

                .search-input-group input {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 100%;
                    outline: none;
                    font-size: 1rem;
                }

                .search-select {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--glass-border);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 12px;
                    outline: none;
                }

                .hero-stats {
                    display: flex;
                    gap: 2rem;
                    margin-top: 4rem;
                }

                .stat-card {
                    padding: 20px;
                    border-radius: 16px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    flex: 1;
                }

                .stat-card.active {
                    background: rgba(255, 107, 53, 0.05);
                    border-color: rgba(255, 107, 53, 0.4);
                    transform: translateY(-5px);
                }

                .stat-card svg {
                    color: var(--accent-orange);
                    margin-bottom: 12px;
                }

                .stat-num {
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: block;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--text-dim);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                @keyframes floatOrb {
                    0%,100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 20px) scale(1.1); }
                }

                @media (max-width: 1024px) {
                    .hero-inner { grid-template-columns: 1fr; padding-top: 15vh; }
                    .floating-visuals { display: none; }
                }
            `}</style>

            <div className="hero-video-wrap">
                <video
                    autoPlay muted loop playsInline
                    style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '100%', height: '100%', objectFit: 'cover',
                        transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})`,
                        zIndex: 1, filter: 'brightness(0.8) contrast(1.1)'
                    }}
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="hero-video-overlay" />
            </div>

            {/* Ambient Background Blur Elements */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%',
                width: '40vw', height: '40vw', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: 3, animation: 'floatOrb 10s infinite'
            }} />

            <div className="container hero-inner">
                <div className="hero-content">
                    <div className="hero-tag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {t('Premium Karnataka Experiences', 'ಪ್ರೀಮಿಯಂ ಕರ್ನಾಟಕ ಅನುಭವಗಳು')}
                    </div>

                    <h1 className="hero-title">
                        {t('Explore', 'ಅನ್ವೇಷಿಸಿ')}{' '}
                        <span className="highlight">
                            {t(currentCity.name, currentCity.name)}
                        </span>
                        <br />
                        {t('Like a Insider', 'ಒಬ್ಬ ಸ್ಥಳೀಯರಂತೆ')}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                            {typedText}
                            <span style={{ borderRight: '2px solid var(--accent-gold)', marginLeft: 2, animation: 'blink 0.8s infinite' }} />
                        </span>
                    </div>

                    <p className="hero-desc">{t(currentCity.overview, currentCity.overview)}</p>

                    <div className="hero-ctas">
                        <a href="#discover-section" className="btn-premium btn-primary-glow">
                            {t('Start Exploring', 'ಅನ್ವೇಷಣೆ ಆರಂಭಿಸಿ')}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>
                        <a href="#ai-section" className="btn-premium btn-glass">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93"/></svg>
                            {t('AI Itinerary', 'AI ಪ್ರವಾಸ ಯೋಜನೆ')}
                        </a>
                    </div>

                    {/* Integrated Premium Search */}
                    <div className="hero-search-bar">
                        <div className="search-input-group">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input type="text" placeholder={t('Where to next?', 'ಮುಂದಿನ ತಾಣ ಯಾವುದು?')} />
                        </div>
                        <select className="search-select" value={state.currentCity} onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })}>
                            {state.cities?.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                        </select>
                        <button className="btn-premium btn-primary-glow" style={{ padding: '10px 20px' }}>
                            {t('Search', 'ಹುಡುಕಿ')}
                        </button>
                    </div>

                    <div className="hero-stats">
                        {stats.map((s, i) => (
                            <div key={i} className={`stat-card ${activeStatIdx === i ? 'active' : ''}`}>
                                {s.icon}
                                <span className="stat-num">{s.num}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Visual Panel (Desktop Only) */}
                <div ref={floatingCardRef} className="floating-visuals" style={{
                    transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
                    transition: 'transform 0.4s ease-out'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(30px)',
                        padding: '30px',
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{ marginBottom: '20px', borderRadius: '20px', overflow: 'hidden', height: '200px', position: 'relative' }}>
                             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, var(--accent-orange), #7C3AED)', opacity: 0.2 }} />
                             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke="var(--accent-gold)" strokeWidth="0.5" opacity="0.3" />
                             </svg>
                             <div style={{ position: 'absolute', bottom: '15px', left: '15px' }}>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Current Discoveries</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentCity.name} Peaks</div>
                             </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {currentCity.highlights?.map((h, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
