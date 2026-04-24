import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import heroVideo from '../assets/bg video.mp4';

const particleCount = 25; // Increased for more "sparkle"

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
        const timer = setInterval(() => setActiveStatIdx(i => (i + 1) % 4), 2200);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const toggle = () => {
            if (floatingCardRef.current) {
                floatingCardRef.current.style.display = window.innerWidth >= 1024 ? 'block' : 'none';
            }
        };
        toggle();
        window.addEventListener('resize', toggle);
        return () => window.removeEventListener('resize', toggle);
    }, []);

    // PREMIUM SVG ICONS
    const Icons = {
        Verified: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        Compass: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
        Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
        Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
        Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
    };

    const stats = [
        { num: '500+', label: t('Verified Spots', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು'), icon: <Icons.Verified /> },
        { num: '50k+', label: t('Happy Travelers', 'ಸಂತುಷ್ಟ ಪ್ರಯಾಣಿಕರು'), icon: <Icons.Users /> },
        { num: '200+', label: t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು'), icon: <Icons.Compass /> },
        { num: '4.9', label: t('Avg Rating', 'ಸರಾಸರಿ ರೇಟಿಂಗ್'), icon: <Icons.Star /> },
    ];

    const travelTags = [
        { icon: '🏔️', text: t('Mountains', 'ಪರ್ವತಗಳು') },
        { icon: '🏖️', text: t('Beaches', 'ಕಡಲ ತೀರ') },
        { icon: '🏰', text: t('Forts', 'ಕೋಟೆಗಳು') },
        { icon: '🌿', text: t('Forest', 'ಅರಣ್ಯ') },
        { icon: '🍛', text: t('Food', 'ಆಹಾರ') },
    ];

    const nearbyPicks = [
        { name: t('Bengaluru Fort', 'ಬೆಂಗಳೂರು ಕೋಟೆ'), dist: '2.1 km', tag: 'Heritage' },
        { name: t('Cubbon Park', 'ಕಬ್ಬನ್ ಪಾರ್ಕ್'), dist: '3.4 km', tag: 'Nature' },
        { name: t('VV Puram Food St.', 'VV ಪುರಂ ಫುಡ್'), dist: '5.0 km', tag: 'Food' },
    ];

    return (
        <section id="hero" ref={heroRef} className="premium-hero-container">
            {/* ── OVERRIDDEN STYLES ── */}
            <style>{`
                .premium-hero-container {
                    position: relative;
                    overflow: hidden;
                    min-height: 100vh;
                    background: #020617;
                    font-family: 'Inter', -apple-system, sans-serif;
                }

                .hero-video-wrap video {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform: translate(-50%, -50%) scale(1.1);
                    filter: saturate(1.2) brightness(0.6);
                    z-index: 1;
                }

                .hero-overlay-master {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    background: radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%),
                                linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, #020617 95%);
                }

                .hero-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 8px 16px;
                    border-radius: 100px;
                    color: #94a3b8;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    margin-bottom: 24px;
                    transition: 0.3s;
                }

                .hero-tag:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #FF6B35;
                    color: #fff;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 800;
                    line-height: 1.1;
                    color: #f8fafc;
                    margin-bottom: 20px;
                }

                .highlight {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.2);
                    background: linear-gradient(90deg, #FF6B35, #FF4D6D);
                    -webkit-background-clip: text;
                    background-clip: text;
                    position: relative;
                }

                .hero-desc {
                    max-width: 600px;
                    font-size: 18px;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 32px;
                }

                /* GLASS SEARCH BOX */
                .premium-search-box {
                    display: flex;
                    align-items: center;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 10px;
                    border-radius: 20px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                    max-width: 900px;
                    width: 95%;
                    margin: 0 auto;
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .premium-search-box:focus-within {
                    border-color: rgba(255, 107, 53, 0.4);
                    transform: translateY(-5px);
                }

                .search-input-wrap {
                    display: flex;
                    align-items: center;
                    flex: 2;
                    padding-left: 15px;
                    gap: 12px;
                }

                .search-input-wrap input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #fff;
                    width: 100%;
                    font-size: 15px;
                }

                .premium-divider {
                    width: 1px;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                    margin: 0 15px;
                }

                .city-select {
                    background: transparent;
                    border: none;
                    color: #cbd5e1;
                    font-weight: 600;
                    cursor: pointer;
                    outline: none;
                }

                .premium-btn-main {
                    background: linear-gradient(135deg, #FF6B35, #FF4D6D);
                    color: white;
                    padding: 12px 28px;
                    border-radius: 14px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);
                }

                .premium-btn-main:hover {
                    transform: scale(1.05);
                    box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
                }

                /* FLOATING INFO CARD */
                .premium-card {
                    background: linear-gradient(165deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(30px);
                    border-radius: 24px;
                    padding: 24px;
                    width: 320px;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                }

                .pick-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    border-radius: 12px;
                    transition: 0.2s;
                    margin-bottom: 8px;
                    background: rgba(255, 255, 255, 0.03);
                }

                .pick-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    transform: translateX(5px);
                }

                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -30px) scale(1.1); }
                }

                @keyframes drawLine {
                    to { stroke-dashoffset: 0; }
                }

                @media (max-width: 768px) {
                    .premium-search-box { flex-direction: column; gap: 15px; padding: 20px; }
                    .premium-divider { display: none; }
                    .search-input-wrap { width: 100%; padding: 0; }
                    .city-select { width: 100%; text-align: center; }
                }
            `}</style>

            {/* ── Background Layer ── */}
            <div className="hero-video-wrap">
                <video autoPlay muted loop playsInline style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)` }}>
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="hero-overlay-master" />
            </div>

            {/* ── Main Layout ── */}
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '10vh' }}>
                <div className="hero-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    
                    {/* Left Content */}
                    <div className="hero-content">
                        <div className="hero-tag">
                            <Icons.Sparkle />
                            {t('PREMIUM TRAVEL EXPERIENCES', 'ಅಪ್ಪಟ ಕರ್ನಾಟಕದ ಅನುಭವಗಳು')}
                        </div>

                        <h1 className="hero-title">
                            {t('Discover', 'ಅನ್ವೇಷಿಸಿ')}{' '}
                            <span className="highlight">
                                {currentCity.name}
                                <svg viewBox="0 0 200 12" style={{ position: 'absolute', bottom: -10, left: 0, width: '100%', opacity: 0.8 }}>
                                    <path d="M4 8 Q50 2 100 8 Q150 14 196 6" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 220, strokeDashoffset: 220, animation: 'drawLine 1.5s forwards' }} />
                                </svg>
                            </span>
                            <br />
                            <span style={{ fontWeight: 300 }}>{t('Like Never Before', 'ಹೊಸ ದೃಷ್ಟಿಕೋನದಲ್ಲಿ')}</span>
                        </h1>

                        <p className="hero-desc">{t(currentCity.overview, currentCity.overview)}</p>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                            <button className="premium-btn-main">
                                {t('Start Journey', 'ಪ್ರಯಾಣ ಆರಂಭಿಸಿ')}
                            </button>
                            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px 24px', borderRadius: '14px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                {t('View Map', 'ನಕ್ಷೆ ನೋಡಿ')}
                            </button>
                        </div>

                        {/* Interactive Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '600px' }}>
                            {stats.map((s, i) => (
                                <div key={i} style={{ opacity: activeStatIdx === i ? 1 : 0.4, transition: '0.4s', textAlign: 'left' }}>
                                    <div style={{ color: '#FF6B35', marginBottom: '5px' }}>{s.icon}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{s.num}</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Floating Card */}
                    <div ref={floatingCardRef} className="premium-card">
                        <div style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '2px', color: '#FF6B35', fontWeight: 800, marginBottom: '15px' }}>
                            {t('NEARBY GEMS', 'ನಿಮ್ಮ ಸುತ್ತಲಿನ ಸ್ಥಳಗಳು')}
                        </div>
                        {nearbyPicks.map((item, i) => (
                            <div key={i} className="pick-item">
                                <div>
                                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{item.name}</div>
                                    <div style={{ color: '#64748b', fontSize: '12px' }}>{item.dist} away</div>
                                </div>
                                <div style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>
                                    {item.tag}
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Weather Today</div>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>26°C <span style={{ fontSize: '14px', fontWeight: 400, color: '#FFD166' }}>Partly Cloudy</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Search Bar Floating Footer ── */}
            <div style={{ position: 'absolute', bottom: '40px', width: '100%', zIndex: 100 }}>
                <div className="premium-search-box">
                    <div className="search-input-wrap">
                        <Icons.Search />
                        <input type="text" placeholder={t('Where to next? Try "Hampi"...', 'ನಿಮ್ಮ ಮುಂದಿನ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?')} />
                    </div>
                    <div className="premium-divider" />
                    <div style={{ padding: '0 15px' }}>
                        <select className="city-select" value={state.currentCity} onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })}>
                            {state.cities?.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="premium-divider" />
                    <button className="premium-btn-main" style={{ padding: '10px 30px' }}>
                        {t('Explore', 'ಹುಡುಕಿ')}
                    </button>
                </div>
            </div>

            {/* Ambient Background Elements */}
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 3, animation: 'floatOrb 10s infinite' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 3, animation: 'floatOrb 15s infinite reverse' }} />
        </section>
    );
};

export default Hero;
