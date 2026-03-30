import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../../store/AppContext';

const GeoSection = () => {
    const { state } = useApp();
    const [nearby, setNearby] = useState([]);
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            });
        }
    }, []);

    useEffect(() => {
        const fetchNearby = async () => {
            if (!coords) return;
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5001/api/locations`, {
                    params: {
                        lat: coords.lat,
                        lng: coords.lng,
                        radius: 10 // 10km search
                    }
                });
                
                // Add distance calculation for display since backend $near returns sorted but not the distance value in basic query
                const withDistance = res.data.map(loc => {
                    const d = Math.sqrt(Math.pow(loc.lat - coords.lat, 2) + Math.pow(loc.lng - coords.lng, 2)) * 111;
                    return { ...loc, distance: d.toFixed(1) };
                }).slice(0, 4);
                
                setNearby(withDistance);
            } catch (err) {
                console.error('Error fetching nearby spots:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNearby();
    }, [coords]);

    if (!coords) return null;

    return (
        <section id="geo-section">
            <div className="container">
                <div className="geo-card glass-card">
                    <div className="geo-icon">📍</div>
                    <div className="geo-text">
                        <h3>{t('Right Near You', 'ನಿಮ್ಮ ಹತ್ತಿರದಲ್ಲಿ')}</h3>
                        <p>{t('We found these authentic spots just a few kilometers away from your current location.', 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದಿಂದ ಕೆಲವು ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿರುವ ಈ ಅಪ್ಪಟ ಸ್ಥಳಗಳನ್ನು ನಾವು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ.')}</p>
                    </div>
                </div>

                <div className="nearby-grid">
                    {loading ? (
                        <div className="flex-center w-full" style={{ padding: '2rem' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : nearby.length > 0 ? (
                        nearby.map(loc => (
                            <div key={loc._id} className="nearby-card glass-card">
                                <div className="nearby-emoji">{loc.category_icon || '📍'}</div>
                                <div>
                                    <div className="nearby-dist">{loc.distance} km away</div>
                                    <div className="nearby-name">{loc.displayName || loc.name?.en}</div>
                                    <div className="nearby-cat">{loc.category}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex-center w-full" style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                            {t('No spots found within 10km.', '10 ಕಿ.ಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಯಾವುದೇ ಸ್ಥಳಗಳು ಕಂಡುಬಂದಿಲ್ಲ.')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GeoSection;
