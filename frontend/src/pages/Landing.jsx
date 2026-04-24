import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Animated counter ── */
function useCounter(target, active, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

/* ── Mouse parallax hook ── */
function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return pos;
}

/* ══ DATA ══════════════════════════════════════════════════════════ */
const SPOTS = [
  { emoji: '🏯', tag: 'Heritage', title: 'Hampi Ruins', sub: 'Vijayanagara, Ballari', desc: "A UNESCO World Heritage City — 1500s empire frozen in stone. Explore 1,600 monuments across a surreal boulder landscape.", gradient: 'linear-gradient(145deg,#b85c0a,#7c3205)', verified: true, rating: 4.9, visitors: '2.4L/year', bestTime: 'Oct–Feb', guide: 'Ravi Gowda' },
  { emoji: '🌊', tag: 'Nature', title: 'Jog Falls', sub: 'Shivamogga', desc: "India's second-highest plunge waterfall. Locals know the hidden trail to the misty base that no tourist guide mentions.", gradient: 'linear-gradient(145deg,#1a6b4a,#093d28)', verified: true, rating: 4.8, visitors: '1.8L/year', bestTime: 'Aug–Sep', guide: 'Meera Iyer' },
  { emoji: '☕', tag: 'Food', title: 'Coorg Plantations', sub: 'Kodagu', desc: "Family-run coffee estates where they pour freshly brewed estate coffee before you've even checked in. No filters — literal or figurative.", gradient: 'linear-gradient(145deg,#6b3a1a,#3d1e09)', verified: true, rating: 5.0, visitors: '90K/year', bestTime: 'Nov–Mar', guide: 'Ravi Gowda' },
  { emoji: '🛕', tag: 'Temples', title: 'Belur & Halebidu', sub: 'Hassan District', desc: '12th-century Hoysala temples with 1,000+ sculptures carved without mortar. Each panel is a story waiting for a local to tell it.', gradient: 'linear-gradient(145deg,#c8652a,#7a3210)', verified: true, rating: 4.9, visitors: '3L/year', bestTime: 'Oct–Mar', guide: 'Anjali Shetty' },
  { emoji: '🎭', tag: 'Culture', title: 'Yakshagana Show', sub: 'Udupi / Dharwad', desc: 'Ancient dance-drama merging music, costume and folklore — performed overnight in village courtyards, not on a tourist stage.', gradient: 'linear-gradient(145deg,#8b1a1a,#4a0d0d)', verified: false, rating: 4.7, visitors: '40K/year', bestTime: 'Dec–Apr', guide: 'Vinod Kumar' },
  { emoji: '🏝️', tag: 'Nature', title: 'Murudeshwar Shore', sub: 'Uttara Kannada', desc: "Beyond the famous Shiva statue is a quiet shoreline where fishermen dry nets at dawn and nobody else is around.", gradient: 'linear-gradient(145deg,#0d4f6b,#072d3d)', verified: true, rating: 4.8, visitors: '1.2L/year', bestTime: 'Oct–Feb', guide: 'Anjali Shetty' },
];

const TESTIMONIALS = [
  { name: 'Priya Nair', city: 'Bengaluru → Coorg', text: 'NammaDiscover changed how I travel. I met a coffee farmer who invited us to his family dinner. That evening was worth more than any resort stay.', rating: 5, avatar: '👩', bg: '#1a6b4a' },
  { name: 'Arjun Hegde', city: 'Mumbai → Hampi', text: "My guide Ravi showed me cave temples not on any map. Zero tourists, pure magic. I've used a dozen travel apps — none come close to this.", rating: 5, avatar: '👨', bg: '#b85c0a' },
  { name: 'Divya Krishnamurthy', city: 'Hyderabad → Hassan', text: 'The bilingual listing for Belur was incredible — Kannada descriptions unlocked stories the English ones missed entirely. Masterpiece of a product.', rating: 5, avatar: '👩', bg: '#7b2d8b' },
  { name: 'Suresh Patil', city: 'Pune → Dharwad', text: 'NammaBot told me about a Yakshagana performance in a village 12 km off the highway. Slept under stars afterwards. Unreal.', rating: 5, avatar: '🧑', bg: '#0d4f6b' },
];

const GUIDES = [
  { name: 'Meera Iyer', city: 'Mysuru', emoji: '👩', specialty: 'Heritage & Palace Walks', reviews: 142, trips: 89, languages: 'Kannada, English, Hindi', color: '#c8652a' },
  { name: 'Ravi Gowda', city: 'Coorg', emoji: '👨', specialty: 'Coffee Estates & Forests', reviews: 98, trips: 61, languages: 'Kannada, English', color: '#1a6b4a' },
  { name: 'Anjali Shetty', city: 'Mangaluru', emoji: '👩', specialty: 'Coastal Cuisine & Temples', reviews: 211, trips: 134, languages: 'Kannada, Tulu, English', color: '#0d4f6b' },
  { name: 'Vinod Kumar', city: 'Hampi', emoji: '🧑', specialty: 'Ruins & Mythology', reviews: 175, trips: 110, languages: 'Kannada, English, French', color: '#7b2d8b' },
];

const BOT_CONVERSATIONS = [
  {
    user: "Best non-touristy breakfast in Bengaluru?",
    bot: '🍽️ Try "Veena Stores" in Malleshwaram — family-run since 1936, cash only, closes 11 AM. Queue at 7. The khali dose is legendary.'
  },
  {
    user: "Off-the-beaten path near Hampi?",
    bot: '🏯 Anegundi village across the river — older than Vijayanagara itself. Coracle for ₹30. No tourists, just locals and ruins.'
  },
  {
    user: "Hidden waterfall in Coorg?",
    bot: '🌿 Abbey Falls is known, but Iruppu Falls near Brahmagiri is 3x more stunning. Best after monsoon (Aug–Oct). Local guide Ravi knows the trail.'
  },
  {
    user: "Where to eat authentic Coorgi food?",
    bot: '☕ "Tamara" in Madikeri does real pandi curry. Or better — ask your homestay owner. Most Kodava families feed guests if you just ask nicely.'
  },
];

/* ── NammaBot Chat Widget ── */
const NammaBotChat = ({ t, language }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '🙏 Namaskara! Ask me anything about Karnataka — food, hidden spots, festivals, or local guides.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [suggIdx, setSuggIdx] = useState(0);
  const endRef = useRef(null);

  const suggestions = [
    "Best street food in Mysuru?",
    "Hidden gems near Bengaluru?",
    "When is Dasara in 2025?",
    "Cheapest trek in Coorg?",
    "Authentic Udupi restaurant?",
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setTyping(true);

    const conv = BOT_CONVERSATIONS[Math.floor(Math.random() * BOT_CONVERSATIONS.length)];
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: conv.bot }]);
      setSuggIdx(i => (i + 1) % suggestions.length);
    }, 1200 + Math.random() * 800);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 420, background: '#0a0a0f', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(200,101,42,0.3)', boxShadow: '0 0 60px rgba(200,101,42,0.1)' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', background: 'linear-gradient(90deg,#1a0a00,#0d1a0d)', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(200,101,42,0.2)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#c8652a,#7b2d8b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: 'serif' }}>NammaBot AI</div>
          <div style={{ color: '#4ade80', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            online · hyper-local AI
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Karnataka expert</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', animationDelay: '0.1s' }}>
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.type === 'user' ? 'linear-gradient(135deg,#c8652a,#b85c0a)' : 'rgba(255,255,255,0.07)',
              color: '#fff',
              fontSize: 13,
              lineHeight: 1.5,
              border: msg.type === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'rgba(255,255,255,0.07)', borderRadius: '18px 18px 18px 4px', width: 60, border: '1px solid rgba(255,255,255,0.08)' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8652a', display: 'inline-block', animation: `bounce 1s ${i * 0.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestion */}
      <div style={{ padding: '0 16px 8px' }}>
        <button
          onClick={() => sendMessage(suggestions[suggIdx])}
          style={{ fontSize: 11, color: '#c8652a', background: 'rgba(200,101,42,0.1)', border: '1px solid rgba(200,101,42,0.3)', borderRadius: 20, padding: '5px 12px', cursor: 'pointer', width: '100%', textAlign: 'left' }}
        >
          💡 {suggestions[suggIdx]}
        </button>
      </div>

      {/* Input */}
      <div style={{ padding: '8px 16px 16px', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask about Karnataka..."
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: '10px 16px', color: '#fff', fontSize: 13, outline: 'none' }}
        />
        <button
          onClick={() => sendMessage(input)}
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#c8652a,#b85c0a)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >→</button>
      </div>
    </div>
  );
};

/* ── Spot Card (flip on hover) ── */
const SpotCard = ({ spot, t, idx }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: 1000, cursor: 'pointer', flexShrink: 0, width: 280 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={{ position: 'relative', width: '100%', height: 380, transition: 'transform 0.6s cubic-bezier(.4,0,.2,1)', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        {/* Front */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 20, overflow: 'hidden', background: spot.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', top: 24, right: 20, fontSize: 64, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>{spot.emoji}</div>
          {spot.verified && <div style={{ position: 'absolute', top: 20, left: 16, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>✓ Verified</div>}
          <div style={{ position: 'absolute', bottom: 20, right: 16, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '4px 10px', fontSize: 13, color: '#ffd700' }}>★ {spot.rating}</div>
          <div style={{ padding: '80px 20px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>{spot.tag}</div>
            <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 6px', fontFamily: 'serif' }}>{spot.title}</h3>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>📍 {spot.sub}</div>
            <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Hover to see details →</div>
          </div>
        </div>
        {/* Back */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 20, overflow: 'hidden', background: '#0f0f17', border: `1px solid rgba(255,255,255,0.1)`, display: 'flex', flexDirection: 'column', padding: 24, gap: 16 }}>
          <div style={{ fontSize: 36 }}>{spot.emoji}</div>
          <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0, fontFamily: 'serif' }}>{spot.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{spot.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Best Time', val: spot.bestTime, icon: '📅' },
              { label: 'Visitors', val: spot.visitors, icon: '👥' },
              { label: 'Guide', val: spot.guide, icon: '🧑' },
              { label: 'Rating', val: `★ ${spot.rating}`, icon: '⭐' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{item.icon} {item.label}</div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{item.val}</div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: 'auto', background: 'linear-gradient(135deg,#c8652a,#b85c0a)', border: 'none', borderRadius: 30, padding: '12px 24px', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: 0.5 }}>
            Explore with Local Guide →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Guide Card ── */
const GuideCard = ({ guide, t, visible, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative',
        background: hovered ? guide.color : '#141420',
        border: `1px solid ${hovered ? guide.color : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
        transform: visible ? `translateY(0) scale(${hovered ? 1.02 : 1})` : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transitionDelay: delay,
        padding: 28,
      }}
    >
      <div style={{ fontSize: 52, marginBottom: 16, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>{guide.emoji}</div>
      <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px', fontFamily: 'serif' }}>{guide.name}</h4>
      <div style={{ color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 12 }}>📍 {guide.city}</div>
      <div style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16, fontWeight: 500 }}>🎯 {guide.specialty}</div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
        <div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{guide.reviews}</div>
          <div style={{ color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', fontSize: 11 }}>reviews</div>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{guide.trips}</div>
          <div style={{ color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', fontSize: 11 }}>trips</div>
        </div>
      </div>
      <div style={{ color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', fontSize: 12 }}>🌐 {guide.languages}</div>
      {hovered && (
        <button style={{ position: 'absolute', bottom: 20, right: 20, background: '#fff', border: 'none', borderRadius: 20, padding: '8px 20px', color: guide.color, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          Connect →
        </button>
      )}
    </div>
  );
};

/* ══ MAIN LANDING ══════════════════════════════════════════════════ */
const Landing = () => {
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('All');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const mouse = useMouseParallax();

  const t = (en, kn) => language === 'en' ? en : kn;

  const [statsRef, statsVisible] = useReveal(0.3);
  const [howRef, howVisible] = useReveal(0.1);
  const [whyRef, whyVisible] = useReveal(0.1);
  const [guidesRef, guidesVisible] = useReveal(0.1);
  const [featRef, featVisible] = useReveal(0.1);
  const [botRef, botVisible] = useReveal(0.1);
  const [testimRef, testimVisible] = useReveal(0.1);

  const c1 = useCounter(340, statsVisible);
  const c2 = useCounter(1200, statsVisible);
  const c3 = useCounter(28, statsVisible);
  const c4 = useCounter(96, statsVisible);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const categories = ['All', 'Heritage', 'Nature', 'Food', 'Temples', 'Culture'];
  const filteredSpots = activeCategory === 'All' ? SPOTS : SPOTS.filter(s => s.tag === activeCategory);

  const WHY_US = [
    { icon: '🧑‍🤝‍🧑', label: 'Guide Type', us: 'Verified local residents', them: 'Freelance contractors' },
    { icon: '📍', label: 'Spot Curation', us: 'Community-vetted gems', them: 'Algorithm + sponsored listings' },
    { icon: '🗣️', label: 'Language', us: 'Kannada-first, bilingual', them: 'English only' },
    { icon: '💰', label: 'Pricing', us: 'Direct, transparent, fair', them: 'Commission-heavy markups' },
    { icon: '🤖', label: 'AI', us: 'NammaBot — hyper-local AI', them: 'Generic global recommendations' },
    { icon: '📵', label: 'Offline', us: 'Full offline maps included', them: 'Requires constant data' },
  ];

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #08080f; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::selection { background: #c8652a44; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #c8652a; border-radius: 2px; }
    .serif { font-family: 'Playfair Display', serif; }
    .nd-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s; }
    .nd-nav.scrolled { background: rgba(8,8,15,0.92); backdrop-filter: blur(20px); padding: 14px 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nd-logo { font-size: 20px; font-weight: 800; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; }
    .nd-logo-mark { width: 36px; height: 36px; background: linear-gradient(135deg,#c8652a,#b85c0a); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; }
    .nd-nav-links { display: flex; gap: 32px; list-style: none; }
    .nd-nav-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .nd-nav-links a:hover { color: #fff; }
    .nd-nav-right { display: flex; align-items: center; gap: 16px; }
    .nd-lang-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: #fff; padding: 7px 16px; border-radius: 20px; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: 'DM Sans'; }
    .nd-lang-btn:hover { background: rgba(255,255,255,0.14); }
    .nd-btn-ghost { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .nd-btn-ghost:hover { color: #fff; }
    .nd-btn-primary { background: linear-gradient(135deg,#c8652a,#b85c0a); color: #fff; text-decoration: none; padding: 10px 22px; border-radius: 30px; font-size: 14px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
    .nd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,101,42,0.4); }
    .nd-btn-large { padding: 16px 36px; border-radius: 40px; font-size: 16px; }
    .nd-btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 16px 36px; border-radius: 40px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .nd-btn-outline:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.4); }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,101,42,0.15); border: 1px solid rgba(200,101,42,0.3); color: #c8652a; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
    .badge-dot { width: 6px; height: 6px; background: #c8652a; border-radius: 50%; animation: pulse 2s infinite; }
    .ticker-outer { background: #0d0d18; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); overflow: hidden; padding: 14px 0; }
    .ticker-row { display: flex; gap: 0; white-space: nowrap; }
    .ticker-fwd { animation: tickerFwd 30s linear infinite; }
    .ticker-rev { animation: tickerRev 25s linear infinite; margin-top: 10px; }
    .ticker-item { padding: 0 28px; font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; border-right: 1px solid rgba(255,255,255,0.08); }
    .ticker-item:hover { color: #c8652a; }
    .section-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #c8652a; margin-bottom: 12px; }
    .section-title { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900; line-height: 1.15; color: #fff; }
    .section-title.md { font-size: 32px; }
    .text-gradient { background: linear-gradient(135deg,#c8652a,#e8a060); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
    @keyframes bounce { 0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)} }
    @keyframes tickerFwd { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes tickerRev { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
    @keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
    @keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
    .fade-in-up { animation: fadeInUp 0.7s ease forwards; }
    .scale-in { animation: scaleIn 0.6s ease forwards; }
    .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; }
    @media (max-width: 768px) {
      .nd-nav-links { display: none; }
      .section-title { font-size: 30px; }
      .hero-grid { grid-template-columns: 1fr !important; }
      .spots-track { gap: 16px !important; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: '100vh', background: '#08080f' }}>

        {/* ══ NAVBAR ══ */}
        <nav className={`nd-nav${navScrolled ? ' scrolled' : ''}`}>
          <a href="#" className="nd-logo">
            <div className="nd-logo-mark">ND</div>
            <span>Namma<strong>Discover</strong></span>
          </a>
          <ul className="nd-nav-links">
            {['Explore', 'How It Works', 'Local Guides', 'NammaBot', 'About'].map((l, i) => (
              <li key={i}><a href={`#${l.toLowerCase().replace(/ /g, '-')}`}>{l}</a></li>
            ))}
          </ul>
          <div className="nd-nav-right">
            <button className="nd-lang-btn" onClick={() => setLanguage(l => l === 'en' ? 'kn' : 'en')}>
              {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
            </button>
            <a href="#" className="nd-btn-ghost">Sign In</a>
            <a href="#" className="nd-btn-primary">Join Free <span>→</span></a>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
          {/* Animated background */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,101,42,0.12) 0%, transparent 70%)', top: '10%', left: '5%', transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`, transition: 'transform 0.1s' }} />
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,45,139,0.1) 0%, transparent 70%)', bottom: '10%', right: '10%', transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)`, transition: 'transform 0.1s' }} />
            <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,107,74,0.07) 0%, transparent 70%)', top: '40%', left: '40%', transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`, transition: 'transform 0.1s' }} />
            {/* Grid lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            {/* Kannada bg text */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 220, fontWeight: 900, fontFamily: 'serif', color: 'rgba(255,255,255,0.018)', userSelect: 'none', whiteSpace: 'nowrap', letterSpacing: -10 }}>ಕರ್ನಾಟಕ</div>
          </div>

          {/* Floating badges */}
          {[
            { text: '🏯 Hampi', top: '18%', left: '8%', delay: '0s' },
            { text: '☕ Coorg', top: '30%', right: '6%', delay: '0.4s' },
            { text: '★ 4.9', bottom: '35%', left: '5%', delay: '0.8s' },
            { text: '🛕 Belur', top: '60%', right: '8%', delay: '1.2s' },
            { text: '🌿 1,200+ Locals', bottom: '22%', right: '12%', delay: '0.6s' },
          ].map((badge, i) => (
            <div key={i} style={{
              position: 'absolute', ...badge,
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 30,
              padding: '8px 16px', fontSize: 13, color: '#fff', fontWeight: 600,
              animation: `float 4s ${badge.delay} ease-in-out infinite`,
              zIndex: 2,
            }}>{badge.text}</div>
          ))}

          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
              <div className="badge" style={{ marginBottom: 24 }}>
                <span className="badge-dot" />
                {t('Authenticity First · Since 2023', 'ಅಪ್ಪಟತನವೇ ಮೊದಲು · 2023 ರಿಂದ')}
              </div>
              <h1 className="serif" style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.08, marginBottom: 24, color: '#fff' }}>
                <span style={{ display: 'block', animation: 'fadeInUp 0.8s 0.1s ease both' }}>{t('Rediscover', 'ಮರುಶೋಧಿಸಿ')}</span>
                <span className="text-gradient" style={{ display: 'block', animation: 'fadeInUp 0.8s 0.2s ease both' }}>Karnataka</span>
                <em style={{ display: 'block', fontSize: 48, fontStyle: 'italic', animation: 'fadeInUp 0.8s 0.3s ease both' }}>
                  {t('Through Local Eyes', 'ಸ್ಥಳೀಯರ ಕಣ್ಣಿನಿಂದ')}
                </em>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, maxWidth: 500, animation: 'fadeInUp 0.8s 0.4s ease both' }}>
                {t("Escape tourist traps. Connect with family-run gems, heritage spots, and verified local guides across Karnataka's 30 districts.", "ಪ್ರವಾಸಿ ಮೋಸದಿಂದ ಪಾರಾಗಿ. ಕರ್ನಾಟಕದ 30 ಜಿಲ್ಲೆಗಳ ಕುಟುಂಬ ರತ್ನಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.")}
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeInUp 0.8s 0.5s ease both' }}>
                <a href="#explore" className="nd-btn-primary nd-btn-large">
                  {t('Start Exploring', 'ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ')} <span>→</span>
                </a>
                <a href="#discover-section" className="nd-btn-outline">
                  {t('See the Spots', 'ತಾಣಗಳನ್ನು ನೋಡಿ')}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, animation: 'fadeInUp 0.8s 0.6s ease both' }}>
                <div style={{ display: 'flex' }}>
                  {['🧑', '👩', '👨', '👩', '🧑'].map((e, i) => (
                    <span key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a1a2e', border: '2px solid #08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginLeft: i > 0 ? -10 : 0 }}>{e}</span>
                  ))}
                </div>
                <div>
                  <div style={{ color: '#ffd700', fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>1,200+ locals sharing Karnataka</div>
                </div>
              </div>
            </div>

            {/* Hero card stack */}
            <div style={{ position: 'relative', height: 480, animation: 'scaleIn 0.8s 0.3s ease both' }}>
              {SPOTS.slice(0, 3).map((s, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: 260,
                  background: s.gradient,
                  borderRadius: 24,
                  padding: 24,
                  boxShadow: `0 ${20 + i * 8}px ${40 + i * 16}px rgba(0,0,0,${0.5 + i * 0.1})`,
                  transform: `rotate(${[-4, 2, 8][i]}deg) translateY(${[0, 20, 40][i]}px) translateX(${[0, 30, 60][i]}px)`,
                  transition: 'transform 0.4s',
                  top: [40, 60, 80][i],
                  left: [60, 80, 100][i],
                  cursor: 'pointer',
                  zIndex: 3 - i,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{s.emoji}</div>
                  <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 800, fontFamily: 'serif', marginBottom: 6 }}>{s.title}</h3>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 12 }}>📍 {s.sub}</div>
                  {s.verified && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '3px 10px', fontSize: 11, color: '#fff', marginRight: 8 }}>✓ Verified</div>}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: '3px 10px', fontSize: 12, color: '#ffd700' }}>★ {s.rating}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 12, animation: 'float 3s ease-in-out infinite' }}>
            <div style={{ width: 24, height: 38, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
              <div style={{ width: 4, height: 8, background: '#c8652a', borderRadius: 2, animation: 'bounce 1.5s infinite' }} />
            </div>
            scroll to discover
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div className="ticker-outer">
          <div className="ticker-row ticker-fwd">
            {[...Array(6)].flatMap((_, s) =>
              ['🏯 Hampi', '☕ Coorg Coffee', '🌊 Jog Falls', '🛕 Belur Temples', '🎭 Yakshagana', '🏔️ Kudremukh', '🎨 Channapatna Toys', '🌺 Mysore Dasara', '🐘 Dubare Reserve']
                .map((it, i) => <span key={`f${s}-${i}`} className="ticker-item">{it}</span>)
            )}
          </div>
          <div className="ticker-row ticker-rev" style={{ marginTop: 10 }}>
            {[...Array(6)].flatMap((_, s) =>
              ['🌿 Nagarhole Safari', '🕌 Gol Gumbaz', '🌄 Nandi Hills', '🍀 Sakleshpur Trek', '🦋 Bannerghatta', '🌸 Lalbagh Garden', '💎 Bhadra Wildlife', '🎯 Badami Caves']
                .map((it, i) => <span key={`r${s}-${i}`} className="ticker-item">{it}</span>)
            )}
          </div>
        </div>

        {/* ══ STATS ══ */}
        <section ref={statsRef} style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {[
                { val: c1, suffix: '+', label: t('Hidden Gems Listed', 'ರಹಸ್ಯ ತಾಣಗಳು'), icon: '🗺️', color: '#c8652a' },
                { val: c2, suffix: '+', label: t('Verified Locals', 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳೀಯರು'), icon: '🧑‍🤝‍🧑', color: '#1a6b4a' },
                { val: c3, suffix: '', label: t('Districts Covered', 'ಜಿಲ್ಲೆಗಳು'), icon: '📍', color: '#0d4f6b' },
                { val: c4, suffix: '%', label: t('Satisfaction Rate', 'ತೃಪ್ತಿ ದರ'), icon: '⭐', color: '#7b2d8b' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '32px 24px', textAlign: 'center',
                  transform: statsVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: statsVisible ? 1 : 0,
                  transition: `all 0.6s ${i * 0.1}s`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', bottom: -20, right: -20, fontSize: 80, opacity: 0.06 }}>{s.icon}</div>
                  <div style={{ fontSize: 44, fontWeight: 900, fontFamily: 'serif', color: s.color }}>
                    {s.val}<span style={{ fontSize: 28 }}>{s.suffix}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SPOTS ══ */}
        <section id="discover-section" style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <div className="section-eyebrow">{t('Curated by Locals', 'ಸ್ಥಳೀಯರಿಂದ ಆಯ್ದ')}</div>
                <h2 className="section-title" style={{ fontSize: 40 }}>{t('Spots Worth the Detour', 'ದಾರಿ ತಪ್ಪಿ ಹೋಗಲು ಯೋಗ್ಯ ತಾಣಗಳು')}</h2>
              </div>
              <a href="#" style={{ color: '#c8652a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t('View all 340+ spots →', 'ಎಲ್ಲ 340+ ತಾಣಗಳು →')}</a>
            </div>
            {/* Category pills */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
              {categories.map((c, i) => (
                <button key={i} onClick={() => setActiveCategory(c)} style={{
                  padding: '9px 22px', borderRadius: 30, border: `1px solid ${activeCategory === c ? '#c8652a' : 'rgba(255,255,255,0.12)'}`,
                  background: activeCategory === c ? 'rgba(200,101,42,0.15)' : 'transparent',
                  color: activeCategory === c ? '#c8652a' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', fontFamily: 'DM Sans',
                }}>{c}</button>
              ))}
            </div>
            {/* Spot cards */}
            <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 20, scrollbarWidth: 'thin' }}>
              {filteredSpots.map((spot, i) => (
                <SpotCard key={spot.title} spot={spot} t={t} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section id="how-it-works" ref={howRef} style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-eyebrow">{t('Simple & Honest', 'ಸರಳ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ')}</div>
              <h2 className="section-title">{t('How NammaDiscover Works', 'NammaDiscover ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ')}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
              {/* Connecting line */}
              <div style={{ position: 'absolute', top: 48, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #c8652a, #7b2d8b, #1a6b4a, #0d4f6b)', opacity: 0.3 }} />
              {[
                { num: '01', icon: '🔍', title: t('Discover', 'ಅನ್ವೇಷಿಸಿ'), desc: t('Browse a community-vetted map of authentic Karnataka spots — no paid placements, no fake reviews.', 'ಸ್ಥಳೀಯ-ಪರಿಶೀಲಿತ ನಕ್ಷೆ ಹುಡುಕಿ.'), color: '#c8652a' },
                { num: '02', icon: '🤝', title: t('Connect', 'ಸಂಪರ್ಕಿಸಿ'), desc: t('Message verified local guides directly — zero commission, zero middleman.', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ.'), color: '#7b2d8b' },
                { num: '03', icon: '🌟', title: t('Experience', 'ಅನುಭವಿಸಿ'), desc: t('Immerse in the real Karnataka — stories, flavours, festivals no guidebook knows.', 'ಯಾವ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕವೂ ಹೇಳದ ಕಥೆಗಳು.'), color: '#1a6b4a' },
                { num: '04', icon: '📸', title: t('Share', 'ಹಂಚಿಕೊಳ್ಳಿ'), desc: t('Post finds, earn Explorer badges, help the next traveller skip tourist traps.', 'ಎಕ್ಸ್‌ಪ್ಲೋರರ್ ಬ್ಯಾಡ್ಜ್ ಗಳಿಸಿ.'), color: '#0d4f6b' },
              ].map((step, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: 28,
                  transform: howVisible ? 'translateY(0)' : 'translateY(50px)',
                  opacity: howVisible ? 1 : 0,
                  transition: `all 0.6s ${i * 0.15}s`,
                }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${step.color}20`, border: `2px solid ${step.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
                    {step.icon}
                    <div style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: step.color, color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.num}</div>
                  </div>
                  <h3 className="serif" style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section ref={whyRef} style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-eyebrow">{t('No Compromises', 'ಯಾವ ರಾಜಿಯಿಲ್ಲ')}</div>
              <h2 className="section-title">{t('Why NammaDiscover?', 'ನಮ್ಮ ಡಿಸ್ಕವರ್ ಏಕೆ?')}</h2>
            </div>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr', background: 'rgba(255,255,255,0.04)', padding: '16px 24px' }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Feature</div>
                <div style={{ fontSize: 13, color: '#c8652a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="nd-logo-mark" style={{ width: 24, height: 24, fontSize: 10 }}>ND</div> NammaDiscover
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{t('Other Apps', 'ಇತರ ಆ್ಯಪ್‌ಗಳು')}</div>
              </div>
              {WHY_US.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2fr 2fr 2fr',
                  padding: '18px 24px', borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  transform: whyVisible ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: whyVisible ? 1 : 0,
                  transition: `all 0.5s ${i * 0.08}s`,
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{row.icon}</span> {row.label}
                  </div>
                  <div style={{ color: '#4ade80', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
                    {row.us}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✗</span>
                    {row.them}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GUIDES ══ */}
        <section id="guides" ref={guidesRef} style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 50 }}>
              <div>
                <div className="section-eyebrow">{t('Real People', 'ನಿಜ ಜನರು')}</div>
                <h2 className="section-title" style={{ fontSize: 40 }}>{t('Meet Your Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು')}</h2>
              </div>
              <a href="#" style={{ color: '#c8652a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t('Browse all →', 'ಎಲ್ಲರನ್ನು ನೋಡಿ →')}</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {GUIDES.map((g, i) => (
                <GuideCard key={i} guide={g} t={t} visible={guidesVisible} delay={`${i * 0.12}s`} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section ref={testimRef} style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <div className="section-eyebrow">{t('Explorer Stories', 'ಅನ್ವೇಷಕರ ಕಥೆಗಳು')}</div>
              <h2 className="section-title">{t('What Travellers Say', 'ಪ್ರಯಾಣಿಕರು ಏನು ಹೇಳುತ್ತಾರೆ')}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {TESTIMONIALS.map((tm, i) => (
                <div key={i} style={{
                  background: i === testimonialIdx ? `${tm.bg}18` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${i === testimonialIdx ? tm.bg + '40' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 20, padding: 28, cursor: 'pointer',
                  transform: testimVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: testimVisible ? 1 : 0,
                  transition: `all 0.5s ${i * 0.1}s, background 0.4s, border 0.4s`,
                }} onClick={() => setTestimonialIdx(i)}>
                  <div style={{ color: '#ffd700', fontSize: 16, marginBottom: 14, letterSpacing: 2 }}>{'★'.repeat(tm.rating)}</div>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>"{tm.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 40, height: 40, borderRadius: '50%', background: tm.bg + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{tm.avatar}</span>
                    <div>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{tm.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>📍 {tm.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section id="features" ref={featRef} style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-eyebrow">{t('Everything You Need', 'ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ')}</div>
              <h2 className="section-title">{t('Built for Real Karnataka Travel', 'ನಿಜ ಕರ್ನಾಟಕ ಪ್ರಯಾಣಕ್ಕಾಗಿ')}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { icon: '🛡️', title: t('Verified Authenticity', 'ಪರಿಶೀಲಿಸಿದ ಅಪ್ಪಟತನ'), desc: t('Every spot vetted for cultural significance and local ownership — no chains, no fakes.', 'ಪ್ರತಿ ತಾಣ ಸ್ಥಳೀಯ ಮಾಲೀಕತ್ವಕ್ಕಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.'), color: '#c8652a' },
                { icon: '🧭', title: t('Explorer Network', 'ಅನ್ವೇಷಕರ ಜಾಲ'), desc: t('Connect directly with locals who know the pulse of their city, district, or village.', 'ತಮ್ಮ ನಗರದ ನಾಡಿ ತಿಳಿದ ಸ್ಥಳೀಯರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ.'), color: '#1a6b4a' },
                { icon: '🤖', title: 'NammaBot AI', desc: t("Hyper-local AI that understands Kannada culture, festivals, and which darshini opens at 6 AM.", 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ AI.'), color: '#7b2d8b' },
                { icon: '📸', title: t('Community Videos', 'ಸಮುದಾಯ ವೀಡಿಯೊಗಳು'), desc: t('Real short videos by locals — not stock footage. Just honest Karnataka.', 'ಸ್ಥಳೀಯರು ತೆಗೆದ ನಿಜ ವೀಡಿಯೊಗಳು.'), color: '#0d4f6b' },
                { icon: '🗺️', title: t('Offline Maps', 'ಆಫ್‌ಲೈನ್ ನಕ್ಷೆಗಳು'), desc: t('Download maps that work in Coorg forests and Kodagu ghats — no data required.', 'ಡೇಟಾ ಇಲ್ಲದೆ ಆಫ್‌ಲೈನ್ ನಕ್ಷೆಗಳು.'), color: '#2d6b1a' },
                { icon: '🌐', title: t('Bilingual First', 'ದ್ವಿಭಾಷಿ ಮೊದಲು'), desc: t('Every listing, review, and story in Kannada and English — Karnataka speaks both.', 'ಪ್ರತಿ ಪಟ್ಟಿ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ.'), color: '#b85c0a' },
              ].map((f, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden',
                  transform: featVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: featVisible ? 1 : 0,
                  transition: `all 0.5s ${i * 0.1}s`,
                }}>
                  <div style={{ position: 'absolute', bottom: -30, right: -20, fontSize: 100, opacity: 0.04 }}>{f.icon}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>{f.icon}</div>
                  <h3 className="serif" style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.65 }}>{f.desc}</p>
                  <div style={{ height: 2, background: f.color, borderRadius: 2, marginTop: 20, opacity: 0.6 }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ NAMMABOT ══ */}
        <section id="nammabot" ref={botRef} style={{ padding: '80px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div style={{
              transform: botVisible ? 'translateX(0)' : 'translateX(-50px)',
              opacity: botVisible ? 1 : 0,
              transition: 'all 0.7s',
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(123,45,139,0.15)', border: '1px solid rgba(123,45,139,0.3)', color: '#c084fc', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 24 }}>
                🤖 NammaBot AI
              </div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                {t('Ask NammaBot —', 'NammaBot ಕೇಳಿ —')}
                <br />
                <span className="text-gradient" style={{ fontSize: 32 }}>
                  {t('"Where to eat in Mysuru tonight?"', '"ಇಂದು ರಾತ್ರಿ ಮೈಸೂರಿನಲ್ಲಿ ಎಲ್ಲಿ ತಿನ್ನಲಿ?"')}
                </span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                {t("NammaBot knows the 60-year-old darshini that closes at 11 AM and the family homestay 3 km off the highway. Powered by local knowledge, not just maps.", "NammaBot 60 ವರ್ಷ ಹಳೆಯ ದರ್ಶಿನಿ ಮತ್ತು ಹೆದ್ದಾರಿಯಿಂದ 3 ಕಿ.ಮೀ ಹೋಮ್‌ಸ್ಟೇ ತಿಳಿದಿದೆ.")}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                {[t('Understands Kannada', 'ಕನ್ನಡ'), t('Festival-aware', 'ಹಬ್ಬ-ಅರಿವು'), t('Seasonal tips', 'ಋತು ಸಲಹೆ'), t('Works Offline', 'ಆಫ್‌ಲೈನ್')].map((f, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{f}</span>
                ))}
              </div>
              <a href="#" className="nd-btn-primary nd-btn-large">
                {t('Try NammaBot Free', 'NammaBot ಉಚಿತ ಪ್ರಯತ್ನ')} <span>→</span>
              </a>
            </div>
            <div style={{
              transform: botVisible ? 'translateX(0)' : 'translateX(50px)',
              opacity: botVisible ? 1 : 0,
              transition: 'all 0.7s 0.2s',
            }}>
              <NammaBotChat t={t} language={language} />
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: '100px 0' }}>
          <div className="container">
            <div style={{ background: 'linear-gradient(135deg, rgba(200,101,42,0.15), rgba(123,45,139,0.15))', border: '1px solid rgba(200,101,42,0.2)', borderRadius: 32, padding: '72px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative rings */}
              {[300, 500, 700].map((size, i) => (
                <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(200,101,42,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
              ))}
              <div style={{ position: 'absolute', top: 24, left: 48, fontSize: 40, opacity: 0.3 }}>🪔</div>
              <div style={{ position: 'absolute', top: 48, right: 60, fontSize: 36, opacity: 0.25 }}>🌺</div>
              <div style={{ position: 'absolute', bottom: 32, left: 80, fontSize: 32, opacity: 0.2 }}>🛕</div>
              <div className="section-eyebrow" style={{ position: 'relative' }}>{t('The real Karnataka awaits', 'ನಿಜ ಕರ್ನಾಟಕ ಕಾಯುತ್ತಿದೆ')}</div>
              <h2 className="section-title" style={{ fontSize: 52, marginBottom: 20, position: 'relative' }}>
                {t('Ready for an Authentic Adventure?', 'ಅಪ್ಪಟ ಸಾಹಸಕ್ಕೆ ಸಿದ್ಧರಿದ್ದೀರಾ?')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7, position: 'relative' }}>
                {t('Join thousands discovering the hidden soul of Karunadu — one local story at a time.', 'ಕರುನಾಡಿನ ಗುಪ್ತ ಆತ್ಮ ಅನ್ವೇಷಿಸಲು ಸಾವಿರಾರು ಪ್ರಯಾಣಿಕರೊಂದಿಗೆ ಸೇರಿ.')}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                <a href="#" className="nd-btn-primary nd-btn-large">
                  {t('Join NammaDiscover Free', 'NammaDiscover ಉಚಿತ ಸೇರಿ')} <span>→</span>
                </a>
                <a href="#features" className="nd-btn-outline">{t('Explore Features', 'ವೈಶಿಷ್ಟ್ಯಗಳು')}</a>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 20, position: 'relative' }}>
                {t('Free forever · No credit card · Always local-first', 'ಯಾವಾಗಲೂ ಉಚಿತ · ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಇಲ್ಲ · ಸ್ಥಳೀಯ-ಮೊದಲು')}
              </p>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 0 30px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div className="nd-logo-mark">ND</div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Namma<strong>Discover</strong></span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
                  {t('Explore Karnataka through the eyes of those who call it home.', 'ಕರ್ನಾಟಕವನ್ನು ಸ್ಥಳೀಯರ ಕಣ್ಣಿನಿಂದ ಅನ್ವೇಷಿಸಿ.')}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['𝕏', 'in', 'f', '▶'].map((s, i) => (
                    <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none', transition: 'all 0.2s' }}>{s}</a>
                  ))}
                </div>
              </div>
              {[
                { title: t('Explore', 'ಅನ್ವೇಷಿಸಿ'), links: [t('Hidden Gems', 'ರಹಸ್ಯ ತಾಣಗಳು'), t('Local Guides', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರು'), t('Heritage Sites', 'ಪಾರಂಪರಿಕ ಸ್ಥಳಗಳು'), t('Food Trails', 'ಆಹಾರ ಪ್ರಯಾಣ'), 'NammaBot AI'] },
                { title: t('Regions', 'ಪ್ರದೇಶಗಳು'), links: ['Bengaluru', 'Mysuru', 'Coorg', 'Mangaluru', 'Hampi', 'Badami'] },
                { title: t('Company', 'ಕಂಪನಿ'), links: [t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ'), t('Blog', 'ಬ್ಲಾಗ್'), t('Careers', 'ವೃತ್ತಿ'), t('Press', 'ಮಾಧ್ಯಮ'), t('Contact', 'ಸಂಪರ್ಕ')] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5 }}>{col.title}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {col.links.map((l, j) => <a key={j} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a>)}
                  </div>
                </div>
              ))}
              <div>
                <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{t('Local stories in your inbox', 'ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ಸ್ಥಳೀಯ ಕಥೆಗಳು')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 14 }}>{t('Weekly Karnataka dispatches. No spam.', 'ಸಾಪ್ತಾಹಿಕ ಸಂದೇಶಗಳು.')}</p>
                <div style={{ display: 'flex', gap: 0 }}>
                  <input type="email" placeholder={t('your@email.com', 'ನಿಮ್ಮ ಇಮೇಲ್')} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '30px 0 0 30px', padding: '10px 16px', color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'DM Sans' }} />
                  <button style={{ background: '#c8652a', border: 'none', borderRadius: '0 30px 30px 0', padding: '10px 18px', color: '#fff', cursor: 'pointer', fontSize: 16 }}>→</button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 10 }}>8,400+ Karnataka lovers already in</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© 2025 NammaDiscover · {t('Made with ♥ for Karnataka', 'ಕರ್ನಾಟಕಕ್ಕಾಗಿ ♥ ನಿಂದ ತಯಾರಿಸಲಾಗಿದೆ')}</p>
              <div style={{ display: 'flex', gap: 20 }}>
                {[t('Privacy', 'ಗೌಪ್ಯತೆ'), t('Terms', 'ನಿಯಮಗಳು'), t('Cookies', 'ಕುಕೀಸ್')].map((l, i) => (
                  <a key={i} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textDecoration: 'none' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Landing;
