import React from 'react';
import { useApp } from '../../store/AppContext';

const BusinessSection = () => {
    const { state, locations } = useApp();
    const t = (en, kn) => state.language === 'en' ? en : kn;

    const legacySpots = locations.filter(loc => loc.isFamilyRun || loc.yearsInOperation > 50).slice(0, 3);

    return (
        <section id="business-section" className="section section-alt">
            <div className="container">
                <div className="section-head">
                    <div className="section-label">{t('Heritage Businesses', 'ಪಾರಂಪರಿಕ ಉದ್ಯಮಗಳು')}</div>
                    <h2 className="section-title">{t('Support Family-Run Gems', 'ಕುಟುಂಬ ನಡೆಸುವ ರತ್ನಗಳನ್ನು ಬೆಂಬಲಿಸಿ')}</h2>
                </div>

                <div className="grid-3">
                    {legacySpots.map(biz => (
                        <div key={biz._id} className="business-card">
                            <div className="business-icon">{biz.category_icon || '🏢'}</div>
                            <div className="business-badge">{t('LEGACY BUSINESS', 'ಪಾರಂಪರಿಕ ಉದ್ಯಮ')}</div>
                            <h3 className="business-name">{biz.displayName || biz.name?.en}</h3>
                            <div className="business-years">{biz.yearsInOperation}+ {t('Years in Operation', 'ವರ್ಷಗಳ ಕಾರ್ಯಾಚರಣೆ')}</div>
                            <p className="business-desc">{(biz.displayDescription || biz.description?.en || '').substring(0, 100)}...</p>
                            <div className="business-tags">
                                {biz.tags.slice(0, 3).map(tag => <span key={tag} className="business-tag">{tag}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessSection;
