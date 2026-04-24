import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store/AppContext';

const Chatbot = () => {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const t = (en, kn) => state.language === 'en' ? en : kn;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <style>{`
        .chatbot-fab {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 26px;
          box-shadow: 0 8px 25px rgba(99,102,241,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-panel {
          position: fixed;
          bottom: 100px;
          right: 25px;
          width: 360px;
          height: 500px;
          background: #0f172a;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .chatbot-panel.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .chatbot-header {
          background: linear-gradient(90deg, #1e293b, #020617);
          color: white;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-body {
          position: relative;
          height: calc(100% - 70px);
        }

        /* 🔥 BLUR CONTENT */
        .chatbot-blur {
          filter: blur(5px);
          opacity: 0.4;
          pointer-events: none;
        }

        /* 🔥 OVERLAY */
        .chatbot-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 5;
          padding: 20px;
        }

        .coming-badge {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
          box-shadow: 0 0 20px rgba(139,92,246,0.6);
        }

        .coming-text {
          color: #cbd5f5;
          font-size: 14px;
          opacity: 0.9;
        }

        /* FAKE CHAT PREVIEW */
        .fake-msg {
          background: #1e293b;
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 8px;
          font-size: 13px;
          color: #94a3b8;
          width: 80%;
        }

        .fake-msg.user {
          align-self: flex-end;
          background: #6366f1;
          color: white;
        }

        .fake-container {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

      `}</style>

      {/* FAB */}
      <button className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>

      {/* PANEL */}
      <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
        
        <div className="chatbot-header">
          <div>
            <h4>NammaBot AI</h4>
            <p style={{ fontSize: '12px', opacity: 0.6 }}>
              {t('AI Travel Assistant', 'AI ಸಹಾಯಕ')}
            </p>
          </div>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chatbot-body">

          {/* 🔥 BLURRED PREVIEW */}
          <div className="chatbot-blur fake-container">
            <div className="fake-msg">Best places in Karnataka?</div>
            <div className="fake-msg user">Show me hidden gems</div>
            <div className="fake-msg">Sure! Try Coorg, Hampi & Gokarna...</div>
          </div>

          {/* 🔥 OVERLAY */}
          <div className="chatbot-overlay">
            <div className="coming-badge">
              {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
            </div>

            <div className="coming-text">
              {t(
                'NammaBot AI will soon provide smart travel suggestions, itinerary planning and local insights.',
                'AI ಆಧಾರಿತ ಪ್ರವಾಸ ಸಲಹೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿವೆ.'
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Chatbot;
