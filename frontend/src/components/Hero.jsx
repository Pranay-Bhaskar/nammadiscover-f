import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';

const particleCount = 18;

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

    // Parallax on scroll
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Mouse parallax
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

    // Typewriter
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

    // Rotating stat highlight
    useEffect(() => {
        const timer = setInterval(() => setActiveStatIdx(i => (i + 1) % 4), 2200);
        return () => clearInterval(timer);
    }, []);

    // Show/hide floating card based on viewport
    useEffect(() => {
        const toggle = () => {
            if (floatingCardRef.current) {
                floatingCardRef.current.style.display = window.innerWidth >= 900 ? 'block' : 'none';
            }
        };
        toggle();
        window.addEventListener('resize', toggle);
        return () => window.removeEventListener('resize', toggle);
    }, []);

    const stats = [
        { num: '500+', label: t('Verified Spots', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು'), icon: '📍' },
        { num: '50k+', label: t('Happy Travelers', 'ಸಂತುಷ್ಟ ಪ್ರಯಾಣಿಕರು'), icon: '😊' },
        { num: '200+', label: t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು'), icon: '🧭' },
        { num: '4.9★', label: t('Avg Rating', 'ಸರಾಸರಿ ರೇಟಿಂಗ್'), icon: '⭐' },
    ];

    const floatingOrbs = [
        { top: '15%', left: '8%', size: 320, color: 'rgba(255,107,53,0.12)', delay: 0 },
        { top: '55%', left: '75%', size: 260, color: 'rgba(124,58,237,0.10)', delay: 2 },
        { top: '75%', left: '20%', size: 180, color: 'rgba(0,212,170,0.08)', delay: 1 },
        { top: '10%', left: '60%', size: 200, color: 'rgba(255,77,109,0.07)', delay: 3 },
    ];

    const travelTags = [
        { emoji: '🏔️', text: t('Mountains', 'ಪರ್ವತಗಳು') },
        { emoji: '🏖️', text: t('Beaches', 'ಕಡಲ ತೀರ') },
        { emoji: '🏰', text: t('Forts', 'ಕೋಟೆಗಳು') },
        { emoji: '🌿', text: t('Forest', 'ಅರಣ್ಯ') },
        { emoji: '🍛', text: t('Food', 'ಆಹಾರ') },
        { emoji: '🎨', text: t('Culture', 'ಸಂಸ್ಕೃತಿ') },
    ];

    const nearbyPicks = [
        { emoji: '🏯', name: t('Bengaluru Fort', 'ಬೆಂಗಳೂರು ಕೋಟೆ'), dist: '2.1 km', tag: t('Heritage', 'ಪರಂಪರೆ') },
        { emoji: '🌿', name: t('Cubbon Park', 'ಕಬ್ಬನ್ ಪಾರ್ಕ್'), dist: '3.4 km', tag: t('Nature', 'ಪ್ರಕೃತಿ') },
        { emoji: '🍛', name: t('VV Puram Food St.', 'VV ಪುರಂ ಫುಡ್'), dist: '5.0 km', tag: t('Food', 'ಆಹಾರ') },
    ];

    return (
        <section id="hero" ref={heroRef}>
            {/* ── Video + atmosphere layer ── */}
            <div className="hero-video-wrap">
                <video
                    autoPlay muted loop playsInline key={currentCity.name}
                    style={{ transform: `translate(-50%,-50%) scale(1.08) translateY(${scrollY * 0.18}px)` }}
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay" />

                {/* Radial colour bleeds */}
                <div style={{ position:'absolute',inset:0,zIndex:2,background:'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,107,53,0.18) 0%, transparent 70%)',pointerEvents:'none' }} />
                <div style={{ position:'absolute',inset:0,zIndex:2,background:'radial-gradient(ellipse 50% 50% at 80% 30%, rgba(124,58,237,0.14) 0%, transparent 65%)',pointerEvents:'none' }} />

                {/* Ambient orbs */}
                {floatingOrbs.map((orb, i) => (
                    <div key={i} style={{
                        position:'absolute', top:orb.top, left:orb.left,
                        width:orb.size, height:orb.size, borderRadius:'50%',
                        background:`radial-gradient(circle, ${orb.color}, transparent 70%)`,
                        filter:'blur(40px)',
                        transform:`translate(${mousePos.x*(8+i*3)}px, ${mousePos.y*(6+i*2)}px)`,
                        transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                        zIndex:3, pointerEvents:'none',
                        animation:`floatOrb ${6+i*1.5}s ease-in-out infinite`,
                        animationDelay:`${orb.delay}s`,
                    }} />
                ))}

                {/* Star particles */}
                {Array.from({ length: particleCount }).map((_, i) => (
                    <div key={i} style={{
                        position:'absolute',
                        top:`${10+Math.sin(i*137.5*Math.PI/180)*40+40}%`,
                        left:`${(i/particleCount)*100}%`,
                        width: i%3===0 ? 3 : 2, height: i%3===0 ? 3 : 2,
                        borderRadius:'50%',
                        background: i%3===0 ? 'rgba(255,209,102,0.6)' : 'rgba(255,255,255,0.25)',
                        zIndex:3, pointerEvents:'none',
                        animation:`twinkle ${2+(i%4)*0.7}s ease-in-out infinite`,
                        animationDelay:`${(i*0.3)%3}s`,
                    }} />
                ))}

                {/* Subtle grid */}
                <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',zIndex:3,pointerEvents:'none',opacity:0.035 }}>
                    <defs>
                        <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heroGrid)" />
                </svg>
            </div>

            {/* ── Main hero inner ── */}
            <div className="container hero-inner">
                <div className="hero-content">

                    {/* Pill badge */}
                    <div className="hero-tag">
                        <span style={{ display:'inline-block', animation:'spin 3s linear infinite' }}>✨</span>
                        {t('Authentic Karnataka Experiences', 'ಅಪ್ಪಟ ಕರ್ನಾಟಕದ ಅನುಭವಗಳು')}
                    </div>

                    {/* H1 with animated underline */}
                    <h1 className="hero-title">
                        {t('Explore', 'ಅನ್ವೇಷಿಸಿ')}{' '}
                        <span className="highlight" style={{ position:'relative', display:'inline-block' }}>
                            {t(currentCity.name, currentCity.name)}
                            <svg viewBox="0 0 200 12" style={{ position:'absolute',bottom:-4,left:0,width:'100%',overflow:'visible' }}>
                                <defs>
                                    <linearGradient id="uGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FF6B35" />
                                        <stop offset="100%" stopColor="#FF4D6D" />
                                    </linearGradient>
                                </defs>
                                <path d="M4 8 Q50 2 100 8 Q150 14 196 6" fill="none" stroke="url(#uGrad)" strokeWidth="3" strokeLinecap="round"
                                    style={{ strokeDasharray:220, strokeDashoffset:220, animation:'drawLine 1s 0.8s ease forwards' }} />
                            </svg>
                        </span>
                        <br />{t('Like a Local', 'ಸ್ಥಳೀಯರಂತೆ')}
                    </h1>

                    {/* Typewriter subline */}
                    <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem',animation:'fadeSlideUp 0.8s 0.35s ease both' }}>
                        <span style={{ fontSize:'0.82rem',color:'rgba(255,255,255,0.45)' }}>{t('Discover','ಕಂಡುಕೊಳ್ಳಿ')} →</span>
                        <span style={{
                            fontSize:'0.9rem', fontWeight:700,
                            background:'linear-gradient(90deg,#FFD166,#FF8C42)',
                            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                            minWidth:'200px',
                        }}>
                            {typedText}
                            <span style={{ borderRight:'2px solid #FF8C42', marginLeft:1, animation:'blink 0.75s step-end infinite' }} />
                        </span>
                    </div>

                    <p className="hero-desc">{t(currentCity.overview, currentCity.overview)}</p>

                    {/* Quick-filter tags */}
                    <div style={{ display:'flex',flexWrap:'wrap',gap:'0.5rem',marginBottom:'1.5rem',animation:'fadeSlideUp 0.8s 0.5s ease both' }}>
                        {travelTags.map((tag, i) => (
                            <button key={i} style={{
                                display:'inline-flex', alignItems:'center', gap:'0.35rem',
                                padding:'0.3rem 0.85rem', borderRadius:20,
                                background:'rgba(255,255,255,0.06)',
                                border:'1px solid rgba(255,255,255,0.12)',
                                color:'rgba(240,244,255,0.8)', fontSize:'0.78rem', fontWeight:600,
                                cursor:'pointer', fontFamily:'inherit',
                                transition:'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                                backdropFilter:'blur(8px)',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.cssText += ';background:rgba(255,107,53,0.18)!important;border-color:rgba(255,107,53,0.5)!important;color:#FF8C42!important;transform:translateY(-2px)!important'; }}
                                onMouseLeave={e => { e.currentTarget.style.cssText = e.currentTarget.style.cssText.replace(/;background[^;]+!important/g,'').replace(/;border-color[^;]+!important/g,'').replace(/;color[^;]+!important/g,'').replace(/;transform[^;]+!important/g,''); }}
                            >
                                <span>{tag.emoji}</span>{tag.text}
                            </button>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="hero-ctas" style={{ animation:'fadeSlideUp 0.8s 0.6s ease both' }}>
                        <a href="#discover-section" className="btn btn-primary" style={{ position:'relative',overflow:'hidden' }}>
                            🚀 {t('Start Exploring','ಅನ್ವೇಷಣೆ ಆರಂಭಿಸಿ')}
                            <span style={{
                                position:'absolute',inset:0,
                                background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.18) 50%,transparent 100%)',
                                transform:'translateX(-100%)',
                                animation:'shimmerBtn 2.5s 1.5s ease-in-out infinite',
                            }} />
                        </a>
                        <a href="#map-section" className="btn btn-ghost">🗺️ {t('View Map','ನಕ್ಷೆ ನೋಡಿ')}</a>
                        <a href="#ai-section" className="btn" style={{
                            background:'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(0,212,170,0.2))',
                            border:'1px solid rgba(124,58,237,0.4)', color:'#fff', backdropFilter:'blur(8px)',
                        }}>
                            🤖 {t('AI Picks','AI ಆಯ್ಕೆಗಳು')}
                        </a>
                    </div>

                    {/* Radius */}
                    <div className="hero-radius-wrap" style={{ animation:'fadeSlideUp 0.8s 0.7s ease both' }}>
                        <label>{t('Search Radius','ಹುಡುಕಾಟದ ವ್ಯಾಪ್ತಿ')}:</label>
                        <input type="range" min="5" max="100" value={radius}
                            onChange={(e) => setRadius(e.target.value)} id="radius-slider" />
                        <span id="radius-val">{radius} km</span>
                    </div>

                    {/* Animated stats */}
                    <div className="hero-stats" style={{ animation:'fadeSlideUp 0.8s 0.8s ease both' }}>
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item" style={{
                                position:'relative', padding:'0.75rem 1rem', borderRadius:12,
                                transition:'all 0.4s ease',
                                background: activeStatIdx===i ? 'rgba(255,107,53,0.12)' : 'transparent',
                                border: `1px solid ${activeStatIdx===i ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
                            }}>
                                <div style={{ fontSize:'1.1rem', marginBottom:'0.1rem' }}>{s.icon}</div>
                                <div className="hero-stat-num">{s.num}</div>
                                <div className="hero-stat-label">{s.label}</div>
                                {activeStatIdx===i && (
                                    <div style={{ position:'absolute',bottom:0,left:'10%',right:'10%',height:2,background:'linear-gradient(90deg,#FF6B35,#FF4D6D)',borderRadius:2 }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Floating info card (desktop) ── */}
                <div ref={floatingCardRef} style={{
                    position:'absolute', right:'2rem', top:'50%', display:'none',
                    transform:`translateY(-50%) translate(${mousePos.x*-6}px,${mousePos.y*-4}px)`,
                    transition:'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                    zIndex:5, animation:'fadeSlideUp 1s 0.9s ease both',
                }}>
                    <div style={{
                        width:280, background:'rgba(8,13,26,0.72)',
                        border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'1.5rem',
                        backdropFilter:'blur(24px)',
                        boxShadow:'0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}>
                        {/* Mini map */}
                        <div style={{
                            height:110, borderRadius:12, marginBottom:'1rem', overflow:'hidden',
                            background:'linear-gradient(135deg,rgba(0,212,170,0.15),rgba(124,58,237,0.2))',
                            border:'1px solid rgba(255,255,255,0.08)',
                            display:'flex', alignItems:'center', justifyContent:'center', position:'relative',
                        }}>
                            <svg viewBox="0 0 200 100" style={{ width:'100%',height:'100%',position:'absolute',inset:0,opacity:0.5 }}>
                                <path d="M20,80 Q60,20 100,50 Q140,80 180,30" fill="none" stroke="#FF6B35" strokeWidth="2" strokeDasharray="4,4" />
                                <circle cx="20" cy="80" r="5" fill="#FF6B35" /><circle cx="100" cy="50" r="4" fill="#FFD166" /><circle cx="180" cy="30" r="5" fill="#00D4AA" />
                            </svg>
                            <span style={{ fontSize:'2rem',zIndex:1 }}>🗺️</span>
                        </div>

                        <div style={{ fontSize:'0.72rem',color:'rgba(255,255,255,0.4)',marginBottom:'0.6rem',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase' }}>
                            {t('Top Picks Near You','ನಿಮ್ಮ ಬಳಿ ಉತ್ತಮ ಆಯ್ಕೆಗಳು')}
                        </div>

                        {nearbyPicks.map((item, i) => (
                            <div key={i} style={{
                                display:'flex', alignItems:'center', gap:'0.65rem',
                                padding:'0.6rem 0.75rem', borderRadius:10, marginBottom:'0.4rem',
                                background:'rgba(255,255,255,0.04)',
                                border:'1px solid rgba(255,255,255,0.07)',
                                cursor:'pointer', transition:'all 0.22s ease',
                            }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style,{ background:'rgba(255,107,53,0.1)',borderColor:'rgba(255,107,53,0.25)',transform:'translateX(4px)' })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style,{ background:'rgba(255,255,255,0.04)',borderColor:'rgba(255,255,255,0.07)',transform:'translateX(0)' })}
                            >
                                <span style={{ fontSize:'1.25rem' }}>{item.emoji}</span>
                                <div style={{ flex:1 }}>
                                    <div style={{ fontSize:'0.8rem',fontWeight:600,color:'#F0F4FF' }}>{item.name}</div>
                                    <div style={{ fontSize:'0.68rem',color:'rgba(255,255,255,0.38)' }}>{item.dist}</div>
                                </div>
                                <span style={{ fontSize:'0.63rem',fontWeight:700,padding:'0.15rem 0.5rem',borderRadius:8,background:'rgba(0,212,170,0.15)',color:'#00D4AA' }}>{item.tag}</span>
                            </div>
                        ))}

                        {/* Mini weather */}
                        <div style={{
                            marginTop:'0.85rem', padding:'0.7rem', borderRadius:12,
                            background:'linear-gradient(135deg,rgba(255,107,53,0.12),rgba(255,77,109,0.08))',
                            border:'1px solid rgba(255,107,53,0.2)',
                            display:'flex', alignItems:'center', justifyContent:'space-between',
                        }}>
                            <div>
                                <div style={{ fontSize:'0.65rem',color:'rgba(255,255,255,0.38)',fontWeight:700,letterSpacing:'1px' }}>
                                    {t('TODAY','ಇಂದು')} • {currentCity.name}
                                </div>
                                <div style={{ fontSize:'0.8rem',fontWeight:700,color:'#F0F4FF',marginTop:2 }}>
                                    ⛅ {t('Great day to explore!','ಅನ್ವೇಷಣೆಗೆ ಉತ್ತಮ ದಿನ!')}
                                </div>
                            </div>
                            <div style={{ fontSize:'1.5rem',fontWeight:800,color:'#FFD166' }}>26°</div>
                        </div>
                    </div>
                </div>

                {/* Know More */}
                <button className="hero-know-more-btn" onClick={() => setShowPanel(!showPanel)}>
                    ℹ️ {t('Know More About','ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ')} {currentCity.name}
                </button>

                {/* Location panel */}
                <div className={`location-summary-panel ${showPanel ? 'open' : ''}`}>
                    <h3 className="lsp-title">{currentCity.name}</h3>
                    <p className="lsp-subtitle">{t('Quick Overview','ತ್ವರಿತ ಅವಲೋಕನ')}</p>
                    <ul className="lsp-highlights">
                        {currentCity.highlights?.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                    <div className="lsp-best-time">🕒 {t('Best Time','ಅತ್ಯುತ್ತಮ ಸಮಯ')}: {currentCity.bestTime}</div>
                    <button className="btn btn-xs btn-primary w-full" onClick={() => setShowPanel(false)}>
                        {t('Close','ಮುಚ್ಚಿ')}
                    </button>
                </div>
            </div>

            {/* ── Search bar ── */}
            <div className="hero-search-wrap">
                <div className="hero-search">
                    <span style={{ fontSize:'1.1rem' }}>🔍</span>
                    <input type="text" placeholder={t('Search for "CTR Dosa" or "Hampi"...', '"CTR ದೋಸೆ" ಅಥವಾ "ಹಂಪಿ" ಎಂದು ಹುಡುಕಿ...')} />
                    <div className="divider" />
                    <select value={state.currentCity} onChange={(e) => dispatch({ type:'SET_CITY', payload:e.target.value })}>
                        {state.cities?.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                    <div className="divider" />
                    <div style={{ display:'flex',gap:'0.3rem',alignItems:'center' }}>
                        {['🏛️','🍜','🏕️'].map((emoji, i) => (
                            <button key={i} style={{
                                background:'rgba(255,107,53,0.1)', border:'1px solid rgba(255,107,53,0.2)',
                                borderRadius:'50%', width:30, height:30, cursor:'pointer',
                                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem',
                                transition:'all 0.2s', fontFamily:'inherit',
                            }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style,{ background:'rgba(255,107,53,0.25)',transform:'scale(1.12)' })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style,{ background:'rgba(255,107,53,0.1)',transform:'scale(1)' })}
                            >{emoji}</button>
                        ))}
                    </div>
                    <button className="btn btn-primary">{t('Search','ಹುಡುಕಿ')}</button>
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes floatOrb {
                    0%,100%{transform:translateY(0)scale(1)}
                    50%{transform:translateY(-22px)scale(1.05)}
                }
                @keyframes twinkle {
                    0%,100%{opacity:.2;transform:scale(1)}
                    50%{opacity:.9;transform:scale(1.6)}
                }
                @keyframes blink {
                    0%,100%{opacity:1}50%{opacity:0}
                }
                @keyframes spin {
                    0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}
                }
                @keyframes drawLine {
                    to{stroke-dashoffset:0}
                }
                @keyframes shimmerBtn {
                    0%{transform:translateX(-100%)}
                    100%{transform:translateX(200%)}
                }
            `}</style>
        </section>
    );
};

export default Hero;