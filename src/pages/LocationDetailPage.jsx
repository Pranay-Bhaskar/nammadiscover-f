import logo from "../assets/logo.png"; // Adjust path if necessary
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { fetchLocationById, fetchReviews, fetchGuides } from "../services/api";
import { CATEGORIES } from "../map/constants";
import ActionButtons from "../components/Map/ActionButtons";
import ReviewsTab from "../components/Map/ReviewsTab";
import NearbyTab from "../components/Map/NearbyTab";
import LocalGuidesTab from "../components/Map/LocalGuidesTab";
import GalleryTab from "../components/Map/GalleryTab";
import "./detail-hero-premium.css";

const catMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

const CATEGORY_FALLBACKS = {
  food: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stay: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJUo-NnW7_kPqmT9aQpgyEPqqDu8oXnj0cA&s",
  shop: "https://www.thebengalurulive.com/wp-content/uploads/2021/01/Garuda-Mall.jpg",
  hidden_gem:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Mn-vSbX-sJW8OI5Bjk_rRXwdIjaIccEoQw&s",
  local_pick:
    "https://images.hindustantimes.com/img/2021/07/06/550x309/Karnataka_1625550341795_1625550353626.jpg",
  nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
  temple: "https://plus.unsplash.com/premium_photo-1697730413851-1e09e3252314?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  heritage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq9MQ_HvS89gDSWclfSkkdNstGG7xT3BkJw&s",
  photo_spot:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJqfRQdOMOXXlPRaZemBW8bi7imzsYPIj_Q&s",
  // add any remaining category IDs from your CATEGORIES array below
};

const TABS = [
  { id: "overview", icon: "📋", key: "overview" },
  { id: "nearby", icon: "🌿", key: "nearby" },
  { id: "reviews", icon: "⭐", key: "reviews" },
  { id: "locals", icon: "👥", key: "locals" },
  { id: "gallery", icon: "📸", key: "gallery" },
  { id: "travelTips", icon: "🧭", key: "travelTips" },
  { id: "culturalStory", icon: "📜", key: "culturalStory" },
  { id: "foodNearby", icon: "🍽", key: "foodNearby" },
];

export default function LocationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useApp();
  const [location, setLocation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([fetchLocationById(id, language), fetchReviews(id)])
      .then(([loc, revs]) => {
        setLocation(loc);
        setReviews(revs);
        if (loc.city) {
          fetchGuides(loc.city)
            .then(setGuides)
            .catch(() => { });
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [id, language]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div
        className="detail-page"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺</div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div
        className="detail-page"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <div>Location not found</div>
          <button
            className="submit-btn"
            style={{ marginTop: 12 }}
            onClick={() => navigate(-1)}
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Resolver — unchanged
  const heroImg =
    location.heroImage ||
    location.images?.[0] ||
    CATEGORY_FALLBACKS[location.category] ||
    CATEGORY_FALLBACKS.nature; // ultimate fallback

  const cat = catMap[location.category] || {
    icon: "📍",
    label: location.category,
  };
  const stars = (r) =>
    "★".repeat(Math.round(r || 0)) + "☆".repeat(5 - Math.round(r || 0));

  return (
    <div className="detail-page">
      {/* Hero Header */}
      <div className="detail-hero" style={{ "--hero-img": `url(${heroImg})` }}>
        {/* ── Image + Overlay Layers ── */}
        <div className="hero-bg-image" />
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />
        <div className="hero-overlay-color" />
        <div className="hero-gold-rule" />

        {/* ── Back Button (positioned absolute via CSS) ── */}
        <button className="detail-back" onClick={() => navigate(-1)}>
          ← {t.showOnMap || "Back to Map"}
        </button>

        {/* ── All Content ── */}
        <div className="hero-content">
          {/* Category chip */}
          <div className="hero-category-chip">
            <span className="hero-category-chip-icon">{cat.icon}</span>
            {cat.label}
          </div>

          {/* Title + subtitle (no more flex wrapper needed) */}
          <div className="detail-title">
            {location.displayName || location.name?.en}
          </div>
          <div className="detail-subtitle">
            {cat.label} · {location.subcategory}
          </div>

          {/* Meta: rating, city, fee */}
          <div className="detail-meta-row">
            <span className="detail-rating">
              {stars(location.rating)} {location.rating?.toFixed(1)}
            </span>
            <span className="detail-city">
              📍 {location.city}, {location.district}
            </span>
            {location.entryFee && (
              <span className="badge badge-glass">🎟 {location.entryFee}</span>
            )}
          </div>

          {/* Badges */}
          <div className="detail-badges">
            {location.isVerified && (
              <span className="badge badge-green">
                ✅ {t.verified || "Verified"}
              </span>
            )}
            {location.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="badge badge-glass">
                {tag}
              </span>
            ))}
          </div>

          {/* Authenticity */}
          <div className="authenticity-bar">
            <span className="auth-label">Authenticity</span>
            <div className="auth-track">
              <div
                className="auth-fill"
                style={{ width: `${location.authenticityScore || 0}%` }}
              />
            </div>
            <span className="auth-score">{location.authenticityScore}/100</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {t.tabs?.[tab.id] || tab.id}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="detail-body">
        {activeTab === "overview" && (
          <div className="animate-fade">
            <p className="description-text">
              {location.displayDescription || location.description?.en}
            </p>

            <div className="info-grid" style={{ marginTop: 16 }}>
              {location.openingHours && (
                <div className="info-item">
                  <div className="info-label">
                    {t.openingHours || "Opening Hours"}
                  </div>
                  <div className="info-value">{location.openingHours}</div>
                </div>
              )}
              {location.bestTimeToVisit && (
                <div className="info-item">
                  <div className="info-label">
                    {t.bestTimeToVisit || "Best Time"}
                  </div>
                  <div className="info-value">{location.bestTimeToVisit}</div>
                </div>
              )}
              {location.entryFee && (
                <div className="info-item">
                  <div className="info-label">{t.entryFee || "Entry Fee"}</div>
                  <div className="info-value">{location.entryFee}</div>
                </div>
              )}
              {location.contactInfo && (
                <div className="info-item">
                  <div className="info-label">{t.contact || "Contact"}</div>
                  <div className="info-value">{location.contactInfo}</div>
                </div>
              )}
            </div>

            <ActionButtons location={location} />
          </div>
        )}

        {activeTab === "nearby" && <NearbyTab locationId={id} />}

        {activeTab === "reviews" && (
          <ReviewsTab reviews={reviews} locationId={id} onRefresh={load} />
        )}

        {activeTab === "locals" && (
          <LocalGuidesTab
            guides={
              location.localGuides?.length ? location.localGuides : guides
            }
          />
        )}

        {activeTab === "gallery" && (
          <GalleryTab
            images={location.images}
            name={location.displayName || location.name?.en}
          />
        )}

        {activeTab === "travelTips" && (
          <div className="animate-fade">
            <div className="section-title">
              🧭 {t.tabs?.travelTips || "Travel Tips"}
            </div>
            <p className="description-text">
              {location.displayTravelTips ||
                location.travelTips?.en ||
                "Travel tips coming soon."}
            </p>
          </div>
        )}

        {activeTab === "culturalStory" && (
          <div className="animate-fade">
            <div className="section-title">
              📜 {t.tabs?.culturalStory || "Cultural Story"}
            </div>
            <p className="cultural-text">
              {location.displayCulturalStory ||
                location.culturalStory?.en ||
                "Cultural story coming soon."}
            </p>
          </div>
        )}

        {activeTab === "foodNearby" && (
          <NearbyTab locationId={id} defaultCategory="food" />
        )}
      </div>
    </div>
  );
}