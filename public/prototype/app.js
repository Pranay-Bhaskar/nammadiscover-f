/* ============================================================
   NammaDiscover — app.js v2.0
   ============================================================ */

// ---- PART 2 APPENDED BELOW ----

// ============================================================
// 1. DATA
// ============================================================
const CITIES = [
  { slug: 'bengaluru', name: 'Bengaluru', lat: 12.9716, lng: 77.5946, video: 'forest', overview: 'Silicon Valley of India, rich in culture, food and innovation.', highlights: ['🏛️ Cubbon Park', '🍛 CTR Dosa', '🛍️ Commercial Street', '🌿 Lalbagh'], bestTime: 'Oct–Feb' },
  { slug: 'mysuru', name: 'Mysuru', lat: 12.2958, lng: 76.6394, video: 'palace', overview: 'The City of Palaces — royal grandeur meets lived-in charm.', highlights: ['🏰 Mysore Palace', '🧵 Silk Market', '🌸 Chamundi Hill', '🎭 Dasara Festival'], bestTime: 'Sep–Mar' },
  { slug: 'hampi', name: 'Hampi', lat: 15.3350, lng: 76.4600, video: 'ruins', overview: 'Ancient Vijayanagara capital, UNESCO World Heritage Site.', highlights: ['🛕 Virupaksha Temple', '🧗 River Bouldering', '🪨 Stone Chariot', '🌅 Matanga Hill'], bestTime: 'Nov–Feb' },
  { slug: 'coorg', name: 'Coorg', lat: 12.4244, lng: 75.7382, video: 'forest', overview: 'Scotland of India — misty hills, coffee estates and Kodava culture.', highlights: ['☕ Coffee Estates', '💧 Abbey Falls', '🐘 Nagarhole', '🏡 Kodava Heritage'], bestTime: 'Oct–Apr' },
  { slug: 'udupi', name: 'Udupi', lat: 13.3409, lng: 74.7421, video: 'beach', overview: 'Temple town famous for authentic Udupi cuisine and pristine beaches.', highlights: ['🛕 Krishna Temple', '🏖️ Kapu Beach', '🍛 Udupi Thali', '🌊 Malpe Beach'], bestTime: 'Nov–Mar' }
];

const LISTINGS = [
  { id: 'l1', name: 'CTR (Shivaji Military Hotel)', category: 'Restaurant', city: 'Bengaluru', citySlug: 'bengaluru', description: 'Family-run since 1924, famous for the best benne masala dosa in Bengaluru. Generations of Malleshwaram families breakfast here.', yearsInOperation: 100, isFamilyRun: true, lat: 13.0005, lng: 77.5678, authenticityScore: 96, verifiedLocal: true, images: ['https://b.zmtcdn.com/data/pictures/0/21707610/8db379697e031389b88936ab10d81efe.jpg?fit=around|960:500&crop=960:500;*,*'], tags: ['Dosa', 'Heritage', 'Breakfast'], rating: 4.9, stayType: null, category_icon: '🍽️', budget: 200 },
  { id: 'l2', name: 'Hessarghatta Lake', category: 'Nature', city: 'Bengaluru', citySlug: 'bengaluru', description: 'A hidden gem reservoir offering birdwatching, cycling tracks and boat rides — largely unknown to outsiders.', yearsInOperation: 80, isFamilyRun: false, lat: 13.1391, lng: 77.4680, authenticityScore: 84, verifiedLocal: true, images: ['https://content.jdmagicbox.com/v2/comp/bangalore/y5/080pxx80.xx80.141226121415.y2y5/catalogue/hessaraghatta-lake-hessargatta-lake-bangalore-tourist-attraction-p8k3bmwqk1.jpg'], tags: ['Lake', 'Birds', 'Cycling'], rating: 4.5, stayType: null, category_icon: '🌿', budget: 100 },
  { id: 'l3', name: 'Lalbagh Botanical Garden', category: 'Nature', city: 'Bengaluru', citySlug: 'bengaluru', description: '240 acres of botanical wonder with century-old glass house and irreplaceable tree lineages from around the world.', yearsInOperation: 250, isFamilyRun: false, lat: 12.9507, lng: 77.5848, authenticityScore: 92, verifiedLocal: false, images: ['https://www.en-vols.com/wp-content/uploads/afmm/2025/12/jardin-botanique-lalbagh-inde-glass-house.jpg'], tags: ['Botanical', 'History', 'Nature'], rating: 4.7, stayType: null, category_icon: '🌿', budget: 50 },
  { id: 'l4', name: 'Mysore Palace Night View', category: 'Heritage', city: 'Mysuru', citySlug: 'mysuru', description: 'On Sundays, 97,000 bulbs illuminate this palace. A spectacle that feels impossible to believe until you see it.', yearsInOperation: 100, isFamilyRun: false, lat: 12.3052, lng: 76.6552, authenticityScore: 99, verifiedLocal: true, images: ['https://upload.wikimedia.org/wikipedia/commons/6/6e/Mysore_Palace_in_night.jpg'], tags: ['Palace', 'Lights', 'Heritage'], rating: 5.0, stayType: null, category_icon: '🏛️', budget: 50 },
  { id: 'l5', name: 'Vinayaka Mylari', category: 'Restaurant', city: 'Mysuru', citySlug: 'mysuru', description: 'Iconic 80-year-old hotel serving the legendary Mysuru-style dose — thin, crispy, ghee-drenched. Locals queue at 7am sharp.', yearsInOperation: 80, isFamilyRun: true, lat: 12.3021, lng: 76.6489, authenticityScore: 97, verifiedLocal: true, images: ['https://im.whatshot.in/img/2020/Aug/hotel-original-vinayaka-mylari-1596699053.jpg'], tags: ['Dosa', 'Heritage', 'Breakfast'], rating: 4.9, stayType: null, category_icon: '🍽️', budget: 150 },
  { id: 'l6', name: 'Sri Lakshmi Silk Store', category: 'Shopping', city: 'Mysuru', citySlug: 'mysuru', description: 'A four-generation silk-weaving family still using traditional power looms. Buy Mysore silk straight from the weavers.', yearsInOperation: 65, isFamilyRun: true, lat: 12.3071, lng: 76.6445, authenticityScore: 91, verifiedLocal: true, images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudJwvUvwqbEachCbQYWW7pl-v626ijEnwjg&s'], tags: ['Silk', 'Crafts', 'Weaving'], rating: 4.8, stayType: null, category_icon: '🧵', budget: 500 },
  { id: 'l7', name: 'Virupaksha Temple', category: 'Heritage', city: 'Hampi', citySlug: 'hampi', description: 'An active 7th-century temple, the focal point of the Hampi ruins. A living, breathing pilgrimage site amidst stone ruins.', yearsInOperation: 1300, isFamilyRun: false, lat: 15.3350, lng: 76.4597, authenticityScore: 100, verifiedLocal: true, images: ['https://www.vikipandit.com/wp-content/uploads/Virupaksha-Temple-1.jpg'], tags: ['Temple', 'Ruins', 'UNESCO'], rating: 4.9, stayType: null, category_icon: '🏛️', budget: 30 },
  { id: 'l8', name: 'Hampi Riverside Bouldering', category: 'Adventure', city: 'Hampi', citySlug: 'hampi', description: 'Hampi is one of the world\'s top bouldering destinations. Granite boulders, blue sky, and ancient ruins — a surreal setting.', yearsInOperation: 20, isFamilyRun: false, lat: 15.3300, lng: 76.4650, authenticityScore: 88, verifiedLocal: true, images: ['https://www.xtremespots.com/wp-content/uploads/2013/10/Bouldering-in-Hampi-Rocks.jpg'], tags: ['Bouldering', 'Sports', 'Outdoors'], rating: 4.7, stayType: null, category_icon: '🧗', budget: 300 },
  { id: 'l9', name: 'Coorg Coffee Estate Homestay', category: 'Homestay', city: 'Coorg', citySlug: 'coorg', description: 'Wake up to misty hills and pluck coffee berries. A Kodava family welcomes you into their ancestral estate.', yearsInOperation: 30, isFamilyRun: true, lat: 12.4244, lng: 75.7382, authenticityScore: 95, verifiedLocal: true, images: ['https://q-xx.bstatic.com/xdata/images/hotel/max500/388365863.jpg?k=e5fc5d929ea6134d3c805da9c3b15acd4db11506f891ccf78daff0b7f3fb47fb&o='], tags: ['Coffee', 'Mist', 'Homestay'], rating: 4.9, stayType: 'Homestay', category_icon: '🏡', budget: 4500 },
  { id: 'l10', name: 'Abbey Falls', category: 'Nature', city: 'Coorg', citySlug: 'coorg', description: 'A cascading 70ft waterfall hidden within a private coffee plantation. The walk through the estate is half the magic.', yearsInOperation: 0, isFamilyRun: false, lat: 12.4304, lng: 75.7348, authenticityScore: 82, verifiedLocal: false, images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UlCSIVfnPVFITNdwyDJC_Kys6y3exy0n8w&s'], tags: ['Waterfall', 'Trekking', 'Nature'], rating: 4.6, stayType: null, category_icon: '💧', budget: 100 },
  { id: 'l11', name: 'Iruppu Falls (Hidden Gem)', category: 'Nature', city: 'Coorg', citySlug: 'coorg', description: 'Sacred waterfall mentioned in the Ramayana. Locals take a ritual dip on Shivaratri. Rarely visited by tourists.', yearsInOperation: 0, isFamilyRun: false, lat: 12.1102, lng: 75.8634, authenticityScore: 90, verifiedLocal: true, images: ['https://assets.simplotel.com/simplotel/image/upload/x_0,y_334,w_2160,h_720,r_0,c_crop,q_85,fl_progressive/w_2160,f_auto,c_fit/machaan-wilderness-lodge-nagarahole/Iruppu_hohsib'], tags: ['Waterfall', 'Sacred', 'Hidden'], rating: 4.8, stayType: null, category_icon: '💧', budget: 50 },
  { id: 'l12', name: 'Udupi Sri Krishna Temple', category: 'Heritage', city: 'Udupi', citySlug: 'udupi', description: 'The 13th-century temple that gave the world Udupi-style vegetarian cuisine. Pilgrims view the deity through a holed window.', yearsInOperation: 750, isFamilyRun: false, lat: 13.3409, lng: 74.7421, authenticityScore: 99, verifiedLocal: true, images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDOvZhHxTtUXxTAHLdPrVH7GuXh0xJUz9mtA&s'], tags: ['Temple', 'Pilgrimage', 'Heritage'], rating: 4.9, stayType: null, category_icon: '🛕', budget: 0 },
  { id: 'l13', name: "Diana's Beach (Kapu)", category: 'Nature', city: 'Udupi', citySlug: 'udupi', description: 'A pristine, uncrowded beach with a 19th-century lighthouse. Skip Goa and come here — locals say it\'s far more beautiful.', yearsInOperation: 0, isFamilyRun: false, lat: 13.2889, lng: 74.7260, authenticityScore: 86, verifiedLocal: true, images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/57/9b/08/kaup-beach.jpg?w=600&h=-1&s=1'], tags: ['Beach', 'Lighthouse', 'Hidden'], rating: 4.7, stayType: null, category_icon: '🏖️', budget: 0 },
  { id: 'l14', name: 'Hotel Woodlands (Udupi)', category: 'Restaurant', city: 'Udupi', citySlug: 'udupi', description: 'The original Udupi restaurant chain since 1938. Sambar, rasam, and banana-leaf meals that have never changed recipe.', yearsInOperation: 86, isFamilyRun: true, lat: 13.3445, lng: 74.7402, authenticityScore: 94, verifiedLocal: true, images: ['https://img.restaurantguru.com/ra5e-Udupi-woodlands-Restaurant-exterior.jpg'], tags: ['Meals', 'Banana Leaf', 'Heritage'], rating: 4.8, stayType: null, category_icon: '🍽️', budget: 200 },
  { id: 'l15', name: 'Evolve Back Coorg (Boutique)', category: 'Boutique Stay', city: 'Coorg', citySlug: 'coorg', description: 'A luxury boutique eco-resort amidst 300 acres of coffee and spice estates. Voted among the world\'s best eco-stays.', yearsInOperation: 15, isFamilyRun: false, lat: 12.3892, lng: 75.7541, authenticityScore: 88, verifiedLocal: false, images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfY6mEig_N1uzU8k4VtQb4ujvZmpx78LaLRQ&s'], tags: ['Eco', 'Luxury', 'Coffee'], rating: 4.9, stayType: 'Boutique Stay', category_icon: '🏨', budget: 35000 },
  { id: 'l16', name: 'Rajendra Vilas Heritage Hotel', category: 'Boutique Stay', city: 'Mysuru', citySlug: 'mysuru', description: 'A former Maharaja\'s summer palace turned boutique heritage hotel. Experience Mysuru royalty firsthand.', yearsInOperation: 90, isFamilyRun: false, lat: 12.2958, lng: 76.6800, authenticityScore: 93, verifiedLocal: true, images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtmiWxUm_6nagpXzDkFKa99wfgzq4bcUMj1A&s'], tags: ['Palace', 'Heritage', 'Luxury'], rating: 4.8, stayType: 'Heritage Hotel', category_icon: '🏰', budget: 18000 },
  { id: 'l17', name: 'Hampi Eco Lodge', category: 'Eco Stay', city: 'Hampi', citySlug: 'hampi', description: 'Solar-powered cottages on the banks of the Tungabhadra. Wake up to boulder views and temple bells.', yearsInOperation: 12, isFamilyRun: false, lat: 15.3320, lng: 76.4580, authenticityScore: 87, verifiedLocal: true, images: ['data:image/jpeg;base64,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'], tags: ['Eco', 'River', 'Sunrise'], rating: 4.7, stayType: 'Eco Stay', category_icon: '🌱', budget: 3200 }
];

const REVIEWS_SEED = [
  { id: 'r1', author: 'Preethi N.', place: 'CTR (Shivaji Military Hotel)', text: 'Absolutely amazing benne dosa! The butter melts perfectly. Best breakfast in the city — worth the 20-minute queue.', date: '2026-02-15', sentiment: 'positive' },
  { id: 'r2', author: 'Arjun R.', place: 'Mysore Palace Night View', text: 'Truly breathtaking. The palace looks extraordinary at night. A must-visit for anyone in Mysuru.', date: '2026-01-28', sentiment: 'positive' },
  { id: 'r3', author: 'Divya K.', place: 'Coorg Coffee Estate Homestay', text: 'The stay was mediocre. The rooms were okay but I expected much more.', date: '2026-02-03', sentiment: 'negative' },
  { id: 'r4', author: 'Ratan L.', place: 'Virupaksha Temple', text: 'A normal temple visit. Decent, had some good moments.', date: '2026-01-10', sentiment: 'neutral' }
];

const EXPLORERS = [
  { name: 'Kavya Reddy', city: 'Bengaluru', badge: '🏅 Gold Explorer', contributions: 42, rating: 4.9, avatar: '🧑‍💼', speciality: 'Food & Heritage' },
  { name: 'Mahesh Gowda', city: 'Coorg', badge: '🥈 Silver Explorer', contributions: 28, rating: 4.7, avatar: '👨‍🌾', speciality: 'Nature & Hikes' },
  { name: 'Priya Nair', city: 'Udupi', badge: '🥉 Bronze Explorer', contributions: 15, rating: 4.8, avatar: '👩‍🍳', speciality: 'Local Cuisine' },
  { name: 'Rohan Kumar', city: 'Hampi', badge: '🌟 Legend', contributions: 87, rating: 5.0, avatar: '🧗', speciality: 'Adventure Spots' },
  { name: 'Smitha Rao', city: 'Mysuru', badge: '🏅 Gold Explorer', contributions: 53, rating: 4.9, avatar: '👩‍🎨', speciality: 'Art & Culture' },
  { name: 'Aditya Bhat', city: 'Udupi', badge: '🥈 Silver Explorer', contributions: 31, rating: 4.6, avatar: '🤿', speciality: 'Beach & Coastal' }
];

const BUSINESSES = [
  { icon: '🍛', badge: '👨‍👩‍👧 Family-Run · Since 1924', name: 'CTR — Benne Dose Heaven', loc: 'Malleshwaram, Bengaluru · 100 yrs', desc: 'Three generations of the same family serving the same benne masala dosa recipe. A living institution.', tags: ['Street Food', 'Local Favourite', 'Cash Only'] },
  { icon: '🧵', badge: '🏆 Heritage Craft · Est. 1961', name: 'Sri Lakshmi Silk Weavers', loc: 'Devaraja Market, Mysuru · 65 yrs', desc: 'A four-generation family using traditional wooden power looms. Every sari tells a story. Buy direct.', tags: ['Silk Weaving', 'Artisan', 'Verified'] },
  { icon: '☕', badge: '🌿 Generational Estate', name: 'Kushalappa Coffee Estate', loc: 'Virajpet, Coorg · 80 yrs', desc: 'A Kodava family\'s ancestral land. They dry, roast, and grind coffee using the same stone mill. Best estate coffee in India.', tags: ['Coffee', 'Estate Visit', 'Family-Run'] },
  { icon: '🏺', badge: '🎨 Traditional Craft', name: 'Bidriware by Syed Family', loc: 'Bidar · 50 yrs', desc: 'An Islamic art form passed down 500 years. Silver inlaid on blackened zinc-alloy. A UNESCO-listed craft.', tags: ['Handicraft', 'UNESCO', 'Export Quality'] },
  { icon: '🍵', badge: '🕰️ Since 1938', name: 'Hotel Woodlands Udupi', loc: 'Udupi · 86 yrs', desc: 'The original Udupi restaurant format. Banana-leaf thali, pure vegetarian. Their sambar recipe since 1938.', tags: ['Udupi Cuisine', 'Vegetarian', 'Founding Spot'] },
  { icon: '🎭', badge: '🌟 Cultural Heritage', name: 'Yakshagana Kendra', loc: 'Dharwad · 40 yrs', desc: 'A family keeping the ancient Yakshagana dance-theatre tradition alive. Attend a live evening performance.', tags: ['Performing Arts', 'Cultural', 'Immersive'] }
];

const STAYS_DATA = [
  { img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', alt: 'Coorg homestay', type: '🏡 Homestay · Coorg', name: 'Kodava Coffee Estate Bungalow', loc: 'Virajpet, Coorg', price: '₹4,500/night', rating: '4.9', id: 'l9' },
  { img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600', alt: 'Palace hotel', type: '🏰 Heritage Hotel · Mysuru', name: 'Rajendra Vilas Palace Hotel', loc: 'Chamundi Hills', price: '₹18,000/night', rating: '4.8', id: 'l16' },
  { img: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=600', alt: 'Hampi eco', type: '🌱 Eco Stay · Hampi', name: 'Hampi Eco Riverside Lodge', loc: 'Tungabhadra, Hampi', price: '₹3,200/night', rating: '4.7', id: 'l17' },
  { img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600', alt: 'Boutique eco', type: '🌿 Boutique · Coorg', name: 'Evolve Back Coffee Estate', loc: 'Siddapur, Coorg', price: '₹35,000/night', rating: '4.9', id: 'l15' },
  { img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', alt: 'Beach house', type: '🏖️ Beach Homestay · Udupi', name: 'Kapu Lighthouse Beach House', loc: 'Kapu Beach, Udupi', price: '₹2,800/night', rating: '4.6', id: 'l13' },
  { img: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=600', alt: 'Boutique inn', type: '🌸 Boutique · Mysuru', name: 'The Silk City Boutique Inn', loc: 'KR Circle, Mysuru', price: '₹6,500/night', rating: '4.5', id: 'l16' }
];

// ============================================================
// 2. STATE
// ============================================================
let state = {
  favourites: JSON.parse(localStorage.getItem('nd_favs')) || [],
  itinerary: JSON.parse(localStorage.getItem('nd_iti')) || { day1: [], day2: [], day3: [] },
  reviews: JSON.parse(localStorage.getItem('nd_reviews')) || REVIEWS_SEED,
  preferences: JSON.parse(localStorage.getItem('nd_prefs')) || [],
  currentCity: 'all', currentCat: 'all', searchQuery: '',
  activeDay: 'day1', userLat: null, userLng: null,
  heroRadius: 5, mapFilterCat: 'all', lang: 'en', lightMode: false
};

function persist() {
  localStorage.setItem('nd_favs', JSON.stringify(state.favourites));
  localStorage.setItem('nd_iti', JSON.stringify(state.itinerary));
  localStorage.setItem('nd_reviews', JSON.stringify(state.reviews));
  localStorage.setItem('nd_prefs', JSON.stringify(state.preferences));
}

// ============================================================
// 3. HELPERS
// ============================================================
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, r = v => v * Math.PI / 180;
  const dL = r(lat2 - lat1), dG = r(lng2 - lng1);
  const a = Math.sin(dL / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dG / 2) ** 2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}
function authClass(s) { return s >= 90 ? 'auth-high' : s >= 70 ? 'auth-mid' : 'auth-low'; }
function stars(r) {
  const f = Math.floor(r), h = r % 1 >= 0.5 ? 1 : 0;
  return `<span class="stars">${'★'.repeat(f)}${'½'.repeat(h)}${'☆'.repeat(5 - f - h)}</span> <span style="font-size:.78rem;color:var(--text-muted)">${r}</span>`;
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

const POS = ['amazing', 'incredible', 'love', 'fantastic', 'best', 'excellent', 'beautiful', 'worth', 'breathtaking', 'great', 'perfect', 'awesome'];
const NEG = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'mediocre', 'disappointing', 'poor', 'dirty', 'rude', 'avoid', 'overpriced'];
function detectSentiment(t) { const l = t.toLowerCase(), p = POS.filter(w => l.includes(w)).length, n = NEG.filter(w => l.includes(w)).length; return p > n ? 'positive' : n > p ? 'negative' : 'neutral'; }
function sentimentBadge(s) { const m = { positive: '😊 Positive', neutral: '😐 Neutral', negative: '😞 Negative' }; return `<span class="sentiment-badge sentiment-${s}">${m[s]}</span>`; }

// ============================================================
// 4. LANGUAGE TOGGLE — Full Kannada support
// ============================================================
const KN_MAP = {
  'Discover': 'ಅನ್ವೇಷಿಸಿ', 'Map': 'ನಕ್ಷೆ', 'AI Picks': 'AI ಆಯ್ಕೆಗಳು', 'Budget Trip': 'ಬಜೆಟ್ ಪ್ರವಾಸ',
  'Explore': 'ಅನ್ವೇಷಿಸಿ', 'Trip Planner': 'ಪ್ರಯಾಣ ಯೋಜಕ', 'Investors': 'ಹೂಡಿಕೆದಾರರು',
  'Find Near Me': 'ನನ್ನ ಬಳಿ ಹುಡುಕಿ', 'Explore All Spots': 'ಎಲ್ಲ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
  'Plan Within Budget': 'ಬಜೆಟ್‌ನಲ್ಲಿ ಯೋಜಿಸಿ', 'Expand Range +10km': 'ವ್ಯಾಪ್ತಿ ಹೆಚ್ಚಿಸಿ +10km',
  'Explore radius:': 'ಶೋಧನಾ ತ್ರಿಜ್ಯ:', 'Find Near Me': 'ನನ್ನ ಬಳಿ ಹುಡುಕಿ',
  'All Verified Spots': 'ಎಲ್ಲ ಪರಿಶೀಲಿತ ತಾಣಗಳು',
  'Show Verified Only': 'ಪರಿಶೀಲಿತ ಮಾತ್ರ ತೋರಿಸಿ',
  'Enable Location': 'ಸ್ಥಳ ಸಕ್ರಿಯಗೊಳಿಸಿ',
  'Discover What\'s Around You': 'ನಿಮ್ಮ ಸುತ್ತ ಏನಿದೆ ಅನ್ವೇಷಿಸಿ',
  'Know More About This Place': 'ಈ ಸ್ಥಳದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
  'Near You': 'ನಿಮ್ಮ ಬಳಿ', 'Places Within Your Radius': 'ನಿಮ್ಮ ತ್ರಿಜ್ಯದಲ್ಲಿ ಸ್ಥಳಗಳು',
  'Map View': 'ನಕ್ಷೆ ನೋಟ', 'Explore the Interactive Map': 'ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ ಅನ್ವೇಷಿಸಿ',
  'Filter by Type': 'ಪ್ರಕಾರದ ಮೂಲಕ ಫಿಲ್ಟರ್',
  'Your Personalized Karnataka': 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕರ್ನಾಟಕ',
  'What excites you most? (Pick all that apply)': 'ನಿಮ್ಮನ್ನು ಹೆಚ್ಚು ಉತ್ಸಾಹಗೊಳಿಸುವುದೇನು?',
  'Plan Your Trip Within Your Budget': 'ನಿಮ್ಮ ಬಜೆಟ್‌ನಲ್ಲಿ ಪ್ರಯಾಣ ಯೋಜಿಸಿ',
  'The Living Legacy of Karnataka': 'ಕರ್ನಾಟಕದ ಜೀವಂತ ಪರಂಪರೆ',
  'Where You Sleep Matters': 'ನೀವು ಮಲಗುವ ಸ್ಥಳ ಮುಖ್ಯ',
  'Build Your Karnataka Itinerary': 'ನಿಮ್ಮ ಕರ್ನಾಟಕ ಪ್ರಯಾಣ ಕ್ರಮ ಆಯ್ಕೆ ಮಾಡಿ',
  'Connect with Locals & Become an Explorer': 'ಸ್ಥಳೀಯರೊಂದಿಗೆ ಸಂಪರ್ಕ ಮತ್ತು ಅನ್ವೇಷಕರಾಗಿ',
  'Browse authentic places across Karnataka — filtered by your interests.': 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಅಧಿಕೃತ ಸ್ಥಳಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.',
  'Karnataka\'s Local Discovery Platform': 'ಕರ್ನಾಟಕದ ಸ್ಥಳೀಯ ಅನ್ವೇಷಣ ವೇದಿಕೆ',
  'Hidden Soul': 'ಅಡಗಿದ ಆತ್ಮ'
};

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'kn' : 'en';
  const btn = document.getElementById('lang-btn');
  btn.textContent = state.lang === 'en' ? '🇮🇳 ಕನ್ನಡ' : '🇬🇧 English';
  document.querySelectorAll('[data-en]').forEach(el => {
    const key = el.getAttribute('data-en');
    el.textContent = state.lang === 'kn' ? (KN_MAP[key] || el.getAttribute('data-kn') || key) : key;
  });
  showToast(state.lang === 'kn' ? 'ಕನ್ನಡ ಮೋಡ್ ಸಕ್ರಿಯ ✓' : 'Switched to English ✓');
}

// ============================================================
// 5. NAV + THEME
// ============================================================
function initNav() {
  const sel = document.getElementById('nav-city-sel');
  if (!sel) return;
  CITIES.forEach(c => sel.innerHTML += `<option value="${c.slug}">${c.name}</option>`);
  sel.addEventListener('change', e => { state.currentCity = e.target.value; renderSpots(); updateMapFilter(); });
}

function initTheme() {
  const isLight = localStorage.getItem('nd_light') === 'true';
  if (isLight) { document.body.classList.add('light'); state.lightMode = true; }
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    state.lightMode = document.body.classList.contains('light');
    document.getElementById('theme-toggle').textContent = state.lightMode ? '🌙' : '☀️';
    localStorage.setItem('nd_light', state.lightMode);
  });
}

// ============================================================
// 6. GEOLOCATION + RADIUS
// ============================================================
function requestGeolocation() {
  const btn = document.getElementById('geo-btn');
  if (btn) { btn.innerHTML = '📡 <span>Detecting…</span>'; btn.disabled = true; }
  if (!navigator.geolocation) { showToast('Geolocation not supported'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    state.userLat = pos.coords.latitude; state.userLng = pos.coords.longitude;
    onLocationGranted();
  }, () => {
    state.userLat = 12.9716; state.userLng = 77.5946;
    onLocationGranted(true);
  });
}

function onLocationGranted(simulated = false) {
  const btn = document.getElementById('geo-btn');
  if (btn) { btn.innerHTML = `✅ <span>${simulated ? 'Demo: Bengaluru' : 'Location Found'}</span>`; btn.disabled = false; }
  document.getElementById('nearby-section')?.classList.remove('hidden');
  document.getElementById('geo-card')?.classList.add('compact');
  renderNearbyPlaces();
  updateHeroVideo();
  if (window._map && state.userLat) updateMapUserLocation();
  showToast(simulated ? '📍 Demo location: Bengaluru' : '📍 Location detected! Showing nearby spots.');
}

function updateRadius(val) {
  state.heroRadius = +val;
  document.getElementById('radius-val').textContent = `${val} km`;
  if (state.userLat) renderNearbyPlaces();
  if (window._mapCircle && window._map) { window._map.removeLayer(window._mapCircle); }
  if (window._map && state.userLat) {
    window._mapCircle = L.circle([state.userLat, state.userLng], { radius: state.heroRadius * 1000, color: '#FF6B35', fillColor: '#FF6B35', fillOpacity: 0.08, weight: 2 }).addTo(window._map);
  }
}

function expandRadius() {
  const newVal = Math.min(state.heroRadius + 10, 100);
  state.heroRadius = newVal;
  const slider = document.getElementById('radius-slider');
  if (slider) slider.value = newVal;
  updateRadius(newVal);
  showToast(`📡 Radius expanded to ${newVal} km!`);
}

function renderNearbyPlaces() {
  const container = document.getElementById('nearby-grid'); if (!container) return;
  if (!state.userLat) { container.innerHTML = '<p style="color:var(--text-muted)">Enable location to see nearby spots.</p>'; return; }
  const sorted = [...LISTINGS]
    .map(l => ({ ...l, distKm: haversineKm(state.userLat, state.userLng, l.lat, l.lng) }))
    .filter(l => l.distKm <= state.heroRadius)
    .sort((a, b) => a.distKm - b.distKm).slice(0, 8);
  if (!sorted.length) { container.innerHTML = `<p style="color:var(--text-muted)">No spots within ${state.heroRadius}km. Try expanding your radius!</p>`; return; }
  container.innerHTML = sorted.map(l => `
    <div class="nearby-card" onclick="openSpotModal('${l.id}')">
      <div class="nearby-emoji">${l.category_icon}</div>
      <div>
        <div class="nearby-name">${l.name}</div>
        <div class="nearby-cat">${l.category} · ${l.city}</div>
        <div class="nearby-dist">📍 ${l.distKm} km away</div>
      </div>
    </div>`).join('');
}

function updateHeroVideo() {
  const nearestCity = CITIES.reduce((best, c) => {
    const d = haversineKm(state.userLat, state.userLng, c.lat, c.lng);
    return d < best.d ? { c, d } : best;
  }, { c: CITIES[0], d: Infinity }).c;
  const lsp = document.getElementById('location-summary');
  document.getElementById('lsp-title').textContent = `📍 ${nearestCity.name}`;
  document.getElementById('lsp-subtitle').textContent = nearestCity.overview;
  document.getElementById('lsp-best-time').textContent = `🗓️ Best time: ${nearestCity.bestTime}`;
  const hlEl = document.getElementById('lsp-highlights');
  if (hlEl) hlEl.innerHTML = nearestCity.highlights.map(h => `<li>${h}</li>`).join('');
}

function toggleLocationSummary() {
  const p = document.getElementById('location-summary');
  p.classList.toggle('open');
}

function visitNow() {
  toggleLocationSummary();
  document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    if (state.userLat && window._map) window._map.setView([state.userLat, state.userLng], 12);
  }, 800);
}

// ============================================================
// 7. SPOT CARDS
// ============================================================
function renderSpots() {
  const grid = document.getElementById('spots-grid'); if (!grid) return;
  const verifiedOnly = document.getElementById('verified-only')?.checked;
  let filtered = LISTINGS.filter(l => {
    const mCity = state.currentCity === 'all' || l.citySlug === state.currentCity;
    const mCat = state.currentCat === 'all' || l.category === state.currentCat;
    const mSearch = l.name.toLowerCase().includes(state.searchQuery) || l.description.toLowerCase().includes(state.searchQuery) || l.city.toLowerCase().includes(state.searchQuery);
    const mVerified = !verifiedOnly || l.verifiedLocal;
    return mCity && mCat && mSearch && mVerified;
  });
  if (!filtered.length) { grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;padding:2rem 0">No spots found. Try different filters.</p>`; return; }
  grid.innerHTML = filtered.map(l => spotCardHTML(l)).join('');
}

function spotCardHTML(l) {
  const isFav = state.favourites.includes(l.id), ac = authClass(l.authenticityScore);
  const isHidden = l.authenticityScore >= 90 && !l.verifiedLocal;
  const markerType = l.rating >= 4.8 ? '⭐' : l.verifiedLocal ? '✅' : isHidden ? '🌿' : '';
  return `
  <article class="spot-card" role="listitem">
    <div class="spot-card-img">
      <img src="${l.images[0]}" alt="${l.name}" loading="lazy">
      <div class="spot-card-badges">
        <span class="badge badge-cat">${l.category_icon} ${l.category}</span>
        ${l.verifiedLocal ? '<span class="badge badge-verified">✅ Verified</span>' : ''}
        ${l.isFamilyRun ? '<span class="badge badge-family">👨‍👩‍👧 Family Run</span>' : ''}
        ${isHidden ? '<span class="badge badge-gem">🌿 Hidden Gem</span>' : ''}
      </div>
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${l.id}',this)">${isFav ? '❤️' : '🤍'}</button>
    </div>
    <div class="spot-card-body">
      <div style="font-size:.73rem;color:var(--text-muted);margin-bottom:.2rem">${markerType} ${l.city}</div>
      <h3 class="spot-card-title">${l.name}</h3>
      <p class="spot-card-desc">${l.description.substring(0, 110)}…</p>
      <div class="spot-card-footer">
        <div class="auth-score ${ac}">
          <div class="auth-score-bar"><div class="auth-score-fill" style="width:${l.authenticityScore}%"></div></div>
          <span class="auth-score-num">${l.authenticityScore}/100</span>
        </div>
        <div style="display:flex;gap:.4rem;align-items:center">
          ${stars(l.rating)}
          <button class="btn btn-primary btn-sm" onclick="openSpotModal('${l.id}')">View</button>
        </div>
      </div>
    </div>
  </article>`;
}

function toggleFav(id, btn) {
  const i = state.favourites.indexOf(id);
  if (i > -1) { state.favourites.splice(i, 1); btn.textContent = '🤍'; btn.classList.remove('active'); showToast('Removed from favourites'); }
  else { state.favourites.push(id); btn.textContent = '❤️'; btn.classList.add('active'); showToast('❤️ Saved!'); }
  persist();
}

// ============================================================
// 8. SPOT MODAL — with tabs
// ============================================================
function openSpotModal(id) {
  const l = LISTINGS.find(x => x.id === id); if (!l) return;
  const isFav = state.favourites.includes(l.id), ac = authClass(l.authenticityScore);
  const related = LISTINGS.filter(x => x.city === l.city && x.id !== l.id).slice(0, 3);
  const revs = state.reviews.filter(r => r.place === l.name);
  document.getElementById('spot-modal-body').innerHTML = `
    <div class="modal-tabs">
      <button class="modal-tab active" onclick="switchTab(this,'tab-overview')">📋 Overview</button>
      <button class="modal-tab" onclick="switchTab(this,'tab-nearby')">🌿 Nearby</button>
      <button class="modal-tab" onclick="switchTab(this,'tab-reviews')">⭐ Reviews</button>
      <button class="modal-tab" onclick="switchTab(this,'tab-locals')">👥 Locals</button>
    </div>
    <div id="tab-overview" class="modal-tab-content active">
      <img src="${l.images[0]}" alt="${l.name}" style="width:100%;height:220px;object-fit:cover;border-radius:12px;margin-bottom:1rem">
      <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.75rem">
        <span class="badge badge-cat">${l.category_icon} ${l.category}</span>
        ${l.verifiedLocal ? '<span class="badge badge-verified">✅ Verified Local</span>' : ''}
        ${l.isFamilyRun ? '<span class="badge badge-family">👨‍👩‍👧 Family Run</span>' : ''}
      </div>
      <h3 style="margin-bottom:.3rem">${l.name}</h3>
      <div style="color:var(--text-muted);font-size:.83rem;margin-bottom:.75rem">📍 ${l.city} &nbsp;·&nbsp; ${stars(l.rating)}</div>
      <p style="font-size:.9rem;color:var(--text-muted);margin-bottom:1rem">${l.description}</p>
      <div class="auth-score ${ac}" style="margin-bottom:1rem">
        <strong style="font-size:.8rem">Authenticity:</strong>
        <div class="auth-score-bar" style="width:100px"><div class="auth-score-fill" style="width:${l.authenticityScore}%"></div></div>
        <span class="auth-score-num">${l.authenticityScore}/100</span>
      </div>
      ${l.yearsInOperation > 0 ? `<p style="font-size:.83rem;margin-bottom:.75rem">🕰️ <strong>${l.yearsInOperation}+ years</strong>${l.isFamilyRun ? ' · Family-run' : ''}</p>` : ''}
      <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem">
        ${l.tags.map(t => `<span style="background:rgba(255,107,53,0.15);color:var(--primary);padding:.2rem .6rem;border-radius:10px;font-size:.72rem;font-weight:600">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="addToItinerary('${l.id}')">+ Add to Itinerary</button>
        <button class="btn btn-ghost" onclick="toggleFavModal('${l.id}',this)">${isFav ? '❤️ Saved' : '🤍 Save'}</button>
        <button class="btn btn-secondary" onclick="focusOnMap('${l.id}')">🗺️ Show on Map</button>
        ${l.stayType ? `<button class="btn btn-accent" onclick="showToast('Demo: Booking coming soon!')">Book Stay</button>` : ''}
      </div>
    </div>
    <div id="tab-nearby" class="modal-tab-content">
      <h4 style="margin-bottom:1rem">🌍 More in ${l.city}</h4>
      ${related.map(r => `
        <div class="nearby-card" style="margin-bottom:.75rem" onclick="openSpotModal('${r.id}')">
          <div class="nearby-emoji">${r.category_icon}</div>
          <div><div class="nearby-name">${r.name}</div><div class="nearby-cat">${r.category}</div><div class="nearby-dist">${stars(r.rating)}</div></div>
        </div>`).join('')}
      <div style="margin-top:1.5rem">
        <h4 style="margin-bottom:.75rem">📍 Best Places Nearby</h4>
        <div style="display:flex;flex-wrap:wrap;gap:.4rem">
          <span class="chip">⭐ Best Rated</span><span class="chip">🌿 Hidden Gems</span><span class="chip">🛍️ Shops</span><span class="chip">🍛 Restaurants</span><span class="chip">📸 Photo Spots</span>
        </div>
      </div>
    </div>
    <div id="tab-reviews" class="modal-tab-content">
      <h4 style="margin-bottom:1rem">⭐ Reviews for ${l.name}</h4>
      ${revs.length ? revs.map(r => `<div class="review-card"><div class="review-header"><span class="review-author">👤 ${r.author}</span><span class="review-date">${r.date}</span></div><p class="review-text">${r.text}</p><div style="margin-top:.4rem">${sentimentBadge(r.sentiment)}</div></div>`).join('') : '<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>'}
    </div>
    <div id="tab-locals" class="modal-tab-content">
      <h4 style="margin-bottom:1rem">👥 Local Guides in ${l.city}</h4>
      ${EXPLORERS.filter(e => e.city === l.city).map(e => `
        <div class="explorer-card" style="text-align:left;display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;padding:1rem">
          <div class="explorer-avatar" style="width:48px;height:48px;font-size:1.2rem;flex-shrink:0">${e.avatar}</div>
          <div>
            <div class="explorer-name">${e.name}</div>
            <div class="explorer-badge">${e.badge} · ${e.speciality}</div>
            <div style="font-size:.75rem;color:var(--text-muted)">⭐ ${e.rating} · ${e.contributions} contributions</div>
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="showToast('Chat feature coming soon!')">💬 Chat</button>
        </div>`).join('') || '<p style="color:var(--text-muted)">No local guides registered yet in this city.</p>'}
    </div>`;
  openModal('spot-modal');
}

function switchTab(btn, tabId) {
  btn.closest('.modal-box').querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  btn.closest('.modal-box').querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
}

function toggleFavModal(id, btn) {
  const i = state.favourites.indexOf(id);
  if (i > -1) { state.favourites.splice(i, 1); btn.textContent = '🤍 Save'; showToast('Removed'); }
  else { state.favourites.push(id); btn.textContent = '❤️ Saved'; showToast('❤️ Saved!'); }
  persist(); renderSpots();
}

function focusOnMap(id) {
  const l = LISTINGS.find(x => x.id === id); if (!l) return;
  closeModal('spot-modal');
  document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { if (window._map) window._map.setView([l.lat, l.lng], 15); }, 800);
}

// ============================================================
// 9. FILTERS + MAP
// ============================================================
function initFilters() {
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentCat = chip.dataset.cat;
      renderSpots();
      setMapFilter(chip.dataset.cat);
    });
  });
  const searchEl = document.getElementById('spots-search');
  if (searchEl) searchEl.addEventListener('input', e => { state.searchQuery = e.target.value.toLowerCase(); renderSpots(); });
}

function setMapFilter(cat, btnEl) {
  state.mapFilterCat = cat;
  document.querySelectorAll('.map-cat-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  updateMapFilter();
}

function updateMapFilter() {
  window._markers?.forEach(m => {
    const visible = state.mapFilterCat === 'all' || m._category === state.mapFilterCat;
    const cityOk = state.currentCity === 'all' || m._citySlug === state.currentCity;
    if (visible && cityOk && !window._map.hasLayer(m)) window._map.addLayer(m);
    if ((!visible || !cityOk) && window._map.hasLayer(m)) window._map.removeLayer(m);
  });
}

function updateMapUserLocation() {
  if (window._userMarker) window._map.removeLayer(window._userMarker);
  window._userMarker = L.circleMarker([state.userLat, state.userLng], { radius: 10, color: '#FF6B35', fillColor: '#FF6B35', fillOpacity: 0.8, weight: 3 }).addTo(window._map).bindPopup('📍 You are here');
  updateRadius(state.heroRadius);
}

// ============================================================
// 10. LEAFLET MAP
// ============================================================
function initMap() {
  if (!window.L) return;
  const map = L.map('leaflet-map', { zoomControl: true }).setView([13.5, 76.0], 7);
  window._map = map; window._markers = [];

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap · © CARTO', maxZoom: 19
  }).addTo(map);

  const catColor = { Restaurant: '#FF6B35', Nature: '#00D4AA', Heritage: '#FFD166', Adventure: '#7C3AED', Shopping: '#FF4D6D', Homestay: '#06B6D4', 'Boutique Stay': '#EC4899', 'Eco Stay': '#22C55E', default: '#8B9EC7' };

  function markerFor(l) {
    const color = catColor[l.category] || catColor.default;
    const rating = l.rating >= 4.8 ? '⭐' : l.verifiedLocal ? '✅' : '🌿';
    const size = l.rating >= 4.8 ? 40 : 34;
    const icon = L.divIcon({
      className: '', iconSize: [size, size], iconAnchor: [size / 2, size],
      html: `<div style="background:${color};width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid rgba(255,255,255,0.9);box-shadow:0 4px 12px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center">
              <span style="transform:rotate(45deg);font-size:${size / 2.5}px">${l.category_icon}</span></div>`
    });
    const m = L.marker([l.lat, l.lng], { icon }).addTo(map);
    m.bindPopup(`
      <div style="min-width:200px;font-family:Poppins,sans-serif">
        <img src="${l.images[0]}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:.5rem">
        <div style="font-size:.7rem;color:#888;margin-bottom:.2rem">${rating} ${l.category}</div>
        <strong style="font-size:.9rem">${l.name}</strong><br>
        <small style="color:#888">${l.city}</small><br>
        <div style="margin:.4rem 0;font-size:.8rem">${'★'.repeat(Math.floor(l.rating))} ${l.rating}</div>
        <p style="font-size:.75rem;color:#aaa;margin:.3rem 0">${l.description.substring(0, 80)}…</p>
        <button onclick="openSpotModal('${l.id}')" style="margin-top:.4rem;padding:.3rem .75rem;background:#FF6B35;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:.78rem;width:100%">👁️ View Details</button>
      </div>`);
    m._listingId = l.id; m._category = l.category; m._citySlug = l.citySlug;
    return m;
  }

  LISTINGS.forEach(l => window._markers.push(markerFor(l)));

  map.on('zoomend', () => {
    const zoom = map.getZoom();
    window._markers.forEach(m => {
      const l = LISTINGS.find(x => x.id === m._listingId);
      if (!l) return;
      const showAll = zoom >= 10;
      const showTop = l.rating >= 4.8 || l.authenticityScore >= 90;
      const visible = showAll || showTop;
      const catOk = state.mapFilterCat === 'all' || m._category === state.mapFilterCat;
      const cityOk = state.currentCity === 'all' || m._citySlug === state.currentCity;
      if (visible && catOk && cityOk && !map.hasLayer(m)) map.addLayer(m);
      if ((!visible || !catOk || !cityOk) && map.hasLayer(m)) map.removeLayer(m);
    });
  });
}

// ============================================================
// 11. AI RECOMMENDATIONS
// ============================================================
const PREF_RULES = {
  Heritage: ['Heritage'], 'Food': ['Restaurant'], Nature: ['Nature'],
  Shopping: ['Shopping'], Stays: ['Homestay', 'Boutique Stay', 'Eco Stay'], Adventure: ['Adventure']
};

function togglePref(el) {
  const p = el.dataset.pref, i = state.preferences.indexOf(p);
  if (i > -1) { state.preferences.splice(i, 1); el.classList.remove('selected'); }
  else { state.preferences.push(p); el.classList.add('selected'); }
  persist();
}

function generateAIRecommendations() {
  if (!state.preferences.length) { showToast('Pick at least one preference!'); return; }
  const cats = state.preferences.flatMap(p => PREF_RULES[p] || []);
  const picks = LISTINGS.filter(l => cats.some(c => l.category === c))
    .sort((a, b) => b.authenticityScore - a.authenticityScore).slice(0, 5);
  const container = document.getElementById('ai-picks-list');
  const section = document.getElementById('ai-picks-section');
  if (!container || !section) return;
  container.innerHTML = picks.length
    ? picks.map(l => `<div class="ai-pick-card" onclick="openSpotModal('${l.id}')" style="cursor:pointer">
        <div class="ai-reason">✨ Matched: ${state.preferences.join(' & ')}</div>
        <div class="ai-pick-name">${l.category_icon} ${l.name}</div>
        <div class="ai-pick-meta">${l.city} · ${l.category} · Score ${l.authenticityScore}/100 · ${stars(l.rating)}</div>
      </div>`).join('')
    : '<p style="color:var(--text-muted)">No matches. Try different preferences.</p>';
  section.classList.remove('hidden');
  showToast(`✨ AI found ${picks.length} picks for you!`);
  section.scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// 12. REVIEWS + SENTIMENT
// ============================================================
function renderReviews() {
  const c = document.getElementById('reviews-list'); if (!c) return;
  c.innerHTML = state.reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-author">👤 ${r.author}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-place">📍 ${r.place}</div>
      <p class="review-text">${r.text}</p>
      <div style="margin-top:.4rem">${sentimentBadge(r.sentiment)}</div>
    </div>`).join('');
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('review-author').value;
  const place = document.getElementById('review-place').value;
  const text = document.getElementById('review-text').value;
  if (!author || !place || !text) return;
  const sentiment = detectSentiment(text);
  state.reviews.unshift({ id: 'r_' + Date.now(), author, place, text, date: new Date().toISOString().split('T')[0], sentiment });
  persist(); renderReviews(); e.target.reset();
  showToast(`Review submitted! Sentiment: ${sentiment} ${sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😞' : '😐'}`);
}

// ============================================================
// 13. ITINERARY BUILDER
// ============================================================
function initItinerary() {
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeDay = btn.dataset.day;
      renderItinerary();
    });
  });
  const sel = document.getElementById('iti-spot-sel');
  if (sel) LISTINGS.forEach(l => { sel.innerHTML += `<option value="${l.id}">${l.name} (${l.city})</option>`; });
}

function addToItinerary(id) {
  const day = state.itinerary[state.activeDay];
  if (!day.includes(id)) { day.push(id); persist(); renderItinerary(); showToast('✅ Added to itinerary!'); closeModal('spot-modal'); }
  else showToast('Already in today\'s itinerary!');
}

function addSpotFromDropdown() {
  const sel = document.getElementById('iti-spot-sel');
  if (sel && sel.value) addToItinerary(sel.value);
}

function removeFromItinerary(id) {
  state.itinerary[state.activeDay] = state.itinerary[state.activeDay].filter(x => x !== id);
  persist(); renderItinerary();
}

function moveIti(index, dir) {
  const arr = state.itinerary[state.activeDay], nI = index + dir;
  if (nI < 0 || nI >= arr.length) return;
  [arr[index], arr[nI]] = [arr[nI], arr[index]];
  persist(); renderItinerary();
}

function renderItinerary() {
  const c = document.getElementById('iti-items'); if (!c) return;
  const items = state.itinerary[state.activeDay] || [];
  document.getElementById('iti-count').textContent = `${items.length} stops`;
  if (!items.length) { c.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;padding:.5rem 0">No stops yet. Add places from spot cards.</p>'; return; }
  c.innerHTML = items.map((id, idx) => {
    const l = LISTINGS.find(x => x.id === id); if (!l) return '';
    return `<div class="iti-item">
      <div><div class="iti-item-name">${l.category_icon} ${l.name}</div><div class="iti-item-meta">${l.city} · ${l.category}</div></div>
      <div class="iti-controls">
        <button onclick="moveIti(${idx},-1)">▲</button>
        <button onclick="moveIti(${idx},1)">▼</button>
        <button onclick="removeFromItinerary('${id}')" style="color:#FF4D6D">✕</button>
      </div>
    </div>`;
  }).join('');
}

function exportItinerary() {
  const all = { day1: [], day2: [], day3: [] };
  ['day1', 'day2', 'day3'].forEach(d => { all[d] = state.itinerary[d].map(id => { const l = LISTINGS.find(x => x.id === id); return l ? { name: l.name, city: l.city, category: l.category } : null; }).filter(Boolean); });
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'nd_itinerary.json'; a.click();
  URL.revokeObjectURL(url); showToast('📥 Itinerary exported!');
}

function shareItinerary() {
  const total = Object.values(state.itinerary).flat().length;
  if (!total) { showToast('Add some spots first!'); return; }
  showToast('🔗 Share link copied! (Simulated)');
}

function clearItinerary() {
  state.itinerary = { day1: [], day2: [], day3: [] };
  persist(); renderItinerary(); showToast('Itinerary cleared.');
}

// ============================================================
// 14. BUDGET PLANNER
// ============================================================
function updateBudget(val) {
  document.getElementById('budget-val').textContent = `₹${Number(val).toLocaleString('en-IN')}/day`;
  const picks = LISTINGS.filter(l => l.budget <= val).sort((a, b) => b.rating - a.rating).slice(0, 6);
  const c = document.getElementById('budget-results'); if (!c) return;
  if (!picks.length) { c.innerHTML = '<p style="color:var(--text-muted)">No spots within this budget. Try increasing.</p>'; return; }
  c.innerHTML = `
    <div style="margin-bottom:1rem;font-size:.88rem;color:var(--text-muted)">
      Found <strong style="color:var(--secondary)">${picks.length} spots</strong> within ₹${Number(val).toLocaleString('en-IN')}/day
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem">
      ${picks.map(l => `
        <div class="ai-pick-card" onclick="openSpotModal('${l.id}')" style="cursor:pointer">
          <div class="ai-reason">💰 Fits your budget · ₹${l.budget ? l.budget.toLocaleString('en-IN') : 0}/visit</div>
          <div class="ai-pick-name">${l.category_icon} ${l.name}</div>
          <div class="ai-pick-meta">${l.city} · ${l.category} · ${stars(l.rating)}</div>
        </div>`).join('')}
    </div>`;
}

// ============================================================
// 15. BUSINESS + STAYS — Dynamic render
// ============================================================
function renderBusinesses() {
  const c = document.getElementById('business-grid'); if (!c) return;
  c.innerHTML = BUSINESSES.map(b => `
    <div class="business-card" role="listitem">
      <div class="business-icon">${b.icon}</div>
      <div class="business-badge">${b.badge}</div>
      <div class="business-name">${b.name}</div>
      <div class="business-years">📍 ${b.loc}</div>
      <p class="business-desc">${b.desc}</p>
      <div class="business-tags">${b.tags.map(t => `<span class="business-tag">${t}</span>`).join('')}</div>
    </div>`).join('');
}

function renderStays() {
  const c = document.getElementById('stays-grid'); if (!c) return;
  c.innerHTML = STAYS_DATA.map(s => `
    <div class="stay-card">
      <div class="stay-img"><img src="${s.img}" alt="${s.alt}" loading="lazy"></div>
      <div class="stay-body">
        <div class="stay-type">${s.type}</div>
        <div class="stay-name">${s.name}</div>
        <div class="stay-location">📍 ${s.loc}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.6rem">
          <div class="stay-price">${s.price}</div>
          <div class="stay-rating">★ ${s.rating}</div>
        </div>
        <div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="showToast('Demo: Booking opens soon via Razorpay!')">Book Now</button>
          <button class="btn btn-ghost btn-sm" onclick="openSpotModal('${s.id}')">View Details</button>
        </div>
      </div>
    </div>`).join('');
}

// ============================================================
// 16. EXPLORER + LOCALS
// ============================================================
function renderExplorers() {
  const c = document.getElementById('explorer-grid'); if (!c) return;
  c.innerHTML = EXPLORERS.map(e => `
    <div class="explorer-card">
      <div class="explorer-avatar">${e.avatar}</div>
      <div class="explorer-name">${e.name}</div>
      <div class="explorer-badge">${e.badge}</div>
      <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.5rem">📍 ${e.city} · ${e.speciality}</div>
      <div class="explorer-stats">
        <span>📍 ${e.contributions} spots</span>
        <span>⭐ ${e.rating}</span>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-top:.75rem;width:100%" onclick="showToast('Chat feature coming soon! 🚀')">💬 Connect</button>
    </div>`).join('');
}

function renderLocalsList() {
  const c = document.getElementById('locals-list'); if (!c) return;
  c.innerHTML = EXPLORERS.map(e => `
    <div style="display:flex;align-items:center;gap:1rem;padding:.75rem;background:var(--glass);border-radius:var(--radius-sm);margin-bottom:.6rem;border:1px solid var(--border)">
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#FF6B35,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0">${e.avatar}</div>
      <div style="flex:1">
        <div style="font-weight:600;font-size:.9rem">${e.name}</div>
        <div style="font-size:.75rem;color:var(--secondary)">${e.badge}</div>
        <div style="font-size:.73rem;color:var(--text-muted)">📍 ${e.city} · ⭐ ${e.rating}</div>
      </div>
      <button class="btn btn-ghost btn-xs" onclick="showToast('Chat with ${e.name} — coming soon!')">Chat</button>
    </div>`).join('');
}

function submitExplorer() {
  const name = document.getElementById('exp-name')?.value;
  const place = document.getElementById('exp-place')?.value;
  const cat = document.getElementById('exp-cat')?.value;
  const summary = document.getElementById('exp-summary')?.value;
  const gem = document.getElementById('exp-gem')?.checked;
  if (!name || !place || !summary) { showToast('Please fill all fields!'); return; }
  closeModal('explorer-form-modal');
  showToast(`🎉 "${place}" submitted for review! You're an Explorer now, ${name.split(' ')[0]}!`);
}

// ============================================================
// 17. CHATBOT — NammaBot
// ============================================================
const CHAT_RULES = [
  { keys: ['hello', 'hi', 'hey', 'namaste'], reply: 'Namaste! 🙏 I\'m NammaBot, your Karnataka travel guide. Ask me about food, heritage, nature, or hidden gems!' },
  { keys: ['food', 'eat', 'restaurant', 'dosa', 'thali'], reply: '🍽️ Karnataka food trail: CTR in Bengaluru has legendary benne dosa (since 1924), Vinayaka Mylari in Mysuru for masala dose, Hotel Woodlands in Udupi for authentic thali. All locally verified!' },
  { keys: ['nature', 'waterfall', 'trek', 'hike'], reply: '🌿 Top nature spots: Abbey Falls & Iruppu Falls in Coorg, Diana\'s Beach in Udupi, Hessarghatta Lake near Bengaluru. Use the radius filter to find ones near you!' },
  { keys: ['heritage', 'temple', 'palace', 'history', 'heritage'], reply: '🏛️ Heritage highlights: Mysore Palace (illuminated on Sundays!), Virupaksha Temple in Hampi (active since 7th century!), Udupi Krishna Temple (13th century). All UNESCO-worthy!' },
  { keys: ['shopping', 'silk', 'craft', 'market'], reply: '🛍️ Shop local: Sri Lakshmi Silk Store in Mysuru for authentic Mysore silk, Devaraja Market for spices, Bidriware in Bidar for UNESCO craft. Buy directly from artisans!' },
  { keys: ['stay', 'homestay', 'hotel', 'boutique', 'eco'], reply: '🏡 Top stays: Coorg Coffee Estate Homestay (₹4,500/night), Evolve Back Boutique (₹35,000), Hampi Eco Lodge (₹3,200). Book via the Stays section!' },
  { keys: ['budget', 'cheap', 'affordable', 'free'], reply: '💰 Budget explorer? Use the Budget Planner section — set your daily budget and we\'ll show spots that fit! Many heritage spots are free or under ₹100.' },
  { keys: ['hampi', 'ruins', 'boulder', 'vijayanagara'], reply: '🗿 Hampi is magical! Virupaksha Temple, riverside bouldering, Vittala Temple\'s stone chariot. Best visited Nov–Feb. Stay at Hampi Eco Lodge for sunrise views.' },
  { keys: ['coorg', 'coffee', 'misty', 'kodagu'], reply: '☕ Coorg (Kodagu) — Scotland of India! Abbey Falls, coffee estate stays, Nagarhole wildlife. Best Oct–Apr. Try the Kodava Coffee Estate Homestay!' },
  { keys: ['mysuru', 'mysore', 'palace', 'silk'], reply: '🏰 Mysuru — City of Palaces! Palace is illuminated on Sundays (97,000 bulbs!). Mysuru Dasara in Oct is unmissable. Stay at Rajendra Vilas for royal experience.' },
  { keys: ['map', 'filter', 'how', 'use', 'works'], reply: '🗺️ How to use: 1) Enable location → see nearby spots. 2) Use the Map section → click markers. 3) Filter by category. 4) Use radius slider to expand search. 5) Build your itinerary!' },
  { keys: ['kannada', 'language', 'translate'], reply: '🇮🇳 ಕನ್ನಡ! Click the "🇮🇳 ಕನ್ನಡ" button in the top navigation to toggle the entire site to Kannada. Click again to switch back to English.' },
  { keys: ['explorer', 'local', 'guide', 'contribute'], reply: '🧭 Want to be an explorer? Click "Become an Explorer" in the Explorer section. Add new places, upload summaries, tag hidden gems — you earn a badge for every verified contribution!' },
  { keys: ['hidden', 'gem', 'unexplored', 'secret'], reply: '🌿 Hidden gems: Iruppu Falls (Coorg), Diana\'s Beach (Udupi), Hessarghatta Lake (Bengaluru). Look for the 🌿 badge on cards — those are spots rarely visited by tourists!' }
];

const CHAT_DEFAULT = '😊 I\'m not sure about that! Try asking about: food, stays, nature, heritage, shopping, Hampi, Coorg, Mysuru, or type "how to use" for a platform guide!';

function toggleChatbot() {
  const panel = document.getElementById('chatbot-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open') && !document.getElementById('chat-messages').children.length) {
    addChatMsg('bot', 'Namaste! 🙏 I\'m <strong>NammaBot</strong> — your Karnataka travel guide! Ask me about food, heritage sites, hidden gems, budget tips, or how to use this platform.');
    const sugg = document.createElement('div');
    sugg.className = 'chat-suggestion';
    sugg.innerHTML = [['🍽️ Best food', 'best food'], ['🌿 Hidden gems', 'hidden gems'], ['🏛️ Heritage sites', 'heritage sites'], ['💰 Budget tips', 'budget'], ['🗺️ How to use', 'how to use']].map(([label, q]) => `<button class="chat-sugg-btn" onclick="sendChatQuery('${q}')">${label}</button>`).join('');
    document.getElementById('chat-messages').appendChild(sugg);
  }
}

function addChatMsg(who, text) {
  const c = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${who}`;
  div.innerHTML = text;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function sendChatQuery(q) {
  addChatMsg('user', q);
  setTimeout(() => {
    const lower = q.toLowerCase();
    const rule = CHAT_RULES.find(r => r.keys.some(k => lower.includes(k)));
    addChatMsg('bot', rule ? rule.reply : CHAT_DEFAULT);
  }, 350);
}

function sendChat() {
  const inp = document.getElementById('chat-input');
  const q = inp.value.trim(); if (!q) return;
  inp.value = '';
  sendChatQuery(q);
}

// ============================================================
// 18. MODERATION
// ============================================================
const PENDING = [
  { id: 'a1', name: 'Saraswathi Bhat', city: 'Udupi', spot: 'Kadle Mannu Waterfall', status: 'pending', submitted: '2026-02-20' },
  { id: 'a2', name: 'Mahesh Gowda', city: 'Coorg', spot: 'Kodava Heritage Kitchen', status: 'pending', submitted: '2026-02-22' },
  { id: 'a3', name: 'Lakshmi Nair', city: 'Hampi', spot: 'Traditional Banana Craft Shop', status: 'approved', submitted: '2026-02-10' }
];

function renderModeration() {
  const c = document.getElementById('mod-list'); if (!c) return;
  const apps = JSON.parse(localStorage.getItem('nd_pending')) || PENDING;
  c.innerHTML = apps.map(a => `
    <div class="mod-item">
      <div><strong>${a.spot}</strong><div style="font-size:.8rem;color:var(--text-muted)">By ${a.name} · ${a.city} · ${a.submitted}</div></div>
      <div style="display:flex;align-items:center;gap:.5rem">
        <span class="mod-status ${a.status === 'approved' ? 'mod-approved' : 'mod-pending'}">${a.status}</span>
        ${a.status === 'pending' ? `<button class="btn btn-sm btn-secondary" onclick="approveApp('${a.id}')">Approve</button>` : ''}
      </div>
    </div>`).join('');
}

function approveApp(id) {
  const apps = JSON.parse(localStorage.getItem('nd_pending')) || PENDING;
  const a = apps.find(x => x.id === id);
  if (a) { a.status = 'approved'; localStorage.setItem('nd_pending', JSON.stringify(apps)); renderModeration(); showToast('✅ Listing approved!'); }
}

// ============================================================
// 19. SKELETON LOADER
// ============================================================
function showSkeletons(id, n = 6) {
  const c = document.getElementById(id); if (!c) return;
  c.innerHTML = Array.from({ length: n }, () => `
    <div class="spot-card">
      <div class="skeleton" style="height:200px"></div>
      <div style="padding:1rem">
        <div class="skeleton" style="height:14px;width:60%;margin-bottom:.5rem"></div>
        <div class="skeleton" style="height:11px;width:90%;margin-bottom:.3rem"></div>
        <div class="skeleton" style="height:11px;width:75%"></div>
      </div>
    </div>`).join('');
}

// ============================================================
// 20. INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initFilters();
  initItinerary();

  // Renders
  showSkeletons('spots-grid');
  setTimeout(() => renderSpots(), 700);
  renderReviews();
  renderItinerary();
  renderBusinesses();
  renderStays();
  renderExplorers();
  renderLocalsList();
  if (document.getElementById('leaflet-map')) initMap();
  if (document.getElementById('mod-list')) renderModeration();

  // Default budget render
  updateBudget(2000);

  // Re-apply saved quiz prefs
  state.preferences.forEach(p => {
    document.querySelectorAll('.quiz-option').forEach(el => { if (el.dataset.pref === p) el.classList.add('selected'); });
  });

  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.boxShadow = window.scrollY > 50 ? '0 4px 40px rgba(0,0,0,0.5)' : '';
    // Active nav link highlight
    const sections = ['discover', 'map-section', 'ai-section', 'budget-section', 'explorer-section', 'itinerary-section', 'investor-section'];
    let active = 'discover';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) active = id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + active);
    });
  });

  // Modal close on backdrop
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Review form
  const rf = document.getElementById('review-form');
  if (rf) rf.addEventListener('submit', handleReviewSubmit);

  // Hamburger
  const ham = document.getElementById('hamburger'), mob = document.getElementById('mobile-menu');
  if (ham && mob) ham.addEventListener('click', () => mob.classList.toggle('hidden'));

  // Close mobile menu on link click
  mob?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => mob.classList.add('hidden')));

  // Chat input Enter key (already handled via onkeydown in HTML, but backup)
  document.getElementById('chat-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

  console.log('%c🟠 NammaDiscover v2.0 loaded!', 'color:#FF6B35;font-size:16px;font-weight:bold');
});
