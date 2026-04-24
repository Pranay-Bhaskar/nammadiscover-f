import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import heroVideo from '../assets/bg video.mp4';

const Hero = () => {
    const { state, dispatch } = useApp();
    const [weather, setWeather] = useState({ temp: 28, condition: 'Sunny', icon: 'Sun' });
    const [typedText, setTypedText] = useState('');
    const [typeIdx, setTypeIdx] = useState(0);
    const [phaseIdx, setPhaseIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    // ── DATA REGISTRY: Intelligence for specific cities ──
    const cityData = {
        'bengaluru': {
            name: 'Bengaluru',
            places: [
                { id: 1, name: t('Cubbon Park', 'ಕಬ್ಬನ್ ಪಾರ್ಕ್'), weather: 'Sunny', tag: 'Nature' },
                { id: 2, name: t('Commercial Street', 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ರೀಟ್'), weather: 'Cloudy', tag: 'Shopping' },
                { id: 3, name: t('National Gallery', 'ನ್ಯಾಷನಲ್ ಗ್ಯಾಲರಿ'), weather: 'Rainy', tag: 'Art' }
            ]
        },
        'hampi': {
            name: 'Hampi',
            places: [
                { id: 4, name: t('Matanga Hill', 'ಮಾತಂಗ ಬೆಟ್ಟ'), weather: 'Sunny', tag: 'Trek' },
                { id: 5, name: t('Vittala Temple', 'ವಿಠಲ ದೇವಾಲಯ'), weather: 'Cloudy', tag: 'History' },
                { id: 6, name: t('Archaeology Museum', 'ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ'), weather: 'Rainy', tag: 'Indoor' }
            ]
        },
        'chikmagalur': {
            name: 'Chikmagalur',
            places: [
                { id: 7, name: t('Mullayanagiri', 'ಮುಳ್ಳಯ್ಯನಗಿರಿ'), weather: 'Sunny', tag: 'Peak' },
                { id: 8, name: t('Coffee Museum', 'ಕಾಫಿ ಮ್ಯೂಸಿಯಂ'), weather: 'Rainy', tag: 'Culture' },
                { id: 9, name: t('Hebbe Falls', 'ಹೆಬ್ಬೆ ಜಲಪಾತ'), weather: 'Cloudy', tag: 'Nature' }
            ]
        }
    };

    const currentCity = cityData[state.currentCity] || cityData['bengaluru'];

    // ── WEATHER ENGINE ──
    useEffect(() => {
        // Simulation of a Weather API Call - Replace with real fetch
        const conditions = ['Sunny', 'Rainy', 'Cloudy'];
        const randomCond = conditions[Math.floor(Math.random() * conditions.length)];
        setWeather({
            temp: randomCond === 'Sunny' ? 32 : randomCond === 'Rainy' ? 22 : 26,
            condition: randomCond,
            icon: randomCond
        });
    }, [state.currentCity]);

    // ── TYPING ENGINE ──
    const phrases = [
        t(`Exploring ${currentCity.name}...`, `${currentCity.name} ಅನ್ವೇಷಿಸಲಾಗುತ್ತಿದೆ...`),
        t('Discovering Hidden Gems', 'ಅಡಗಿರುವ ತಾಣಗಳ ಶೋಧ'),
        t('Local Flavors & Stories', 'ಸ್ಥಳೀಯ ರುಚಿ ಮತ್ತು ಕಥೆಗಳು')
    ];

    useEffect(() => {
        const phrase = phrases[phaseIdx];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setTypedText(phrase.slice(0, typeIdx + 1));
                if (typeIdx + 1 === phrase.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                } else setTypeIdx(i => i + 1);
            } else {
                setTypedText(phrase.slice(0, typeIdx - 1));
                if (typeIdx === 0) {
                    setIsDeleting(false);
                    setPhaseIdx(p => (p + 1) % phrases.length);
                } else setTypeIdx(i => i - 1);
            }
        }, isDeleting ? 30 : 60);
        return () => clearTimeout(timeout);
    }, [typeIdx, isDeleting, phaseIdx]);

    return (
        <section id="hero" ref={heroRef} className={`premium-hero ${weather.condition.toLowerCase()}`}>
            <style>{`
                .premium-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    overflow: hidden;
                    background: #000;
                    padding: 0 5%;
                }

                /* Weather-Based Theme Overlays */
                .premium-hero.sunny { --accent: #FF6B35; --bg-tint: rgba(255,107,53,0.1); }
                .premium-hero.rainy { --accent: #4A90E2; --bg-tint: rgba(74,144,226,0.15); }
                .premium-hero.cloudy { --accent: #A0AEC0; --bg-tint: rgba(160,174,192,0.1); }

                .video-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    filter: brightness(0.6) contrast(1.1);
                }

                .weather-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 20% 30%, var(--bg-tint), transparent 60%);
                    z-index: 2;
                    pointer-events: none;
                }

                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    z-index: 10;
                    gap: 60px;
                }

                .badge-smart {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.08);
                    backdrop-filter: blur(10px);
                    padding: 6px 14px;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.15);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                }

                .main-title {
                    font-size: clamp(3rem, 5vw, 5.5rem);
                    font-weight: 900;
                    line-height: 0.95;
                    margin-bottom: 25px;
                    letter-spacing: -2px;
                }

                .highlight-text {
                    color: var(--accent);
                    transition: color 0.5s ease;
                }

                .smart-recommendations {
                    margin-top: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .rec-item {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 15px 20px;
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    backdrop-filter: blur(20px);
                    transition: all 0.3s ease;
                }

                .rec-item:hover {
                    background: rgba(255,255,255,0.07);
                    transform: translateX(10px);
                    border-color: var(--accent);
                }

                .weather-pill {
                    font-size: 0.7rem;
                    padding: 4px 10px;
                    border-radius: 6px;
                    background: var(--accent);
                    color: #fff;
                    font-weight: 700;
                }

                .search-glass {
                    background: rgba(0,0,0,0.3);
                    backdrop-filter: blur(30px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-top: 50px;
                }

                .search-glass input {
                    background: transparent;
                    border: none;
                    color: #fff;
                    padding: 10px;
                    flex: 1;
                    outline: none;
                    font-size: 1rem;
                }

                .btn-action {
                    background: var(--accent);
                    color: #fff;
                    padding: 12px 28px;
                    border-radius: 16px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr; text-align: center; }
                    .badge-smart { justify-content: center; }
                    .smart-recommendations { display: none; }
                }
            `}</style>

            <div className="video-bg">
                <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </div>
            <div className="weather-overlay" />

            <div className="hero-grid">
                <div className="hero-left">
                    <div className="badge-smart">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        {t('Contextual Discovery Engine', 'ಸಂದರ್ಭೋಚಿತ ಅನ್ವೇಷಣೆ')}
                    </div>

                    <h1 className="main-title">
                        {t('Explore', 'ಅನ್ವೇಷಿಸಿ')} <br/>
                        <span className="highlight-text">{currentCity.name}</span> <br/>
                        {t('Differently', 'ವಿಭಿನ್ನವಾಗಿ')}
                    </h1>

                    <div style={{ minHeight: '1.5rem', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 500, opacity: 0.8 }}>
                        {typedText}
                    </div>

                    <div className="search-glass">
                        <input type="text" placeholder={t('Search architecture, food, or secrets...', 'ವಾಸ್ತುಶಿಲ್ಪ, ಆಹಾರ ಅಥವಾ ರಹಸ್ಯಗಳನ್ನು ಹುಡುಕಿ...')} />
                        <select 
                            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                            value={state.currentCity} 
                            onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })}
                        >
                            <option value="bengaluru">Bengaluru</option>
                            <option value="hampi">Hampi</option>
                            <option value="chikmagalur">Chikmagalur</option>
                        </select>
                        <button className="btn-action">{t('Search', 'ಹುಡುಕಿ')}</button>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="rec-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{t('Real-time Atmosphere', 'ನೈಜ-ಸಮಯದ ವಾತಾವರಣ')}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>{weather.temp}°C</span>
                                <span className="weather-pill">{t(weather.condition, weather.condition)}</span>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                            {weather.condition === 'Rainy' 
                                ? t('Perfect for indoor culture:', 'ಒಳಾಂಗಣ ಸಂಸ್ಕೃತಿಗೆ ಸೂಕ್ತ ಸಮಯ:') 
                                : t('Recommended for you now:', 'ನಿಮಗಾಗಿ ಇಂದಿನ ಶಿಫಾರಸುಗಳು:')}
                        </h4>

                        <div className="smart-recommendations">
                            {currentCity.places.map(place => (
                                <div key={place.id} className="rec-item">
                                    <div>
                                        <div style={{ fontWeight: 700 }}>{place.name}</div>
                                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{place.tag}</div>
                                    </div>
                                    {place.weather === weather.condition && (
                                        <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 800 }}>{t('Top Pick', 'ಅತ್ಯುತ್ತಮ')}</span>
                                    )}
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
