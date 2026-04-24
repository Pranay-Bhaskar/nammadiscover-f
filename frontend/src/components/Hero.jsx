import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import './Hero.module.css';

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
    const [userLocation, setUserLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [suggestionCards, setSuggestionCards] = useState([]);
    
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

    // Typewriter effect
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
    }, [typeIdx, isDeleting, phaseIdx, phrases]);

    // Rotating stat highlight
    useEffect(() => {
        const timer = setInterval(() => setActiveStatIdx(i => (i + 1) % 4), 2200);
        return () => clearInterval(timer);
    }, []);

    // Geolocation detection
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => console.log('Geolocation not available:', error)
            );
        }
    }, []);

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            if (userLocation) {
                try {
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lng}&current=temperature_2m,weather_code&timezone=auto`
                    );
                    const data = await response.json();
                    setWeather({
                        temp: data.current.temperature_2m,
                        code: data.current.weather_code
                    });
                } catch (error) {
                    console.log('Weather fetch failed:', error);
                }
            }
        };
        fetchWeather();
    }, [userLocation]);

    // Generate dynamic suggestions based on weather
    useEffect(() => {
        const generateSuggestions = () => {
            const suggestions = {
                all: [
                    { id: 1, name: t('Mullayanagiri Peak', 'ಮುಳ್ಳೈಯನಗಿರಿ ಶಿಖರ'), category: 'nature', image: '🏔️', rating: 4.8, distance: '45 km' },
                    { id: 2, name: t('Shravanabelagola', 'ಶ್ರವಣಬೆಳಗೋಳ'), category: 'culture', image: '🗿', rating: 4.6, distance: '52 km' },
                    { id: 3, name: t('Chickballapur Fort', 'ಚಿಕ್ಕ ಬಾಲ್ಲಾಪುರ ಕೋಟೆ'), category: 'heritage', image: '🏯', rating: 4.5, distance: '38 km' },
                    { id: 4, name: t('Nanjanagudu Market', 'ನಂಜನಾಗೂಢ ಮಾರ್ಕೆಟ್'), category: 'food', image: '🍛', rating: 4.7, distance: '28 km' },
                ],
                nature: [
                    { id: 1, name: t('Mullayanagiri Peak', 'ಮುಳ್ಳೈಯನಗಿರಿ ಶಿಖರ'), category: 'nature', image: '🏔️', rating: 4.8, distance: '45 km' },
                    { id: 5, name: t('Jog Falls', 'ಜೋಗ್ ಜಲಪಾತ'), category: 'nature', image: '💧', rating: 4.9, distance: '62 km' },
                ],
                food: [
                    { id: 4, name: t('Nanjanagudu Market', 'ನಂಜನಾಗೂಢ ಮಾರ್ಕೆಟ್'), category: 'food', image: '🍛', rating: 4.7, distance: '28 km' },
                    { id: 6, name: t('CTR Dosa House', 'CTR ದೋಸೆ ಹೌಸ್'), category: 'food', image: '🥘', rating: 4.9, distance: '8 km' },
                ],
                culture: [
                    { id: 2, name: t('Shravanabelagola', 'ಶ್ರವಣಬೆಳಗೋಳ'), category: 'culture', image: '🗿', rating: 4.6, distance: '52 km' },
                    { id: 7, name: t('Virakumar Temple', 'ವೀರಕುಮಾರ ದೇವಾಲಯ'), category: 'culture', image: '🏛️', rating: 4.4, distance: '35 km' },
                ],
                heritage: [
                    { id: 3, name: t('Chickballapur Fort', 'ಚಿಕ್ಕ ಬಾಲ್ಲಾಪುರ ಕೋಟೆ'), category: 'heritage', image: '🏯', rating: 4.5, distance: '38 km' },
                    { id: 8, name: t('Bengaluru Fort', 'ಬೆಂಗಳೂರು ಕೋಟೆ'), category: 'heritage', image: '🏰', rating: 4.3, distance: '2 km' },
                ]
            };

            // Weather-based recommendations
            if (weather && weather.code === 80 || weather?.code === 81) { // Rainy
                setSuggestionCards(suggestions.all.slice(0, 2));
            } else if (weather && weather.code === 1 || weather?.code === 2) { // Cloudy
                setSuggestionCards(suggestions.nature);
            } else {
                setSuggestionCards(suggestions[selectedCategory] || suggestions.all);
            }
        };

        generateSuggestions();
    }, [selectedCategory, weather]);

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
        { emoji: '🏔️', text: t('Mountains', 'ಪರ್ವತಗಳು'), id: 'nature' },
        { emoji: '🏖️', text: t('Beaches', 'ಕಡಲ ತೀರ'), id: 'nature' },
        { emoji: '🏰', text: t('Forts', 'ಕೋಟೆಗಳು'), id: 'heritage' },
        { emoji: '🌿', text: t('Forest', 'ಅರಣ್ಯ'), id: 'nature' },
        { emoji: '🍛', text: t('Food', 'ಆಹಾರ'), id: 'food' },
        { emoji: '🎨', text: t('Culture', 'ಸಂಸ್ಕೃತಿ'), id: 'culture' },
    ];

    const nearbyPicks = [
        { emoji: '🏯', name: t('Bengaluru Fort', 'ಬೆಂಗಳೂರು ಕೋಟೆ'), dist: '2.1 km', tag: t('Heritage', 'ಪರಂಪರೆ') },
        { emoji: '🌿', name: t('Cubbon Park', 'ಕಬ್ಬನ್ ಪಾರ್ಕ್'), dist: '3.4 km', tag: t('Nature', 'ಪ್ರಕೃತಿ') },
        { emoji: '🍛', name: t('VV Puram Food St.', 'VV ಪುರಂ ಫುಡ್'), dist: '5.0 km', tag: t('Food', 'ಆಹಾರ') },
    ];

    return (
        <section id="hero" ref={heroRef} className="hero-section">
            {/* ── Premium Background Layer ── */}
            <div className="hero-video-wrap">
                <video
                    autoPlay muted loop playsInline key={currentCity.name}
                    className="hero-video"
                    style={{ transform: `translate(-50%,-50%) scale(1.08) translateY(${scrollY * 0.18}px)` }}
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
                </video>

                {/* Gradient overlays */}
                <div className="hero-overlay-primary" />
                <div className="hero-overlay-secondary" />

                {/* Radial color bleeds */}
                <div className="hero-radial-gradient hero-radial-warm" />
                <div className="hero-radial-gradient hero-radial-purple" />

                {/* Floating orbs */}
                {floatingOrbs.map((orb, i) => (
                    <div
                        key={i}
                        className="hero-floating-orb"
                        style={{
                            top: orb.top,
                            left: orb.left,
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                            transform: `translate(${mousePos.x * (8 + i * 3)}px, ${mousePos.y * (6 + i * 2)}px)`,
                            animationDelay: `${orb.delay}s`,
                        }}
                    />
                ))}

                {/* Animated particles */}
                {Array.from({ length: particleCount }).map((_, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            top: `${10 + Math.sin(i * 137.5 * Math.PI / 180) * 40 + 40}%`,
                            left: `${(i / particleCount) * 100}%`,
                            width: i % 3 === 0 ? 3 : 2,
                            height: i % 3 === 0 ? 3 : 2,
                            background: i % 3 === 0 ? 'rgba(255,209,102,0.6)' : 'rgba(255,255,255,0.25)',
                            animationDelay: `${(i * 0.3) % 3}s`,
                        }}
                    />
                ))}

                {/* Subtle grid */}
                <svg className="hero-grid">
                    <defs>
                        <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heroGrid)" />
                </svg>
            </div>

            {/* ── Main Content ── */}
            <div className="container hero-inner">
                <div className="hero-content">
                    {/* Badge */}
                    <div className="hero-badge">
                        <span className="hero-badge-icon">✨</span>
                        <span>{t('Curated Hidden Gems', 'ಆಯ್ದ ಅಡಗಿದ ರತ್ನಗಳು')}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="hero-title">
                        {t('Explore', 'ಅನ್ವೇಷಿಸಿ')}{' '}
                        <span className="hero-title-highlight">
                            {t(currentCity.name, currentCity.name)}
                            <svg className="hero-title-underline" viewBox="0 0 200 12">
                                <defs>
                                    <linearGradient id="uGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FF6B35" />
                                        <stop offset="100%" stopColor="#FF4D6D" />
                                    </linearGradient>
                                </defs>
                                <path d="M4 8 Q50 2 100 8 Q150 14 196 6" fill="none" stroke="url(#uGrad)" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>
                        <br />{t('Like a Local', 'ಸ್ಥಳೀಯರಂತೆ')}
                    </h1>

                    {/* Typewriter subline */}
                    <div className="hero-typewriter">
                        <span className="hero-typewriter-label">{t('Discover', 'ಕಂಡುಕೊಳ್ಳಿ')} →</span>
                        <span className="hero-typewriter-text">
                            {typedText}
                            <span className="hero-typewriter-cursor" />
                        </span>
                    </div>

                    {/* Description */}
                    <p className="hero-desc">{t(currentCity.overview, currentCity.overview)}</p>

                    {/* Category Filters */}
                    <div className="hero-filters">
                        {[
                            { label: t('All', 'ಎಲ್ಲಾ'), id: 'all' },
                            { label: t('Nature', 'ಪ್ರಕೃತಿ'), id: 'nature' },
                            { label: t('Food', 'ಆಹಾರ'), id: 'food' },
                            { label: t('Culture', 'ಸಂಸ್ಕೃತಿ'), id: 'culture' },
                            { label: t('Heritage', 'ಪರಂಪರೆ'), id: 'heritage' },
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                className={`hero-filter-btn ${selectedCategory === filter.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Quick-filter tags */}
                    <div className="hero-tags">
                        {travelTags.map((tag, i) => (
                            <button
                                key={i}
                                className="hero-tag-btn"
                                onClick={() => setSelectedCategory(tag.id)}
                            >
                                <span className="hero-tag-emoji">{tag.emoji}</span>
                                {tag.text}
                            </button>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="hero-ctas">
                        <a href="#discover-section" className="btn btn-primary">
                            🚀 {t('Start Exploring', 'ಅನ್ವೇಷಣೆ ಆರಂಭಿಸಿ')}
                            <span className="btn-shimmer" />
                        </a>
                        <a href="#map-section" className="btn btn-secondary">
                            🗺️ {t('View Map', 'ನಕ್ಷೆ ನೋಡಿ')}
                        </a>
                        <a href="#ai-section" className="btn btn-tertiary">
                            🤖 {t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}
                        </a>
                    </div>

                    {/* Radius Control */}
                    <div className="hero-radius-wrap">
                        <label>{t('Search Radius', 'ಹುಡುಕಾಟದ ವ್ಯಾಪ್ತಿ')}:</label>
                        <div className="radius-slider-container">
                            <input
                                type="range"
                                min="5"
                                max="100"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                                className="radius-slider"
                            />
                            <span className="radius-value">{radius} km</span>
                        </div>
                    </div>

                    {/* Trust Stats */}
                    <div className="hero-stats">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className={`stat-item ${activeStatIdx === i ? 'active' : ''}`}
                            >
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-number">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                                {activeStatIdx === i && <div className="stat-highlight" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Desktop Floating Card ── */}
                <div ref={floatingCardRef} className="hero-floating-card">
                    <div className="floating-card-inner">
                        {/* Mini map */}
                        <div className="floating-card-map">
                            <svg viewBox="0 0 200 100">
                                <path d="M20,80 Q60,20 100,50 Q140,80 180,30" fill="none" stroke="#FF6B35" strokeWidth="2" strokeDasharray="4,4" />
                                <circle cx="20" cy="80" r="5" fill="#FF6B35" />
                                <circle cx="100" cy="50" r="4" fill="#FFD166" />
                                <circle cx="180" cy="30" r="5" fill="#00D4AA" />
                            </svg>
                            <span className="floating-card-map-icon">🗺️</span>
                        </div>

                        {/* Header */}
                        <div className="floating-card-header">
                            {t('Top Picks Near You', 'ನಿಮ್ಮ ಬಳಿ ಉತ್ತಮ ಆಯ್ಕೆಗಳು')}
                        </div>

                        {/* Picks list */}
                        <div className="floating-card-picks">
                            {nearbyPicks.map((item, i) => (
                                <div key={i} className="floating-pick-item">
                                    <span className="pick-emoji">{item.emoji}</span>
                                    <div className="pick-info">
                                        <div className="pick-name">{item.name}</div>
                                        <div className="pick-distance">{item.dist}</div>
                                    </div>
                                    <span className="pick-tag">{item.tag}</span>
                                </div>
                            ))}
                        </div>

                        {/* Weather */}
                        <div className="floating-card-weather">
                            <div className="weather-info">
                                <div className="weather-label">
                                    {t('TODAY', 'ಇಂದು')} • {currentCity.name}
                                </div>
                                <div className="weather-text">
                                    ⛅ {t('Great day to explore!', 'ಅನ್ವೇಷಣೆಗೆ ಉತ್ತಮ ದಿನ!')}
                                </div>
                            </div>
                            <div className="weather-temp">
                                {weather?.temp ? `${Math.round(weather.temp)}°` : '26°'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Know More Button */}
                <button
                    className="hero-know-more-btn"
                    onClick={() => setShowPanel(!showPanel)}
                >
                    ℹ️ {t('Know More About', 'ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ')} {currentCity.name}
                </button>

                {/* Location panel */}
                <div className={`location-summary-panel ${showPanel ? 'open' : ''}`}>
                    <h3 className="lsp-title">{currentCity.name}</h3>
                    <p className="lsp-subtitle">{t('Quick Overview', 'ತ್ವರಿತ ಅವಲೋಕನ')}</p>
                    <ul className="lsp-highlights">
                        {currentCity.highlights?.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                    <div className="lsp-best-time">🕒 {t('Best Time', 'ಅತ್ಯುತ್ತಮ ಸಮಯ')}: {currentCity.bestTime}</div>
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => setShowPanel(false)}
                    >
                        {t('Close', 'ಮುಚ್ಚಿ')}
                    </button>
                </div>
            </div>

            {/* ── Enhanced Search Bar ── */}
            <div className="hero-search-wrap">
                <div className="hero-search">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('Search for "CTR Dosa" or "Hampi"...', '"CTR ದೋಸೆ" ಅಥವಾ "ಹಂಪಿ" ಎಂದು ಹುಡುಕಿ...')}
                    />
                    <div className="search-divider" />
                    <select
                        value={state.currentCity}
                        onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })}
                        className="search-select"
                    >
                        {state.cities?.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                    <div className="search-divider" />
                    <div className="search-quick-filters">
                        {['🏛️', '🍜', '🏕️'].map((emoji, i) => (
                            <button
                                key={i}
                                className="quick-filter-btn"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-primary search-btn">
                        {t('Search', 'ಹುಡುಕಿ')}
                    </button>
                </div>
            </div>

            {/* Perfect for Today Section */}
            <div className="hero-suggestions-section">
                <div className="container">
                    <h2 className="suggestions-title">
                        {t('Perfect for Today', 'ಇಂದಿಗೆ ಪರಿಪೂರ್ಣ')}
                        {weather && weather.temp && (
                            <span className="weather-badge">
                                {weather.temp > 30 ? '☀️ Hot' : weather.temp < 15 ? '❄️ Cool' : '⛅ Pleasant'}
                            </span>
                        )}
                    </h2>
                    <div className="suggestions-grid">
                        {suggestionCards.map((card) => (
                            <div key={card.id} className="suggestion-card">
                                <div className="suggestion-card-image">{card.image}</div>
                                <div className="suggestion-card-content">
                                    <h3>{card.name}</h3>
                                    <div className="suggestion-card-meta">
                                        <span className="rating">⭐ {card.rating}</span>
                                        <span className="distance">📍 {card.distance}</span>
                                    </div>
                                    <span className="suggestion-category">{t(card.category, card.category)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Keyframes ── */}
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
                @keyframes slideUpFade {
                    from{opacity:0;transform:translateY(20px)}
                    to{opacity:1;transform:translateY(0)}
                }
                @keyframes pulseGlow {
                    0%,100%{box-shadow:0 0 20px rgba(255,107,53,0.3)}
                    50%{box-shadow:0 0 40px rgba(255,107,53,0.6)}
                }
            `}</style>
        </section>
    );
};

export default Hero;
