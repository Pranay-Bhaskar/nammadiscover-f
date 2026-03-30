import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

const Chatbot = () => {
    const { state } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Namaste! I am NammaBot. How can I help you explore Karnataka today?' }
    ]);
    const [input, setInput] = useState('');

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMsgs = [...messages, { role: 'user', text: input }];
        setMessages(newMsgs);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: 'That sounds like a great plan! I suggest checking out some hidden gems in the Western Ghats.'
            }]);
        }, 1000);
    };

    return (
        <>
            <button className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
                🤖
            </button>

            <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div>
                        <h4>NammaBot AI</h4>
                        <p>{t('Online', 'ಆನ್‌ಲೈನ್')}</p>
                    </div>
                    <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`chat-msg ${m.role}`}>
                            {m.text}
                        </div>
                    ))}
                </div>

                <div className="chatbot-input">
                    <input
                        type="text"
                        placeholder={t('Ask NammaBot...', 'ನಮ್ಮಬೋಟ್ ಅನ್ನು ಕೇಳಿ...')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>➜</button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
