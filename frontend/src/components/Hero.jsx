import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import heroVideo from '../assets/bg video.mp4';

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

    // NEW
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState('');

    const heroRef = useRef(null);
    const floatingCardRef = useRef(null);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const currentCity = state.cities?.find(c => c.slug === state.currentCity) || {
        name: 'Karnataka',
        overview: 'Discover the hidden gems of the Karunadu.',
        highlights: ['Culture', 'Heritage', 'Nature'],
        bestTime: 'Year-round'
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSearchError('');

        try {
            const url = `http://localhost:5000/api/places/search?q=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(state.currentCity)}&radius=${encodeURIComponent(radius)}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Search failed with status ${response.status}`);
            }

            const data = await response.json();

            // assuming backend returns { places: [...] }
            setSearchResults(data.places || []);

            // optional: if you want global state too
            // dispatch({ type: 'SET_SEARCH_RESULTS', payload: data.places || [] });

        } catch (error) {
            console.error('Search error:', error);
            setSearchError('Failed to search places');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
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

    return (
        <section id="hero" ref={heroRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
            {/* your existing hero UI stays same */}

            <div className="hero-search-wrap" style={{ 
                position: 'absolute', 
                bottom: '5%', 
                left: '50%', 
                width: '100%', 
                zIndex: 10 
            }}>
                <div className="hero-search">
                    <span style={{ fontSize:'1.1rem' }}>🔍</span>

                    <input
                        type="text"
                        placeholder={t('Search for "CTR Dosa" or "Hampi"...', '"CTR ದೋಸೆ" ಅಥವಾ "ಹಂಪಿ" ಎಂದು ಹುಡುಕಿ...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                    />

                    <div className="divider" />

                    <select
                        value={state.currentCity}
                        onChange={(e) => dispatch({ type:'SET_CITY', payload:e.target.value })}
                    >
                        {state.cities?.map(c => (
                            <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                    </select>

                    <div className="divider" />

                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? 'Searching...' : t('Search','ಹುಡುಕಿ')}
                    </button>
                </div>

                {searchError && (
                    <div style={{ color: 'tomato', marginTop: '0.75rem', textAlign: 'center' }}>
                        {searchError}
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div style={{
                        marginTop: '1rem',
                        maxWidth: '800px',
                        marginInline: 'auto',
                        background: 'rgba(8,13,26,0.85)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        backdropFilter: 'blur(18px)'
                    }}>
                        {searchResults.map((place) => (
                            <div
                                key={place._id}
                                style={{
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                                }}
                            >
                                <div style={{ color: '#fff', fontWeight: 700 }}>{place.name}</div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                    {place.category} • {place.city}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;