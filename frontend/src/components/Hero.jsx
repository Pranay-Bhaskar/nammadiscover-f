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

  // Weather states
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');
  const [seasonalSuggestion, setSeasonalSuggestion] = useState('');
  const [userLocation, setUserLocation] = useState({
    lat: 13.2347, // Hebbal, Bengaluru (fallback)
    lng: 77.6245,
    city: 'Hebbal, Bengaluru',
  });

  // Weather-based places states
  const [weatherPlaces, setWeatherPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);

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

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude);
          setUserLocation({
            lat: latitude,
            lng: longitude,
            city: 'Your Location',
          });
          // Fetch weather and places for user's location
          fetchWeatherAndPlaces(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation error, using Hebbal fallback:', error);
          // Use Hebbal fallback
          fetchWeatherAndPlaces(13.2347, 77.6245);
        }
      );
    } else {
      console.warn('Geolocation not supported, using Hebbal fallback');
      // Use Hebbal fallback
      fetchWeatherAndPlaces(13.2347, 77.6245);
    }
  }, []);

  // Fetch weather for given coordinates
  const fetchWeatherAndPlaces = async (lat, lng) => {
    setWeatherLoading(true);
    setWeatherError('');

    try {
      // Fetch weather from Open-Meteo API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!weatherResponse.ok) throw new Error('Weather fetch failed');

      const weatherData = await weatherResponse.json();
      const temp = weatherData.current.temperature_2m;
      const humidity = weatherData.current.relative_humidity_2m;
      const weatherCode = weatherData.current.weather_code;

      setWeather({
        temp: Math.round(temp),
        humidity,
        code: weatherCode,
      });

      // Determine weather condition and suggestion
      let weatherCondition = 'perfect';
      let suggestion = '';

      if (temp > 32) {
        weatherCondition = 'hot';
        suggestion = t(
          '☀️ Hot & Sunny: Perfect for ice cream shops, juice bars, cafes & air-conditioned spots!',
          '☀️ ಬಿಸಿ ಮತ್ತು ಸೂರ್ಯ ಪ್ರಕಾಶಿತ: ಐಸ್ ಕ್ರೀಮ್ ಅಂಗಡಿ, ಜ್ಯೂಸ್ ಬಾರ್, ಕ್ಯಾಫೆ ಮತ್ತು ಶೀತವಾಯು ಸ್ಥಳಗಳಿಗೆ ಸೂಕ್ತ!'
        );
      } else if (temp < 15) {
        weatherCondition = 'cold';
        suggestion = t(
          '❄️ Cold & Chilly: Great for tea shops, cafes, restaurants & cozy indoor spots!',
          '❄️ ತಂಪು ಮತ್ತು ಚಳಿಚಾಚನೆ: ಚಹಾ ಅಂಗಡಿ, ಕ್ಯಾಫೆ, ರೆಸ್ಟೋರೆಂಟ್ ಮತ್ತು ಆರಾಮದಾಯಕ ಮೂಲಕ್ಕೆ ಸೂಕ್ತ!'
        );
      } else if (weatherCode > 50) {
        weatherCondition = 'rainy';
        suggestion = t(
          '🌧️ Rainy Season: Perfect for cafes, malls, restaurants & indoor entertainment!',
          '🌧️ ಮಳೆಯ ಋತು: ಕ್ಯಾಫೆ, ಮಾಲ್, ರೆಸ್ಟೋರೆಂಟ್ ಮತ್ತು ಒಳಾಂಗಣ ಮನೋರಂಜನೆಗೆ ಸೂಕ್ತ!'
        );
      } else {
        weatherCondition = 'perfect';
        suggestion = t(
          '🌈 Perfect Weather: Ideal for exploring parks, gardens, temples & outdoor adventures!',
          '🌈 ಪರಿಪೂರ್ಣ ಹವಾಮಾನ: ಪಾರ್ಕ್, ಉದ್ಯಾನ, ದೇವಾಲಯ ಮತ್ತು ಹೊರಾಂಗಣ ಸಾಹಸಿಕತೆಗೆ ಸೂಕ್ತ!'
        );
      }

      setSeasonalSuggestion(suggestion);

      // Fetch weather-appropriate places from Google Places
      await fetchWeatherAppropiatePlaces(lat, lng, weatherCondition);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setWeatherError('Unable to fetch weather');
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch places using Google Places API (Frontend only)
  const fetchWeatherAppropiatePlaces = async (lat, lng, weatherCondition) => {
    setPlacesLoading(true);

    try {
      // Map weather to place types for Google Places
      const typeMap = {
        hot: ['ice_cream_shop', 'cafe', 'restaurant', 'juice_bar', 'shopping_mall'],
        cold: ['cafe', 'restaurant', 'bakery', 'tea_house', 'hotel'],
        rainy: ['cafe', 'restaurant', 'shopping_mall', 'movie_theater', 'hotel'],
        perfect: ['park', 'garden', 'temple', 'viewpoint', 'cafe', 'restaurant'],
      };

      const types = typeMap[weatherCondition] || typeMap.perfect;
      const allPlaces = [];

      // Fetch from multiple place types
      for (const type of types) {
        try {
          const response = await fetch(
            `https://overpass-api.de/api/interpreter?data=[bbox:${lng - 0.1},${lat - 0.1},${lng + 0.1},${lat + 0.1}];(node["amenity"="${type.replace('_', ' ')}"];);out geom;`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.elements) {
              data.elements.forEach((element) => {
                if (element.tags && element.tags.name) {
                  allPlaces.push({
                    name: element.tags.name,
                    lat: element.lat,
                    lng: element.lon,
                    category: type,
                    rating: Math.random() * 2 + 3.5, // Mock rating
                  });
                }
              });
            }
          }
        } catch (err) {
          console.warn(`Error fetching ${type}:`, err);
        }
      }

      // Remove duplicates and limit to 12
      const uniquePlaces = Array.from(
        new Map(allPlaces.map((p) => [p.name, p])).values()
      ).slice(0, 12);

      setWeatherPlaces(uniquePlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
      setWeatherPlaces([]);
    } finally {
      setPlacesLoading(false);
    }
  };


{/*
  // Handle regular search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);

    try {
      // Search using Overpass API (Frontend only - NO backend)
      const searchType = searchQuery.toLowerCase();
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[bbox:${userLocation.lng - 0.15},${userLocation.lat - 0.15},${userLocation.lng + 0.15},${userLocation.lat + 0.15}];(node["name"~"${searchType}",i];way["name"~"${searchType}",i];);out geom;`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      const places = data.elements
        .filter((e) => e.tags && e.tags.name)
        .map((e) => ({
          _id: e.id,
          name: e.tags.name,
          category: e.tags.amenity || e.tags.tourism || 'Place',
          description: e.tags.description || '',
          lat: e.lat || e.center?.lat,
          lng: e.lon || e.center?.lon,
          rating: 4.5,
        }))
        .slice(0, 10);

      setSearchResults(places);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search places');
    } finally {
      setIsSearching(false);
    }
  };
*/}

    //new

    const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);

    try {
        const params = new URLSearchParams({
        q: searchQuery.trim(),
        city: currentCity.name || '',
        radius: String(radius),
        latitude: String(userLocation.lat),
        longitude: String(userLocation.lng),
        });

        const API_BASE = import.meta.env.VITE_API_URL;
        const backendUrl = `${API_BASE}/api/places/search?${params.toString()}`;

        console.log('Calling backend:', backendUrl);

        const response = await fetch(backendUrl);

        if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error ${response.status}: ${text}`);
        }

        const data = await response.json();
        const places = data.places || [];

        setSearchResults(places);

        if (places.length === 0) {
        setSearchError('No places found');
        }
    } catch (error) {
        console.error('Search error:', error);
        setSearchError(error.message || 'Failed to search places');
        setSearchResults([]);
    } finally {
        setIsSearching(false);
    }
    };


  // Open location in Google Maps
  const openLocationInMaps = (place) => {
    const placeName = typeof place.name === 'object' ? place.name?.en || place.name?.kn : place.name;
    const lat = place.lat || place.latitude;
    const lng = place.lng || place.longitude;

    if (lat && lng) {
      window.open(`https://www.google.com/maps/?q=${lat},${lng}`, '_blank');
    } else if (placeName) {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(placeName)}+Bengaluru`,
        '_blank'
      );
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
      {/* Background Video */}
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

      {/* Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 2,
        }}
      />

      {/* Main Content */}
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
        {/* Badge */}
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

        {/* Heading */}
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

        {/* Description */}
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

        {/* Stats */}
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

        {/* WEATHER BANNER - SEASONAL SUGGESTION */}
        {!weatherLoading && weather && (
          <div
            style={{
              width: '100%',
              maxWidth: '950px',
              margin: '0 auto 2rem',
              padding: '1.2rem 1.5rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255,107,53,0) 0%, rgba(255,209,102,0) 100%)',
              border: '1.5px solid rgba(255,107,53,0.3)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ flex: 1, minWidth: '250px', textAlign: 'left' }}>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffd166',
                  marginBottom: '0.5rem',
                }}
              >
                {weather.temp}°C | {t('Humidity', 'ಆರ್ದ್ರತೆ')}: {weather.humidity}% | 📍 {userLocation.city}
              </div>
              <div
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.5,
                }}
              >
                {seasonalSuggestion}
              </div>
            </div>
          </div>
        )}

        {/* WEATHER-BASED PLACES SECTION */}
        {!weatherLoading && weather && weatherPlaces.length > 0 && (
          <div
            style={{
              width: '100%',
              maxWidth: '950px',
              margin: '0 auto 2rem',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(10,14,30,0.8) 0%, rgba(20,30,60,0.8) 100%)',
                border: '1.5px solid rgba(255,107,53,0.2)',
                borderRadius: '18px',
                padding: '1.5rem',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffd166',
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                🎯 {t('Recommended for Today', 'ಇಂದಿನ ಶಿಫಾರಸುಗಳು')}
              </div>

              {placesLoading ? (
                <div
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.95rem',
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {t('Loading recommendations...', 'ಶಿಫಾರಸುಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...')}
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {weatherPlaces.map((place, idx) => {
                    const placeName = place.name || 'Place';
                    const placeCategory = place.category ? place.category.replace('_', ' ') : 'Spot';
                    const rating = (place.rating || 4.5).toFixed(1);

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem',
                          borderRadius: '14px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,107,53,0.15)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#ffd166',
                            fontWeight: 600,
                            marginBottom: '0.4rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {placeCategory}
                        </div>

                        <div
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            marginBottom: '0.6rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxHeight: '1.5rem',
                          }}
                          title={placeName}
                        >
                          {placeName}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.8rem',
                            fontSize: '0.9rem',
                            color: 'rgba(255,255,255,0.7)',
                          }}
                        >
                          <span>⭐ {rating}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => openLocationInMaps(place)}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.8rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,107,53,0.5)',
                            background: 'rgba(255,107,53,0.2)',
                            color: '#ffd166',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,107,53,0.4)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,107,53,0.2)';
                            e.currentTarget.style.color = '#ffd166';
                          }}
                        >
                          📍 {t('View Location', 'ಸ್ಥಳ ನೋಡಿ')}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEARCH SECTION */}
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
                  ? 'Search for "Ice Cream" or "Restaurant"...'
                  : '"ಐಸ್ ಕ್ರೀಮ್" ಅಥವಾ "ರೆಸ್ಟೋರೆಂಟ್" ಎಂದು ಹುಡುಕಿ...'
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
                const placeName = place.name || 'Unnamed place';
                const placeCategory = place.category || 'Place';

                return (
                  <div
                    key={place._id || index}
                    style={{
                      padding: '0.9rem',
                      borderBottom:
                        index !== searchResults.length - 1
                          ? '1px solid rgba(255,255,255,0.08)'
                          : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={() => openLocationInMaps(place)}
                  >
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#ffffff',
                      }}
                    >
                      📍 {placeName}
                    </div>

                    <div
                      style={{
                        marginTop: '0.2rem',
                        fontSize: '0.92rem',
                        color: 'rgba(255,255,255,0.72)',
                      }}
                    >
                      {placeCategory} • {userLocation.city}
                    </div>
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
