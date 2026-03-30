import React from 'react';
import { useApp } from '../store/AppContext';

const Footer = () => {
    const { state } = useApp();
    const t = (en, kn) => state.language === 'en' ? en : kn;

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-logo">Namma<span>Discover</span></div>
                        <p className="footer-tagline">
                            {t('Rediscover the soul of Karnataka through the eyes of locals. Authentic, verified, and community-driven.', 'ಸ್ಥಳೀಯರ ಕಣ್ಣುಗಳ ಮೂಲಕ ಕರ್ನಾಟಕದ ಆತ್ಮವನ್ನು ಮರುಶೋಧಿಸಿ. ಅಪ್ಪಟ, ಪರಿಶೀಲಿಸಿದ ಮತ್ತು ಸಮುದಾಯ ಪ್ರೇರಿತ.')}
                        </p>
                        <div className="footer-social">
                            <button className="social-btn">FB</button>
                            <button className="social-btn">IG</button>
                            <button className="social-btn">TW</button>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">{t('Quick Links', 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು')}</h4>
                        <ul className="footer-links">
                            <li><a href="#hero">{t('Home', 'ಮನೆ')}</a></li>
                            <li><a href="#discover-section">{t('Discover', 'ಅನ್ವೇಷಿಸಿ')}</a></li>
                            <li><a href="#map-section">{t('Map', 'ನಕ್ಷೆ')}</a></li>
                            <li><a href="#explorer-section">{t('Become Explorer', 'ಅನ್ವೇಷಕರಾಗಿ')}</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">{t('Community', 'ಸಮುದಾಯ')}</h4>
                        <ul className="footer-links">
                            <li><a href="#">{t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು')}</a></li>
                            <li><a href="#">{t('Heritage Stories', 'ಪರಂಪರೆಯ ಕಥೆಗಳು')}</a></li>
                            <li><a href="#">{t('NammaBot AI', 'ನಮ್ಮಬೋಟ್ AI')}</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4 className="footer-col-title">{t('Newsletter', 'ಸುದ್ದಿಪತ್ರ')}</h4>
                        <p>{t('Get secret spots delivered to your inbox.', 'ರಹಸ್ಯ ಸ್ಥಳಗಳು ನಿಮ್ಮ ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ತಲುಪಲಿ.')}</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="email@example.com" />
                            <button className="btn btn-xs btn-primary">{t('Join', 'ಸೇರಿ')}</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">&copy; 2026 NammaDiscover. {t('Made with ❤️ in Karnataka.', 'ಕರ್ನಾಟಕದಲ್ಲಿ ❤️ ಯೊಂದಿಗೆ ಮಾಡಲ್ಪಟ್ಟಿದೆ.')}</div>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
