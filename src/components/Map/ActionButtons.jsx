import { useApp } from "../../store/AppContext";
import { CATEGORIES } from "../../map/constants";

const catMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export default function ActionButtons({ location }) {
  const {
    t,
    isSaved,
    toggleSaved,
    addToItinerary,
    isInItinerary,
    setAudioPlaying,
  } = useApp();
  const cat = location?.category;
  const saved = isSaved(location?._id);
  const inItin = isInItinerary(location?._id);
  const catInfo = catMap[cat] || {};

  const navigate = (url) => window.open(url, "_blank");
  const openMaps = () => {
    const [lng, lat] = location.location.coordinates;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: location.displayName,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

// Base buttons for all locations
const base = [
  {
    icon: saved ? "❤" : "🤍",
    label: saved ? t.unsaveLocation : t.saveLocation,
    onClick: () => toggleSaved(location),
    cls: saved ? "saved" : "",
    type: "save",
  },
  { icon: "📍", label: t.navigate || "Navigate", onClick: openMaps, type: "navigate" },
  { icon: "📤", label: t.share || "Share", onClick: share, type: "share" },
  {
    icon: inItin ? "✅" : "➕",
    label: inItin ? "In Itinerary" : t.addToItinerary || "Add to Itinerary",
    onClick: () => !inItin && addToItinerary(location),
    cls: inItin ? "primary" : "",
    type: "itinerary",
  },
];

// Audio story button for heritage/temple/hidden_gem
const hasAudio =
  ["temple", "heritage", "hidden_gem", "local_pick"].includes(cat) &&
  (location.audioStory?.en || location.audioStory?.kn);

// Category-specific buttons
const specific = {
  stay: [
    {
      icon: "🛏",
      label: t.bookStay || "Book Stay",
      onClick: () =>
        location.externalLinks?.booking &&
        navigate(location.externalLinks.booking),
      type: "itinerary",
    },
    { icon: "📅", label: t.checkAvailability || "Check Availability", type: "review" },
    { icon: "💬", label: t.contactProperty || "Contact Property", type: "share" },
  ],
  food: [
    { icon: "🍽", label: t.reserveTable || "Reserve a Table", type: "review" },
    {
      icon: "📋",
      label: t.viewMenu || "View Menu",
      onClick: () =>
        location.externalLinks?.menu && navigate(location.externalLinks.menu),
      type: "share",
    },
    { icon: "⏰", label: t.checkHours || "Opening Hours", type: "audio" },
  ],
  heritage: [
    {
      icon: "🎟",
      label: t.bookTicket || "Book Ticket",
      onClick: () =>
        location.externalLinks?.tickets &&
        navigate(location.externalLinks.tickets),
      type: "itinerary",
    },
    {
      icon: "🎧",
      label: t.audioGuide || "Audio Guide",
      onClick: () => setAudioPlaying(location),
      type: "audio",
    },
    { icon: "🧑‍🏫", label: t.bookTour || "Book Tour", type: "review" },
  ],
  temple: [
    { icon: "🙏", label: t.darshanTimings || "Darshan Timings", type: "review" },
    { icon: "📿", label: t.poojaSchedule || "Pooja Schedule", type: "itinerary" },
    {
      icon: "🎧",
      label: t.listenStory || "Listen Story",
      onClick: () => setAudioPlaying(location),
      type: "audio",
    },
  ],
  nature: [
    { icon: "🥾", label: t.bookTrekGuide || "Book Trek Guide", type: "itinerary" },
    { icon: "🏕", label: t.campingOptions || "Camping Options", type: "review" },
    { icon: "🌦", label: t.bestSeason || "Best Season", type: "audio" },
    { icon: "📸", label: t.viewPhotoSpots || "Photo Spots", type: "share" },
  ],
  photo_spot: [
    { icon: "📸", label: t.bestAngles || "Best Angles", type: "share" },
    { icon: "🌅", label: t.goldenHour || "Golden Hour", type: "audio" },
  ],
  shop: [
    {
      icon: "🛒",
      label: t.browseProducts || "Browse Products",
      onClick: () =>
        location.externalLinks?.website &&
        navigate(location.externalLinks.website),
      type: "itinerary",
    },
    { icon: "🕐", label: t.storeHours || "Store Hours", type: "review" },
  ],
  hidden_gem: [
    { icon: "🔍", label: t.exploreArea || "Explore Area", type: "itinerary" },
    { icon: "💬", label: t.chatLocal || "Chat with Local", type: "share" },
    {
      icon: "🎧",
      label: "Listen Story",
      onClick: () => setAudioPlaying(location),
      type: "audio",
    },
  ],
  local_pick: [
    { icon: "🔍", label: t.exploreArea || "Explore Area", type: "itinerary" },
    {
      icon: "🎧",
      label: "Listen Story",
      onClick: () => setAudioPlaying(location),
      type: "audio",
    },
  ],
};

  const extraBtns = specific[cat] || [];
  const allBtns = [...base, ...extraBtns];

  return (
    <div className="actions-grid">
      {allBtns.map((btn, i) => (
        <button
          key={i}
          className={`action-btn ${btn.cls || ""}`}
          data-type={btn.type || undefined}
          onClick={btn.onClick || undefined}
        >
          <span className="action-btn-icon">{btn.icon}</span>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}