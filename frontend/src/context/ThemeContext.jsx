import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('nammadiscover_theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('nammadiscover_theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('nammadiscover_theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
