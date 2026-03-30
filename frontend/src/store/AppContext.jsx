import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import en from '../i18n/en.json';
import kn from '../i18n/kn.json';

const AppContext = createContext(null);

const STORAGE_KEYS = { SAVED: 'kt_saved', ITINERARY: 'kt_itinerary', DARK: 'kt_dark', LANG: 'kt_lang' };

import { CATEGORIES } from '../map/constants';

export function AppProvider({ children }) {
  // Global Data
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [explorers, setExplorers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state (Original + MapEngine)
  const [currentCity, setCurrentCity] = useState('bengaluru');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES.map(c => c.id));
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // UI state
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(STORAGE_KEYS.DARK) !== 'false');
  const [language, setLanguage] = useState(() => localStorage.getItem(STORAGE_KEYS.LANG) || 'en');
  
  // Translation (MapEngine Data + Helper)
  const t = language === 'en' ? en : kn;
  const t_func = (en_str, kn_str) => language === 'en' ? en_str : kn_str;

  // Saved / Itinerary
  const [savedPlaces, setSavedPlaces] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED) || '[]'); } catch { return []; }
  });
  const [itinerary, setItinerary] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ITINERARY) || '[]'); } catch { return []; }
  });

  // MapEngine Specific
  const [activeLocation, setActiveLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(null);

  const setAllCategories = useCallback(() => {
    setSelectedCategories(CATEGORIES.map(c => c.id));
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [locRes, cityRes, revRes, expRes] = await Promise.all([
        axios.get(`${API_URL}/locations`),
        axios.get(`${API_URL}/cities`),
        axios.get(`${API_URL}/reviews`),
        axios.get(`${API_URL}/explorers`)
      ]);
      setLocations(locRes.data);
      setCities(cityRes.data);
      setReviews(revRes.data);
      setExplorers(expRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK, darkMode);
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ITINERARY, JSON.stringify(itinerary));
  }, [itinerary]);

  // Actions
  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleDarkMode = toggleTheme;
  const toggleLang = () => setLanguage(prev => prev === 'en' ? 'kn' : 'en');
  const toggleLanguage = toggleLang;

  const toggleCategory = useCallback((id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }, []);

  const toggleSaved = (loc) => {
    setSavedPlaces(prev => {
        const exists = prev.find(p => p._id === loc._id);
        return exists ? prev.filter(p => p._id !== loc._id) : [...prev, loc];
    });
  };

  const addToItinerary = (loc) => {
    setItinerary(prev => prev.find(p => p._id === loc._id) ? prev : [...prev, loc]);
  };

  const removeFromItinerary = (id) => {
    setItinerary(prev => prev.filter(p => p._id !== id));
  };

  const isSaved = useCallback((id) => !!savedPlaces.find(p => p._id === id), [savedPlaces]);
  const isInItinerary = useCallback((id) => !!itinerary.find(p => p._id === id), [itinerary]);

  const value = {
      locations, setLocations,
      cities, setCities,
      reviews, setReviews,
      explorers, setExplorers,
      loading,
      currentCity, setCurrentCity,
      selectedCity, setSelectedCity,
      selectedCategories, setSelectedCategories, toggleCategory,
      verifiedOnly, setVerifiedOnly,
      darkMode, toggleDarkMode, toggleTheme,
      language, toggleLanguage, toggleLang,
      t, t_func,
      savedPlaces, toggleSaved,
      itinerary, setItinerary, addToItinerary, removeFromItinerary,
      activeLocation, setActiveLocation,
      userLocation, setUserLocation,
      showFilter, setShowFilter,
      setAllCategories,
      isSaved, isInItinerary,
      audioPlaying, setAudioPlaying,
      fetchData
  };

  // Compatibility state
  const state = { 
      theme: darkMode ? 'dark' : 'light', 
      language, 
      currentCity,
      cities,
      locations,
      explorers,
      reviews,
      darkMode,
      selectedCategories,
      selectedCity,
      userLocation,
      showSaved,
      showItinerary,
      showFilter
  };

  const dispatch = ({ type, payload }) => {
    switch(type) {
        case 'SET_THEME': setDarkMode(payload === 'dark'); break;
        case 'SET_LANGUAGE': setLanguage(payload); break;
        case 'SET_CITY': setCurrentCity(payload); break;
        default: break;
    }
  };

  return (
    <AppContext.Provider value={{ ...value, state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
