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
                <Link to="/" className="nav-logo">
                    Namma<span>Discover</span>
                </Link>

                {/* Section links */}
                <div className="nav-links">
                    <Link to="/" className={`nav-link${isHome ? ' active' : ''}`}>Home</Link>
                    <button className="nav-link" onClick={() => goToSection('discover-section')}>{t('Discover', 'ಅನ್ವೇಷಿಸಿ')}</button>
                    {/* <Link to="/#gallery-section" className="nav-link" onClick={(e) => {
                        e.preventDefault();
                        if (location.pathname === '/') {
                            const el = document.getElementById('gallery-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            navigate('/', { state: { scrollTo: 'gallery-section' } });
                        }
                    }}>{t('Gallery', 'ಗ್ಯಾಲರಿ')}</Link> */}
                    <button className="nav-link" onClick={() => goToSection('map-section')}>{t('Map', 'ನಕ್ಷೆ')}</button>
                    <button className="nav-link" onClick={() => goToSection('ai-section')}>{t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}</button>
                    <button className="nav-link" onClick={() => goToSection('budget-section')}>{t('Budget Trip', 'ಬಜೆಟ್ ಪ್ರವಾಸ')}</button>
                    <button className="nav-link" onClick={() => goToSection('explorer-section')}>{t('Explore', 'ಅನ್ವೇಷಣೆ')}</button>
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