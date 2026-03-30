import L from 'leaflet';
import { CATEGORIES } from './constants';

const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

/* SVG icon paths for each category — no emojis */
const CAT_SVG_PATHS = {
  food: `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" stroke-linecap="round"/><path d="M7 2v20" stroke-linecap="round"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7" stroke-linecap="round"/>`,
  stay: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  shop: `<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
  hidden_gem: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
  local_pick: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
  nature: `<path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 4-2 8-2s4 2 8 2V14C14 14 12 10 17 8z"/>`,
  temple: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`,
  heritage: `<rect x="3" y="11" width="18" height="11" rx="1"/><path d="M3 11l9-9 9 9"/><rect x="9" y="14" width="6" height="8"/>`,
  photo_spot: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`,
  secret_cafe: `<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>`,
  street_food: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  niche_gaming: `<rect x="2" y="6" width="20" height="12" rx="2"/><line x1="12" y1="11" x2="12" y2="13"/><line x1="11" y1="12" x2="13" y2="12"/>`,
  indie_bookstore: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,
  default: `<circle cx="12" cy="10" r="4"/><path d="M12 14v6"/>`,
};

function buildSvgHtml(svgPath, color, size = 36) {
  const half = size / 2;
  return `<svg viewBox="0 0 ${size} ${size * 1.3}" width="${size}" height="${size * 1.3}" xmlns="http://www.w3.org/2000/svg">
    <!-- Teardrop pin body -->
    <path d="M${half} 1.5C${half - 9} 1.5 ${3} ${8} ${3} ${half}c0 ${half - 3} ${half - 3} ${half + 6} ${half - 3} ${half + 6}S${size - 3} ${half * 1.8} ${size - 3} ${half}C${size - 3} ${8} ${half + 9} 1.5 ${half} 1.5z"
      fill="${color}" stroke="white" stroke-width="2"/>
    <!-- Icon -->
    <g transform="translate(${half - 8}, ${half - 10}) scale(0.67)" stroke="white" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      ${svgPath}
    </g>
  </svg>`;
}

export function createCategoryIcon(category) {
  const cat = catMap[category] || { color: '#888888' };
  const svgPath = CAT_SVG_PATHS[category] || CAT_SVG_PATHS.default;
  const html = buildSvgHtml(svgPath, cat.color);
  return L.divIcon({
    className: '',
    html: `<div style="cursor:pointer;filter:drop-shadow(0 3px 8px rgba(0,0,0,0.35));transition:filter 0.2s,transform 0.2s">${html}</div>`,
    iconSize: [36, 47],
    iconAnchor: [18, 47],
    popupAnchor: [0, -50],
  });
}

export function createUserIcon() {
  // Premium SVG location pin with inline sonar pulse
  const html = `
    <div style="position:relative;width:48px;height:48px;">
      <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <!-- Sonar rings -->
        <circle cx="24" cy="24" r="12" fill="none" stroke="#1A6494" stroke-width="1.5" opacity="0">
          <animate attributeName="r" values="12;28" dur="2s" repeatCount="indefinite" begin="0s"/>
          <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="0s"/>
        </circle>
        <circle cx="24" cy="24" r="12" fill="none" stroke="#1A6494" stroke-width="1" opacity="0">
          <animate attributeName="r" values="12;36" dur="2s" repeatCount="indefinite" begin="0.7s"/>
          <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" begin="0.7s"/>
        </circle>
        <!-- Pin body -->
        <path d="M24 6C17.4 6 12 11.4 12 18c0 9.9 12 24 12 24s12-14.1 12-24C36 11.4 30.6 6 24 6z"
          fill="#1A6494" stroke="white" stroke-width="2"/>
        <!-- Inner dot -->
        <circle cx="24" cy="18" r="5" fill="white" opacity="0.95"/>
        <circle cx="24" cy="18" r="3" fill="#1A6494"/>
      </svg>
    </div>`;

  return L.divIcon({
    className: '',
    html,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });
}

export function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  const size = count > 100 ? 54 : count > 10 ? 46 : 38;
  const html = `
    <div style="
      width:${size}px; height:${size}px;
      background:linear-gradient(135deg,#2D7A35,#1A6494);
      border:3px solid white;
      border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      color:white; font-weight:700; font-size:0.78rem;
      box-shadow:0 4px 16px rgba(45,122,53,0.55);
      font-family:Inter,sans-serif;
    ">${count}</div>`;
  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
