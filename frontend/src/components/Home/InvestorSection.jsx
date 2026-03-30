import React from 'react';
import { useApp } from '../../store/AppContext';

const InvestorSection = () => {
    const { state } = useApp();
    const t = (en, kn) => state.language === 'en' ? en : kn;

    return (
        <section id="investor-section">
            <div className="container inv-inner">
                <div className="inv-label">{t('INVESTOR RELATIONS', 'ಹೂಡಿಕೆದಾರರ ಸಂಬಂಧಗಳು')}</div>
                <h2 className="inv-title">{t('The Future of Hyper-Local Travel', 'ಸ್ಥಳೀಯ ಪ್ರವಾಸೋದ್ಯಮದ ಭವಿಷ್ಯ')}</h2>
                <p className="inv-sub">
                    {t('NammaDiscover is building India\'s first AI-powered authenticity engine for tourism.', 'ನಮ್ಮ ಡಿಸ್ಕವರ್ ಪ್ರವಾಸೋದ್ಯಮಕ್ಕಾಗಿ ಭಾರತದ ಮೊದಲ AI-ಚಾಲಿತ ಅಪ್ಪಟ ಎಂಜಿನ್ ಅನ್ನು ನಿರ್ಮಿಸುತ್ತಿದೆ.')}
                </p>

                <div className="inv-kpi">
                    <div className="kpi-card">
                        <div className="kpi-num">12k+</div>
                        <div className="kpi-label">{t('Active Users', 'ಸಕ್ರಿಯ ಬಳಕೆದಾರರು')}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-num">85%</div>
                        <div className="kpi-label">{t('Retention Rate', 'ಬಳಕೆದಾರರ ಉಳಿಸಿಕೊಳ್ಳುವ ದರ')}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-num">₹2.4Cr</div>
                        <div className="kpi-label">{t('Revenue Pipeline', 'ಆದಾಯದ ಮಾರ್ಗ')}</div>
                    </div>
                </div>

                <div className="inv-cta">
                    <button className="btn btn-gold">{t('Request Pitch Deck', 'ಪಿಚ್ ಡೆಕ್ ವಿನಂತಿಸಿ')}</button>
                    <button className="btn btn-ghost">{t('View Roadmap', 'ರೋಡ್‌ಮ್ಯಾಪ್ ನೋಡಿ')}</button>
                </div>
            </div>
        </section>
    );
};

export default InvestorSection;
