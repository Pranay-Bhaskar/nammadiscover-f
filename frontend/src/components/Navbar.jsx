import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { state, dispatch } = useApp();
    const { user, logout } = useAuth();

    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ✅ NEW (does not affect existing logic)
    const [activeSection, setActiveSection] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const hideNavbarRoutes = ['/', '/login', '/signup'];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // ✅ NEW: section tracking
            const sections = ['discover-section', 'map-section'];
            let current = '';

            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop - 120;
                    if (window.scrollY >= top) {
                        current = id;
                    }
                }
            });

            setActiveSection(current);
        };

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
        setMobileMenuOpen(false);
        if (location.pathname === '/dashboard') {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/dashboard', { state: { scrollTo: sectionId } });
        }
    };

    const handleLogout = () => {
        setProfileOpen(false);
        navigate('/', { replace: true });
        setTimeout(() => {
            logout();
        }, 0);
    };
    const isHome = location.pathname === '/dashboard';

    const extraStyles = (
        <style>{`
            .nav-inner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                gap: 10px;
            }

            .nav-logo {
                white-space: nowrap;
                flex-shrink: 1;
                font-size: 1.5rem;
            }

            .nav-actions {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-shrink: 0;
            }

            .coming-soon-badge {
                font-size: 8px;
                background: var(--gradient-sunset, linear-gradient(45deg, #ff512f, #dd2476));
                color: white;
                padding: 2px 6px;
                border-radius: 10px;
                margin-left: 6px;
                text-transform: uppercase;
                font-weight: 800;
                letter-spacing: 0.5px;
                animation: pulse-badge 2s infinite;
                white-space: nowrap;
            }

            .disabled-link {
                opacity: 0.5 !important;
                cursor: not-allowed !important;
                pointer-events: none;
            }

            @keyframes pulse-badge {
                0% { opacity: 0.8; transform: scale(0.95); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0.8; transform: scale(0.95); }
            }

            #hamburger {
                display: none;
                font-size: 24px;
                background: none;
                border: none;
                color: var(--text);
                cursor: pointer;
                padding: 5px;
            }

            @media (max-width: 768px) {
                #hamburger { display: block; }
                
                .nav-logo { font-size: 1.1rem; }

                .nav-links {
                    display: ${mobileMenuOpen ? 'flex' : 'none'};
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: var(--glass);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                    z-index: 999;
                }

                .profile-label { display: none; }
            }
        `}</style>
    );

    const ComingSoon = () => (
        <span className="coming-soon-badge">{t('Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}</span>
    );

    return (
        <nav
            id="main-nav"
            style={{
                background: scrolled ? undefined : 'transparent',
                borderBottom: scrolled ? undefined : 'none',
                position: 'fixed',
                width: '100%',
                zIndex: 1000
            }}
        >
            {extraStyles}

            <div className="container nav-inner">
                <Link to="/dashboard" className="nav-logo">
                  Namma<span className="logo-accent">Discover</span>
                </Link>

                <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                    
                    {/* ✅ HOME */}
                    <Link
                        to="/dashboard"
                        className={`nav-link${isHome && !activeSection ? ' active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t('Home', 'ಮುಖಪುಟ')}
                    </Link>

                    {/* ✅ DISCOVER */}
                    <button
                        type="button"
                        className={`nav-link${activeSection === 'discover-section' ? ' active' : ''}`}
                        onClick={() => goToSection('discover-section')}
                    >
                        {t('Discover', 'ಅನ್ವೇಷಿಸಿ')}
                    </button>

                    {/* ✅ MAP */}
                    <button
                        type="button"
                        className={`nav-link${activeSection === 'map-section' ? ' active' : ''}`}
                        onClick={() => goToSection('map-section')}
                    >
                        {t('Map', 'ನಕ್ಷೆ')}
                    </button>

                    <button type="button" className="nav-link disabled-link" disabled>
                        {t('AI Picks', 'AI ಆಯ್ಕೆಗಳು')}
                        <ComingSoon />
                    </button>

                    <button type="button" className="nav-link disabled-link" disabled>
                        {t('Budget Trip', 'ಬಜೆಟ್ ಪ್ರವಾಸ')}
                        <ComingSoon />
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

                                    <Link to="/my-videos" className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                                        <span>🎬</span>
                                        <span>{t('Upload Videos', 'ವೀಡಿಯೊ ಅಪ್‌ಲೋಡ್')}</span>
                                    </Link>

                                    <button type="button" className="profile-dropdown-item" onClick={toggleTheme}>
                                        <span>{state.theme === 'dark' ? '☀️' : '🌙'}</span>
                                        <span>
                                            {state.theme === 'dark'
                                                ? t('Light Mode', 'ಲೈಟ್ ಮೋಡ್')
                                                : t('Dark Mode', 'ಡಾರ್ಕ್ ಮೋಡ್')}
                                        </span>
                                    </button>

                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                                            <span>🛡</span>
                                            <span>{t('Admin Dashboard', 'ಆಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್')}</span>
                                        </Link>
                                    )}

                                    <button type="button" className="profile-dropdown-item logout-btn" onClick={handleLogout}>
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

                    <button
                        id="hamburger"
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
