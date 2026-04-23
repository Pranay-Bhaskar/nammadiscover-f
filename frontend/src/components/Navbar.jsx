{/* 
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { state, dispatch } = useApp();
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const hideNavbarRoutes = ['/', '/login', '/signup'];

    if (hideNavbarRoutes.includes(location.pathname)) return null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        dispatch({ type: 'SET_THEME', payload: newTheme });
        document.body.className = newTheme;
    };

    const toggleLang = () => {
        const newLang = state.language === 'en' ? 'kn' : 'en';
        dispatch({ type: 'SET_LANGUAGE', payload: newLang });
    };

    const t = (en, kn) => state.language === 'en' ? en : kn;

    // Navigate to a hash section — the sections live on /dashboard
    const goToSection = (sectionId) => {
        if (location.pathname === '/dashboard') {
            // Already on dashboard — just scroll
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Navigate to dashboard passing the target section in router state
            navigate('/dashboard', { state: { scrollTo: sectionId } });
        }
    };

    const isHome = location.pathname === '/';

    return (
        <nav id="main-nav" style={{ background: scrolled ? undefined : 'transparent', borderBottom: scrolled ? undefined : 'none' }}>
            <div className="container nav-inner">
                <Link to="/dashboard" className="nav-logo">
                    Namma<span>Discover</span>
                </Link>

                {/* Section links *
                <div className="nav-links">
                    <Link to="/dashboard" className={`nav-link${isHome ? ' active' : ''}`}>Home</Link>
                    <button className="nav-link" onClick={() => goToSection('discover-section')}>{t('Discover', 'ಅನ್ವೇಷಿಸಿ')}</button>
                    <button className="nav-link" onClick={() => goToSection('map-section')}>{t('Map', 'ನಕ್ಷೆ')}</button>
                    <button className="nav-link" onClick={() => goToSection('ai-section')}>{t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}</button>
                    <button className="nav-link" onClick={() => goToSection('budget-section')}>{t('Budget Trip', 'ಬಜೆಟ್ ಪ್ರವಾಸ')}</button>
                </div>


                <div className="nav-actions">
                    <button className="icon-toggle" onClick={toggleTheme} title="Toggle Theme">
                        {state.theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button className="lang-toggle" onClick={toggleLang}>
                        {state.language === 'en' ? 'ಕನ್ನಡ' : 'English'}
                    </button>

                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Link to="/my-videos" className="btn btn-xs btn-ghost" title="My Videos">🎬</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="btn btn-xs btn-ghost" title="Admin Dashboard">🛡</Link>
                            )}
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{user.username}</span>
                            <button className="btn btn-xs btn-ghost" onClick={logout}>{t('Logout', 'ನಿರ್ಗಮನ')}</button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-xs btn-primary">{t('Login', 'ಲಾಗಿನ್')}</Link>
                    )}

                </div>

                <button id="hamburger">☰</button>
            </div>
        </nav>
    );
};

export default Navbar;
*/}


//new

{/*
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { state, dispatch } = useApp();
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const hideNavbarRoutes = ['/', '/login', '/signup'];

    if (hideNavbarRoutes.includes(location.pathname)) return null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        dispatch({ type: 'SET_THEME', payload: newTheme });
        document.body.className = newTheme;
    };

    const toggleLang = () => {
        const newLang = state.language === 'en' ? 'kn' : 'en';
        dispatch({ type: 'SET_LANGUAGE', payload: newLang });
    };

    const t = (en, kn) => (state.language === 'en' ? en : kn);

    const goToSection = (sectionId) => {
        if (location.pathname === '/dashboard') {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/dashboard', { state: { scrollTo: sectionId } });
        }
    };

    const handleLogout = () => {
        setProfileOpen(false);
        logout();
    };

    const isHome = location.pathname === '/';

    return (
        <nav
            id="main-nav"
            style={{
                background: scrolled ? undefined : 'transparent',
                borderBottom: scrolled ? undefined : 'none'
            }}
        >
            <div className="container nav-inner">
                <Link to="/dashboard" className="nav-logo">
                    Namma<span>Discover</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard" className={`nav-link${isHome ? ' active' : ''}`}>
                        Home
                    </Link>
                    <button className="nav-link" onClick={() => goToSection('discover-section')}>
                        {t('Discover', 'ಅನ್ವೇಷಿಸಿ')}
                    </button>
                    <button className="nav-link" onClick={() => goToSection('map-section')}>
                        {t('Map', 'ನಕ್ಷೆ')}
                    </button>
                    <button className="nav-link" onClick={() => goToSection('ai-section')}>
                        {t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}
                    </button>
                    <button className="nav-link" onClick={() => goToSection('budget-section')}>
                        {t('Budget Trip', 'ಬಜೆಟ್ ಪ್ರವಾಸ')}
                    </button>
                </div>

                <div className="nav-actions">
                    <button className="lang-toggle" onClick={toggleLang}>
                        {state.language === 'en' ? 'ಕನ್ನಡ' : 'English'}
                    </button>

                    {user ? (
                        <div
                            className="profile-menu-wrapper"
                            ref={profileRef}
                            style={{ position: 'relative' }}
                        >
                            <button
                                className="btn btn-xs btn-primary"
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                👤 {user.username}
                            </button>

                            {profileOpen && (
                                <div
                                    className="profile-dropdown"
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 8px)',
                                        right: 0,
                                        minWidth: '220px',
                                        background: 'var(--card-bg, #fff)',
                                        border: '1px solid var(--border-color, #ddd)',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                        padding: '10px',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            color: 'var(--primary)',
                                            padding: '6px 8px',
                                            borderBottom: '1px solid var(--border-color, #eee)'
                                        }}
                                    >
                                        {t('Profile', 'ಪ್ರೊಫೈಲ್')}
                                    </div>

                                    <Link
                                        to="/my-videos"
                                        className="btn btn-xs btn-ghost"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        🎬 {t('Upload Videos', 'ವೀಡಿಯೊ ಅಪ್‌ಲೋಡ್')}
                                    </Link>

                                    <button
                                        className="btn btn-xs btn-ghost"
                                        onClick={toggleTheme}
                                    >
                                        {state.theme === 'dark'
                                            ? `☀️ ${t('Light Mode', 'ಲೈಟ್ ಮೋಡ್')}`
                                            : `🌙 ${t('Dark Mode', 'ಡಾರ್ಕ್ ಮೋಡ್')}`}
                                    </button>

                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="btn btn-xs btn-ghost"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            🛡 {t('Admin Dashboard', 'ಆಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್')}
                                        </Link>
                                    )}

                                    <button
                                        className="btn btn-xs btn-ghost"
                                        onClick={handleLogout}
                                        style={{ color: 'crimson' }}
                                    >
                                        🚪 {t('Logout', 'ನಿರ್ಗಮನ')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-xs btn-primary">
                            {t('Login', 'ಲಾಗಿನ್')}
                        </Link>
                    )}
                </div>

                <button id="hamburger">☰</button>
            </div>
        </nav>
    );
};

export default Navbar;
*/}




// updated


import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { state, dispatch } = useApp();
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const hideNavbarRoutes = ['/', '/login', '/signup'];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (hideNavbarRoutes.includes(location.pathname)) return null;

    const toggleTheme = () => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        dispatch({ type: 'SET_THEME', payload: newTheme });
        document.body.className = newTheme;
        setProfileOpen(false);
    };

    const toggleLang = () => {
        const newLang = state.language === 'en' ? 'kn' : 'en';
        dispatch({ type: 'SET_LANGUAGE', payload: newLang });
    };

    const t = (en, kn) => (state.language === 'en' ? en : kn);

    const goToSection = (sectionId) => {
        if (location.pathname === '/dashboard') {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/dashboard', { state: { scrollTo: sectionId } });
        }
    };

    const handleLogout = () => {
        setProfileOpen(false);
        logout();
    };

    const isHome = location.pathname === '/dashboard';

    return (
        <nav
            id="main-nav"
            style={{
                background: scrolled ? undefined : 'transparent',
                borderBottom: scrolled ? undefined : 'none'
            }}
        >
            <div className="container nav-inner">
                <Link to="/dashboard" className="nav-logo">
                    Namma<span>Discover</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard" className={`nav-link${isHome ? ' active' : ''}`}>
                        {t('Home', 'ಮುಖಪುಟ')}
                    </Link>

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() => goToSection('discover-section')}
                    >
                        {t('Discover', 'ಅನ್ವೇಷಿಸಿ')}
                    </button>

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() => goToSection('map-section')}
                    >
                        {t('Map', 'ನಕ್ಷೆ')}
                    </button>

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() => goToSection('ai-section')}
                    >
                        {t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}
                    </button>

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() => goToSection('budget-section')}
                    >
                        {t('Budget Trip', 'ಬಜೆಟ್ ಪ್ರವಾಸ')}
                    </button>
                </div>

                <div className="nav-actions">
                    <button type="button" className="lang-toggle" onClick={toggleLang}>
                        {state.language === 'en' ? 'ಕನ್ನಡ' : 'English'}
                    </button>

                    {user ? (
                        <div className="profile-menu-wrapper" ref={profileRef}>
                            <button
                                type="button"
                                className="profile-trigger"
                                onClick={() => setProfileOpen((prev) => !prev)}
                            >
                                <span className="profile-icon">👤</span>
                                <span className="profile-label">{user?.username || 'Profile'}</span>
                                <span className={`profile-caret ${profileOpen ? 'open' : ''}`}>▾</span>
                            </button>

                            {profileOpen && (
                                <div className="profile-dropdown">
                                    <div className="profile-dropdown-header">
                                        <div className="profile-name">{user?.username || 'User'}</div>
                                        <div className="profile-subtext">
                                            {t('Manage your account', 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ')}
                                        </div>
                                    </div>

                                    <Link
                                        to="/my-videos"
                                        className="profile-dropdown-item"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <span>🎬</span>
                                        <span>{t('Upload Videos', 'ವೀಡಿಯೊ ಅಪ್‌ಲೋಡ್')}</span>
                                    </Link>

                                    <button
                                        type="button"
                                        className="profile-dropdown-item"
                                        onClick={toggleTheme}
                                    >
                                        <span>{state.theme === 'dark' ? '☀️' : '🌙'}</span>
                                        <span>
                                            {state.theme === 'dark'
                                                ? t('Light Mode', 'ಲೈಟ್ ಮೋಡ್')
                                                : t('Dark Mode', 'ಡಾರ್ಕ್ ಮೋಡ್')}
                                        </span>
                                    </button>

                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="profile-dropdown-item"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <span>🛡</span>
                                            <span>{t('Admin Dashboard', 'ಆಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್')}</span>
                                        </Link>
                                    )}

                                    <button
                                        type="button"
                                        className="profile-dropdown-item logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <span>🚪</span>
                                        <span>{t('Logout', 'ನಿರ್ಗಮನ')}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-xs btn-primary">
                            {t('Login', 'ಲಾಗಿನ್')}
                        </Link>
                    )}
                </div>

                <button id="hamburger" type="button">☰</button>
            </div>
        </nav>
    );
};

export default Navbar;
