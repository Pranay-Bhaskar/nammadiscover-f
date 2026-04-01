import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store/AppContext';

const RESPONSES = [
  {
    keys: ['hi', 'hello', 'hey', 'namaste', 'hola', 'greetings'],
    reply: "Namaste! 🙏 Welcome to NammaBot — your Karnataka travel guide. Ask me about famous places, best time to visit, local food, festivals, hidden gems, or anything about Karnataka tourism!"
  },
  {
    keys: ['how are you', "what's up", 'whats up'],
    reply: "I'm doing great, thanks for asking! Ready to help you explore beautiful Karnataka. What would you like to know?"
  },
  {
    keys: ['best time', 'good time', 'when to visit', 'when should i', 'right time', 'ideal time'],
    reply: "The best time to visit Karnataka is October to March 🌤️\n\n• Oct–Nov: Perfect for Coorg, Chikmagalur & waterfalls\n• Dec–Feb: Ideal for Hampi, Mysore & coastal beaches\n• Monsoon (Jul–Sep): Lush Western Ghats & full waterfalls\n• Avoid May–June: Extremely hot in most regions"
  },
  {
    keys: ['famous place', 'top place', 'must visit', 'popular place', 'best place', 'places to visit', 'where to go', 'tourist place', 'attractions'],
    reply: "Karnataka's top must-visit places:\n\n🏰 Mysore – Palace, temples & Dasara festival\n🪨 Hampi – UNESCO World Heritage ruins\n🌊 Gokarna – pristine beaches & temples\n🌿 Coorg – coffee plantations & misty hills\n🌄 Chikmagalur – trekking & coffee country\n⛵ Dandeli – adventure sports & wildlife\n🕌 Badami – ancient rock-cut cave temples\n🦁 Kabini – best wildlife safari in South India"
  },
  {
    keys: ['mysore', 'mysuru'],
    reply: "Mysore (Mysuru) — Karnataka's cultural capital! 🏛️\n\n• Mysore Palace – lit up every Sunday night\n• Chamundeshwari Temple on Chamundi Hill\n• Brindavan Gardens – musical fountain at dusk\n• Devaraja Market – spices, silk & sandalwood\n\nBest time: Oct–Feb. Must-see: Dasara festival in October!"
  },
  {
    keys: ['hampi'],
    reply: "Hampi — a UNESCO World Heritage surreal landscape! 🪨\n\n• Virupaksha Temple – active since 7th century\n• Vittala Temple & iconic Stone Chariot\n• Lotus Mahal & Elephant Stables\n• Hemakuta Hill – best sunrise spot\n• Tungabhadra River coracle rides\n\nBest time: Oct–Feb. Hire a cycle to explore!"
  },
  {
    keys: ['coorg', 'kodagu'],
    reply: "Coorg — the 'Scotland of India'! ☕\n\n• Coffee & spice plantation tours\n• Abbey Falls & Iruppu Falls\n• Nagarhole National Park\n• Tadiandamol Peak – highest point in Coorg\n• Authentic Kodava cuisine & culture\n\nBest time: Oct–Mar. Monsoon makes it incredibly lush!"
  },
  {
    keys: ['gokarna'],
    reply: "Gokarna — temples meet tranquil beaches! 🏖️\n\n• Om Beach – shaped like the OM symbol\n• Kudle Beach – quieter backpacker favourite\n• Mahabaleshwar Temple – one of Shiva's 7 sacred sites\n• Boat rides between beaches\n• Half Moon & Paradise beaches\n\nBest time: Oct–Mar. A peaceful alternative to Goa!"
  },
  {
    keys: ['chikmagalur', 'chikkamagaluru'],
    reply: "Chikmagalur — coffee country & trekking paradise! 🌄\n\n• Mullayanagiri – Karnataka's highest peak (1930m)\n• Hebbe Falls – stunning 168m two-tier waterfall\n• Coffee estate homestays & tours\n• Bhadra Wildlife Sanctuary\n• Kudremukh National Park\n\nBest time: Sep–Mar. Misty mornings are magical!"
  },
  {
    keys: ['bangalore', 'bengaluru'],
    reply: "Bengaluru — Garden City & Silicon Valley! 🌿\n\n• Lalbagh Botanical Garden & Glass House\n• Bangalore Palace – Tudor-style royal estate\n• Cubbon Park & Vidhana Soudha\n• Commercial Street & MG Road shopping\n• Tipu Sultan's Summer Palace\n\nAlso great base for day trips: Mysore (3h), Nandi Hills (1.5h), Shivanasamudra Falls (3h)"
  },
  {
    keys: ['food', 'cuisine', 'eat', 'dish', 'local food', 'famous food'],
    reply: "Karnataka's cuisine is a flavourful journey! 🍽️\n\n• Bisi Bele Bath – spiced rice & lentil hotpot\n• Ragi Mudde – finger millet balls with sambar\n• Mysore Pak – rich ghee-based sweet\n• Jolada Rotti – sorghum flatbread\n• Dharwad Peda – famous milk sweet\n• Coorg Pandi Curry – spicy pork specialty\n• Filter Kaapi – strong South Indian coffee ☕"
  },
  {
    keys: ['festival', 'celebration', 'event'],
    reply: "Karnataka's festivals are spectacular! 🎉\n\n• Mysore Dasara (Oct) – 10-day grand celebration, golden elephant procession\n• Hampi Utsav (Nov) – culture fest at the ruins\n• Ugadi (March/April) – Karnataka New Year\n• Pattadakal Dance Festival (Jan)\n• Vairamudi Festival at Melkote (Feb/March)\n\nDasara in Mysore is absolutely unmissable!"
  },
  {
    keys: ['wildlife', 'safari', 'animal', 'tiger', 'elephant'],
    reply: "Karnataka is a wildlife hotspot! 🐘\n\n• Kabini (Nagarhole) – best elephant & tiger sightings\n• Bandipur Tiger Reserve – Project Tiger success story\n• Bhadra Wildlife Sanctuary\n• Ranganthittu Bird Sanctuary – near Mysore\n• Cauvery Wildlife Sanctuary\n\nBest safari season: Oct–May. Kabini in Mar–May has incredible wildlife density!"
  },
  {
    keys: ['waterfall', 'falls'],
    reply: "Karnataka has stunning waterfalls! 💧\n\n• Jog Falls – India's 2nd highest at 253m (Shimoga)\n• Abbey Falls – Coorg, framed by coffee estates\n• Hebbe Falls – Chikmagalur, two-tier beauty\n• Shivanasamudra – twin falls near Bangalore\n• Iruppu Falls – Coorg, sacred site\n• Magod Falls – Yellapur, Western Ghats\n\nBest during Aug–Oct for maximum flow!"
  },
  {
    keys: ['beach'],
    reply: "Karnataka's coastline is a hidden gem! 🌊\n\n• Gokarna – Om, Kudle, Half Moon & Paradise beaches\n• Murudeshwar – giant Shiva statue by the sea\n• Karwar – clean uncrowded beaches near Goa\n• Malpe Beach – near Udupi, great for water sports\n• St Mary's Island – unique hexagonal rock formations\n\nBest time: Oct–Mar."
  },
  {
    keys: ['heritage', 'history', 'ancient', 'temple', 'historical'],
    reply: "Karnataka's heritage is extraordinary! 🏛️\n\n• Hampi – Vijayanagara ruins (UNESCO)\n• Badami Caves – 6th century rock-cut temples\n• Pattadakal – 8th century Chalukyan temples (UNESCO)\n• Aihole – cradle of Indian temple architecture\n• Belur & Halebidu – intricate Hoysala carvings\n• Shravanabelagola – 57ft Gomateshwara monolith\n\nTriangle: Badami–Aihole–Pattadakal is a must-do!"
  },
  {
    keys: ['trek', 'trekking', 'hike', 'hiking', 'adventure'],
    reply: "Karnataka is a trekker's paradise! ⛰️\n\n• Mullayanagiri, Chikmagalur – Karnataka's highest peak\n• Kudremukh – stunning grasslands & shola forests\n• Kumara Parvatha, Coorg – challenging & rewarding\n• Savandurga, near Bangalore – Asia's largest monolith\n• Brahmagiri, Coorg – misty hilltop trek\n\nBest season: Oct–Feb. Monsoon treks are lush but slippery!"
  },
  {
    keys: ['transport', 'how to reach', 'reach', 'getting there', 'travel', 'flight', 'train', 'bus'],
    reply: "Getting around Karnataka is easy! 🚂\n\n• Airports: Kempegowda (Bengaluru), Mangalore, Hubli, Belagavi\n• Rail: Mysore, Hubli, Mangalore, Hampi well-connected\n• KSRTC: Excellent state bus network\n• Self-drive: Popular for Coorg, Chikmagalur, coastal route\n\nFrom Bangalore: Mysore 3h • Hampi 6h • Coorg 5h • Gokarna 9h"
  },
  {
    keys: ['thank', 'thanks', 'thank you'],
    reply: "You're most welcome! 🙏 Karnataka has so much to offer — hope you have an amazing trip! Feel free to ask anything else."
  },
  {
    keys: ['bye', 'goodbye', 'see you', 'tata'],
    reply: "Goodbye! Safe travels and enjoy Karnataka! 🌿 Come back anytime for more travel tips. Namaskara! 🙏"
  },
];

const SUGGESTIONS = [
  'Best time to visit', 'Famous places', 'Local food',
  'Trekking spots', 'Wildlife safari', 'Beaches',
];

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keys.some(k => lower.includes(k))) return r.reply;
  }
  return "That's an interesting question! I specialize in Karnataka tourism. Try asking about:\n\n• Best time to visit\n• Famous places & attractions\n• Local food & cuisine\n• Wildlife & safaris\n• Waterfalls, beaches & treks\n• Festivals & heritage sites";
}

const Chatbot = () => {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! 🙏 I am NammaBot. How can I help you explore Karnataka today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const t = (en, kn) => state.language === 'en' ? en : kn;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: getBotReply(msg) }]);
    }, 700 + Math.random() * 400);
  };

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
          background: linear-gradient(135deg, #FF6B35, #FF4D6D);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 28px;
          box-shadow: 0 4px 15px rgba(255, 77, 109, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .chatbot-fab:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .chatbot-panel {
          position: fixed;
          bottom: 100px;
          right: 25px;
          width: 360px;
          height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chatbot-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .chatbot-header {
          background: linear-gradient(90deg, #1e293b, #0f172a);
          color: white;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-header h4 { margin: 0; font-size: 16px; font-weight: 700; }
        .chatbot-header p { margin: 2px 0 0; font-size: 12px; opacity: 0.7; }

        .chatbot-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          opacity: 0.8;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
        }

        .chat-msg {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 15px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .chat-msg.bot {
          background: white;
          color: #334155;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .chat-msg.user {
          background: #FF6B35;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }

        .chatbot-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 12px;
          background: white;
          border-top: 1px solid #f1f5f9;
        }

        .suggestion-chip {
          background: #f0fdf7;
          border: 1px solid #5DCAA5;
          color: #0F6E56;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .suggestion-chip:hover {
          background: #5DCAA5;
          color: white;
        }

        .chatbot-input {
          padding: 15px 20px;
          background: white;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 10px;
        }

        .chatbot-input input {
          flex: 1;
          border: 1px solid #e2e8f0;
          padding: 10px 15px;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
        }

        .chatbot-input button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FF6B35;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }

        .typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          margin: 0 2px;
          animation: bounce 1.2s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        @media (max-width: 480px) {
          .chatbot-panel {
            width: calc(100vw - 40px);
            right: 20px;
            bottom: 90px;
            height: 70vh;
          }
        }
      `}</style>

      <button className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : '🤖'}
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

          {isTyping && (
            <div className="chat-msg bot typing-indicator">
              <span /><span /><span />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {showSuggestions && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input">
          <input
            type="text"
            placeholder={t('Ask NammaBot...', 'ನಮ್ಮಬೋಟ್ ಅನ್ನು ಕೇಳಿ...')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={() => sendMessage()}>➜</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;