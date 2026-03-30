import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../../store/AppContext';
import SpotCard from './SpotCard';

const DiscoverGrid = () => {
    const { state, currentCity, selectedCategory, setSelectedCategory, verifiedOnly, setVerifiedOnly } = useApp();
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const categories = [
        { id: 'all', label: t('All', 'ಎಲ್ಲಾ') },
        { id: 'Restaurant', label: t('Food', 'ಆಹಾರ') },
        { id: 'Nature', label: t('Nature', 'ಪ್ರಕೃತಿ') },
        { id: 'Heritage', label: t('Heritage', 'ಪರಂಪರೆ') },
        { id: 'Shopping', label: t('Shopping', 'ಖರೀದಿ') },
        { id: 'Adventure', label: t('Adventure', 'ಸಾಹಸ') }
    ];

    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);
            try {
                const params = {};
                if (currentCity && currentCity !== 'all') params.citySlug = currentCity;
                if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
                if (verifiedOnly) params.verifiedOnly = true;

                const res = await axios.get(`http://localhost:5001/api/locations`, { params });
                setFiltered(res.data);
            } catch (err) {
                console.error('Error fetching filtered spots:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredData();
    }, [currentCity, selectedCategory, verifiedOnly]);

    return (
        <>
            {/* 🔥 PREMIUM AUTO-SCROLL CSS */}
            <style>{`
                .spots-grid-wrapper {
                    overflow: hidden;
                    position: relative;
                }

                .spots-grid {
                    display: flex;
                    gap: 1.5rem;
                    width: max-content;
                    animation: scrollLoop 40s linear infinite;
                }

                /* 🔥 PAUSE ON HOVER */
                .spots-grid:hover {
                    animation-play-state: paused;
                }

                /* 🔥 INFINITE LOOP EFFECT */
                @keyframes scrollLoop {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                /* CARD STYLE */
                .spots-grid > * {
                    min-width: 300px;
                    max-width: 320px;
                    flex-shrink: 0;

                    position: relative;
                    border-radius: 18px;

                    transition: all 0.4s ease;
                }

                /* HOVER EFFECT */
                .spots-grid > *:hover {
                    transform: translateY(-12px) scale(1.04);
                    z-index: 5;
                }

                /* GLOW EFFECT */
                .spots-grid > *:hover::after {
                    content: "";
                    position: absolute;
                    inset: -2px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    z-index: -1;
                    opacity: 0.7;
                    filter: blur(14px);
                }

                /* EDGE FADE */
                .spots-grid-wrapper::before,
                .spots-grid-wrapper::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: 80px;
                    height: 100%;
                    z-index: 10;
                    pointer-events: none;
                }

                .spots-grid-wrapper::before {
                    left: 0;
                    background: linear-gradient(to right, #0f172a, transparent);
                }

                .spots-grid-wrapper::after {
                    right: 0;
                    background: linear-gradient(to left, #0f172a, transparent);
                }

                /* MOBILE */
                @media (max-width: 768px) {
                    .spots-grid > * {
                        min-width: 260px;
                    }
                }

                @media (max-width: 480px) {
                    .spots-grid > * {
                        min-width: 85%;
                    }
                }
            `}</style>

            <section id="discover-section" className="section">
                <div className="container">
                    <div className="section-head">
                        <div className="section-label">{t('Discover', 'ಅನ್ವೇಷಿಸಿ')}</div>
                        <h2 className="section-title">
                            {t('Authentic Spots in', 'ಅಪ್ಪಟ ಸ್ಥಳಗಳು')} {state.cities.find(c => c.slug === currentCity)?.name || 'Karnataka'}
                        </h2>
                    </div>

                    <div className="spots-controls">
                        <div className="filter-chips">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="verified-filter-wrap">
                            <input
                                type="checkbox"
                                id="verified-check"
                                checked={verifiedOnly}
                                onChange={(e) => setVerifiedOnly(e.target.checked)}
                            />
                            <label htmlFor="verified-check">{t('Verified Only', 'ಪರಿಶೀಲಿಸಿದವು ಮಾತ್ರ')}</label>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ padding: '4rem' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="spots-grid-wrapper">
                            <div className="spots-grid">
                                {/* 🔥 DUPLICATE FOR INFINITE LOOP */}
                                {[...filtered, ...filtered].map((loc, i) => (
                                    <SpotCard key={i} spot={loc} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default DiscoverGrid;