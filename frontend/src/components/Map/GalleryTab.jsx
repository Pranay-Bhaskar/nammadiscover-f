import { useState, useEffect } from "react";

export default function GalleryTab({ images, name, placeName }) {
  console.log("GalleryTab RENDERED");
  console.log("Props:", { images, name, placeName });

  const [selectedImg, setSelectedImg] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const placeholderEmojis = ["🌄", "🏛", "🌿", "🛕", "🍛", "🏔", "💧", "🌸", "🎭", "🗺"];

  const API_BASE = "https://namma-discover.onrender.com";

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/fallback.jpg";
  };

  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, "").trim();

  const toHttps = (url = "") =>
    String(url).replace(/^http:\/\//i, "https://");

  const buildMediaUrl = (url = "") => {
    if (!url) return "";
    return url.startsWith("http") ? toHttps(url) : `${API_BASE}${url}`;
  };

  const uniqueImages = Array.isArray(images)
    ? [...new Set(images)]
    : [];

  useEffect(() => {
    console.log("useEffect TRIGGERED:", placeName);

    if (!placeName) {
      console.warn("placeName is missing ❌");
      return;
    }

    setLoadingVideos(true);

    fetch(`${API_BASE}/api/videos?search=${encodeURIComponent(placeName)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        console.log("UI PLACE:", placeName);

        const filtered = Array.isArray(data)
          ? data.filter(
              (vid) =>
                vid.place_name &&
                normalize(vid.place_name).includes(normalize(placeName))
            )
          : [];

        console.log("FILTERED VIDEOS:", filtered);

        setVideos(filtered);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setVideos([]);
      })
      .finally(() => setLoadingVideos(false));
  }, [placeName]);

  const hasContent =
    uniqueImages.length > 0 || (Array.isArray(videos) && videos.length > 0);

  return (
    <>
      <style>{`
        .gallery-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          cursor: pointer;
        }

        .gallery-modal img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 12px;
        }

        .gallery-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          border-radius: 8px;
          background: #000;
        }

        .gallery-loader {
          grid-column: 1/-1;
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding: 10px;
        }
      `}</style>

      {!hasContent && !loadingVideos ? (
        <div className="gallery-grid">
          {placeholderEmojis.map((emoji, i) => (
            <div key={i} className="gallery-placeholder">
              {emoji}
            </div>
          ))}

          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              padding: "8px",
            }}
          >
            📸 Photos & videos coming soon. Be the first to share!
          </div>
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {uniqueImages.map((img, i) => (
              <img
                key={img || i}
                src={img}
                alt={`${name} ${i + 1}`}
                className="gallery-img"
                loading="lazy"
                decoding="async"
                onError={handleError}
                onClick={() => setSelectedImg(img)}
              />
            ))}

            {Array.isArray(videos) &&
              videos.map((vid) => {
                const videoSrc = buildMediaUrl(vid.video_url);
                const posterSrc = buildMediaUrl(vid.thumbnail_url);

                return (
                  <video
                    key={vid._id}
                    className="gallery-video"
                    controls
                    preload="metadata"
                    poster={posterSrc}
                    onError={(e) => {
                      console.warn("Video failed:", videoSrc);
                      e.target.style.display = "none";
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              })}

            {loadingVideos && (
              <div className="gallery-loader">
                🎬 Loading videos...
              </div>
            )}
          </div>

          {selectedImg && (
            <div
              className="gallery-modal"
              onClick={() => setSelectedImg(null)}
            >
              <img
                src={selectedImg}
                alt="preview"
                onError={handleError}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
