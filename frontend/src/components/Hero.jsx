import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../store/AppContext';
import heroVideo from '../assets/bg video.mp4';

const Hero = () => {
  const { state, dispatch } = useApp();

  const [radius, setRadius] = useState(50);
  const [scrollY, setScrollY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');
  const [seasonalSuggestion, setSeasonalSuggestion] = useState('');

  const heroRef = useRef(null);

  const t = (en, kn) => (state.language === 'en' ? en : kn);

  const currentCity =
    state.cities?.find((c) => c.slug === state.currentCity) || {
      slug: 'karnataka',
      name: 'Karnataka',
      overview: 'Discover hidden gems across Karnataka.',
      highlights: ['Culture', 'Food', 'Nature'],
      bestTime: 'Year-round',
    };

  const stats = [
    { num: '500+', label: t('Verified Spots', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು') },
    { num: '50k+', label: t('Happy Travelers', 'ಸಂತುಷ್ಟ ಪ್ರಯಾಣಿಕರು') },
    { num: '200+', label: t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು') },
    { num: '4.9★', label: t('Avg Rating', 'ಸರಾಸರಿ ರೇಟಿಂಗ್') },
  ];

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        
        // Get coordinates for Bengaluru (default location)
        const latitude = 12.9716;
        const longitude = 77.5946;
        
        // Using Open-Meteo free weather API (no API key required)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await response.json();
        const weatherData = data.current;
        
        setWeather({
          temperature: weatherData.temperature_2m,
          humidity: weatherData.relative_humidity_2m,
          weatherCode: weatherData.weather_code,
          windSpeed: weatherData.wind_speed_10m,
        });

        // Generate seasonal suggestion based on weather
        const temp = weatherData.temperature_2m;
        const weatherCode = weatherData.weather_code;
        
        if (temp > 30) {
          setSeasonalSuggestion(
            state.language === 'en'
              ? '☀️ Hot & Sunny | Perfect for: Western Ghats, Hill Stations, Waterfalls'
              : '☀️ ಬಿಸಿ ಮತ್ತು ಬಿಸಿಲಿನ | ಸೂಕ್ತವಾಗಿದೆ: ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು, ಗುಡ್ಡೆಯ ನಿಲ್ದಾಣಗಳು, ನೀರಿನ ಬಿದಿರುಗಳು'
          );
        } else if (temp < 20) {
          setSeasonalSuggestion(
            state.language === 'en'
              ? '❄️ Cool & Pleasant | Perfect for: Trekking, Temples, Heritage Sites'
              : '❄️ ತಾಜಾ ಮತ್ತು ಆನಂದದಾಯಕ | ಸೂಕ್ತವಾಗಿದೆ: ಟ್ರೆಕಿಂಗ್, ದೇವಾಲಯಗಳು, ಐತಿಹ್ಯ ಸ್ಥಳಗಳು'
          );
        } else if (weatherCode >= 51 && weatherCode <= 67) {
          // Rainy weather codes
          setSeasonalSuggestion(
            state.language === 'en'
              ? '🌧️ Rainy Season | Perfect for: Coffee Plantations, Green Valleys, Scenic Drives'
              : '🌧️ ಮಳೆಯ ಋತು | ಸೂಕ್ತವಾಗಿದೆ: ಕಾಫಿ ತೈಲೀಕರಣ, ಹಸಿರು ಕಣಿವೆಗಳು, ದೃಶ್ಯಮಾನ ಚಲನೆಗಳು'
          );
        } else {
          setSeasonalSuggestion(
            state.language === 'en'
              ? '🌤️ Perfect Weather | Ideal for: Exploring Everything!'
              : '🌤️ ಸಂಪೂರ್ಣ ಹವಾಮಾನ | ಸೂಕ್ತವಾಗಿದೆ: ಎಲ್ಲವನ್ನು ಅನ್ವೇಷಿಸಿ!'
          );
        }

        setWeatherError('');
      } catch (error) {
        console.error('Weather fetch error:', error);
        setWeatherError('');
        // Fail silently - don't disrupt the main app
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [state.language]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const selectedCityName =
        state.cities?.find((c) => c.slug === state.currentCity)?.name ||
        currentCity.name ||
        '';

      const url =
        `${API_BASE}/api/places/search` +
        `?q=${encodeURIComponent(searchQuery)}` +
        `&city=${encodeURIComponent(selectedCityName)}` +
        `&radius=${encodeURIComponent(radius)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.places || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search places');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translateY(${scrollY * 0.15}px)`,
          zIndex: 1,
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 2,
        }}
      />

      <div
        className="container hero-inner"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '1200px',
          padding: '2rem 1rem',
          textAlign: 'center',
        }}
      >
        {/* Weather & Seasonal Suggestion Banner */}
        {!weatherLoading && weather && seasonalSuggestion && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '1rem',
              borderRadius: '16px',
              background: 'rgba(255, 209, 102, 0.12)',
              border: '1px solid rgba(255, 209, 102, 0.25)',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(12px)',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>🌡️</span>
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#ffd166',
                  }}
                >
                  {weather.temperature}°C | Humidity: {weather.humidity}%
                </span>
              </div>
              <div
                style={{
                  width: '1px',
                  height: '24px',
                  background: 'rgba(255,255,255,0.2)',
                }}
              />
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  maxWidth: '100%',
                }}
              >
                {seasonalSuggestion}
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
            marginBottom: '1rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span>✨</span>
          <span>{t('Authentic Karnataka Experiences', 'ಅಪ್ಪಟ ಕರ್ನಾಟಕದ ಅನುಭವಗಳು')}</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: '1rem',
          }}
        >
          {t('Explore', 'ಅನ್ವೇಷಿಸಿ')} <span style={{ color: '#ffd166' }}>{currentCity.name}</span>
          <br />
          {t('Like a Local', 'ಸ್ಥಳೀಯರಂತೆ')}
        </h1>

        <p
          style={{
            maxWidth: '760px',
            margin: '0 auto 1.5rem',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.7,
          }}
        >
          {currentCity.overview}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {stats.map((item) => (
            <div
              key={item.label}
              style={{
                minWidth: '140px',
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#ffd166',
                }}
              >
                {item.num}
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className="hero-search-wrap"
          style={{
            width: '100%',
            maxWidth: '950px',
            margin: '0 auto',
          }}
        >
          <div
            className="hero-search"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              borderRadius: '18px',
              background: 'rgba(10, 14, 30, 0.7)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🔍</span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder={
                state.language === 'en'
                  ? 'Search for "CTR Dosa" or "Hampi"...'
                  : '"CTR ದೋಸೆ" ಅಥವಾ "ಹಂಪಿ" ಎಂದು ಹುಡುಕಿ...'
              }
              style={{
                flex: '1 1 260px',
                minWidth: '220px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '1rem',
              }}
            />

            <select
              value={state.currentCity}
              onChange={(e) =>
                dispatch({ type: 'SET_CITY', payload: e.target.value })
              }
              style={{
                flex: '0 1 180px',
                minWidth: '160px',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                outline: 'none',
              }}
            >
              {state.cities?.map((city) => (
                <option key={city.slug} value={city.slug} style={{ color: '#000' }}>
                  {city.name}
                </option>
              ))}
            </select>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flex: '0 1 180px',
                minWidth: '170px',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              <span style={{ fontSize: '0.92rem' }}>
                {t('Radius', 'ವ್ಯಾಪ್ತಿ')}: {radius} km
              </span>
              <input
                type="range"
                min="5"
                max="100"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                padding: '0.9rem 1.3rem',
                border: 'none',
                borderRadius: '12px',
                background: isSearching ? '#999999' : '#ff6b35',
                color: '#ffffff',
                fontWeight: 700,
                cursor: isSearching ? 'not-allowed' : 'pointer',
              }}
            >
              {isSearching
                ? t('Searching...', 'ಹುಡುಕಲಾಗುತ್ತಿದೆ...')
                : t('Search', 'ಹುಡುಕಿ')}
            </button>
          </div>

          {searchError && (
            <div
              style={{
                marginTop: '0.85rem',
                color: '#ffb4b4',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {searchError}
            </div>
          )}

          {searchResults.length > 0 && (
            <div
              style={{
                marginTop: '1rem',
                textAlign: 'left',
                background: 'rgba(8,13,26,0.88)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '18px',
                padding: '1rem',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  color: '#ffd166',
                }}
              >
                {t('Search Results', 'ಹುಡುಕಾಟದ ಫಲಿತಾಂಶಗಳು')}
              </div>

              {searchResults.map((place, index) => {
                const placeName =
                  typeof place.name === 'object'
                    ? place.name?.en || place.name?.kn || 'Unnamed place'
                    : place.name || 'Unnamed place';

                const placeDescription =
                  typeof place.description === 'object'
                    ? place.description?.en || place.description?.kn || ''
                    : place.description || '';

                return (
                  <div
                    key={place._id || `${placeName}-${index}`}
                    style={{
                      padding: '0.9rem 0',
                      borderBottom:
                        index !== searchResults.length - 1
                          ? '1px solid rgba(255,255,255,0.08)'
                          : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#ffffff',
                      }}
                    >
                      {placeName}
                    </div>

                    <div
                      style={{
                        marginTop: '0.2rem',
                        fontSize: '0.92rem',
                        color: 'rgba(255,255,255,0.72)',
                      }}
                    >
                      {(place.category || 'Place') + ' • ' + (place.city || currentCity.name)}
                    </div>

                    {placeDescription && (
                      <div
                        style={{
                          marginTop: '0.4rem',
                          fontSize: '0.9rem',
                          color: 'rgba(255,255,255,0.58)',
                          lineHeight: 1.6,
                        }}
                      >
                        {placeDescription}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
