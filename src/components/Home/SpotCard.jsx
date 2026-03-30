import React from 'react';
import { useApp } from '../../store/AppContext';

const SpotCard = ({ spot }) => {
    const { toggleSaved, savedPlaces } = useApp();
    const isSaved = savedPlaces.some(p => p._id === spot._id);

    return (
        <>
            {/* 🔥 PREMIUM CARD CSS */}
            <style>{`
                .spot-card {
                    border-radius: 20px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(18px);
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
                    transition: all 0.4s ease;
                    position: relative;
                }

                .spot-card:hover {
                    transform: translateY(-12px) scale(1.02);
                    box-shadow: 0 25px 60px rgba(0,0,0,0.6);
                }

                /* IMAGE */
                .spot-card-img {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .spot-card-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .spot-card:hover .spot-card-img img {
                    transform: scale(1.1);
                }

                /* DARK GRADIENT OVERLAY */
                .spot-card-img::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
                }

                /* BADGES */
                .spot-card-badges {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    z-index: 2;
                }

                .badge {
                    padding: 4px 8px;
                    border-radius: 999px;
                    font-size: 0.65rem;
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(6px);
                    color: white;
                }

                .badge-gem {
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                }

                /* FAVORITE BUTTON */
                .fav-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 3;
                    background: rgba(0,0,0,0.4);
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .fav-btn.active {
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                }

                .fav-btn:hover {
                    transform: scale(1.2);
                }

                /* BODY */
                .spot-card-body {
                    padding: 1rem;
                    color: #fff;
                }

                .spot-card-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 6px;
                }

                .spot-card-desc {
                    font-size: 0.85rem;
                    color: #ccc;
                    line-height: 1.4;
                    margin-bottom: 1rem;
                }

                /* FOOTER */
                .spot-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* PROGRESS BAR */
                .auth-score-bar {
                    width: 80px;
                    height: 6px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .auth-score-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff6b35, #ff3e6c);
                    transition: width 0.8s ease;
                }

                .auth-score-num {
                    font-size: 0.7rem;
                    margin-left: 5px;
                    color: #aaa;
                }

                /* STARS */
                .stars {
                    font-size: 0.8rem;
                    color: #ffd700;
                }

                /* GLOW EFFECT */
                .spot-card::before {
                    content: "";
                    position: absolute;
                    inset: -2px;
                    border-radius: 22px;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    opacity: 0;
                    z-index: -1;
                    filter: blur(15px);
                    transition: 0.4s;
                }

                .spot-card:hover::before {
                    opacity: 0.6;
                }
            `}</style>

            <div className="spot-card">
                <div className="spot-card-img">
                    <img src={spot.images[0]} alt={spot.name} />

                    <div className="spot-card-badges">
                        <span className="badge badge-cat">{spot.category}</span>
                        {spot.verifiedLocal && <span className="badge badge-verified">✓ Verified Local</span>}
                        {spot.isFamilyRun && <span className="badge badge-family">👨‍👩‍👧 Family Run</span>}
                        {spot.authenticityScore > 90 && <span className="badge badge-gem">💎 Gem</span>}
                    </div>

                    <button
                        className={`fav-btn ${isSaved ? 'active' : ''}`}
                        onClick={() => toggleSaved(spot)}
                    >
                        ❤️
                    </button>
                </div>

                <div className="spot-card-body">
                    <h3 className="spot-card-title">{spot.displayName || spot.name?.en}</h3>
                    <p className="spot-card-desc">{spot.displayDescription || spot.description?.en}</p>

                    <div className="spot-card-footer">
                        <div className="auth-score">
                            <div className="auth-score-bar">
                                <div
                                    className="auth-score-fill"
                                    style={{ width: `${spot.authenticityScore}%` }}
                                ></div>
                            </div>
                            <span className="auth-score-num">{spot.authenticityScore}%</span>
                        </div>

                        <div className="stars">
                            {'★'.repeat(Math.round(spot.rating))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpotCard;