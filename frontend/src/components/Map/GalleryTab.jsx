import { useState, useEffect } from "react";

export default function GalleryTab({ images, name, placeName }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const placeholderEmojis = ["🌄", "🏛", "🌿", "🛕", "🍛", "🏔", "💧", "🌸", "🎭", "🗺"];
  const API_BASE = "https://namma-discover.onrender.com";

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/fallback.jpg";
  };

  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const uniqueImages = Array.isArray(images) ? [...new Set(images.filter(Boolean))] : [];

  useEffect(() => {
    if (!placeName || !placeName.trim()) {
      setVideos([]);
      return;
    }

    const controller = new AbortController();
    setLoadingVideos(true);

    fetch(`${API_BASE}/api/videos?search=${encodeURIComponent(placeName)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch videos: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filtered = Array.isArray(data)
          ? data.filter((vid) => {
              if (!vid?.place_name || !vid?.video_url) return false;
              return normalize(vid.place_name) === normalize(placeName);
            })
          : [];

        setVideos(filtered);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Video fetch error:", err);
          setVideos([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingVideos(false);
      });

    return () => controller.abort();
  }, [placeName]);

  const hasContent = uniqueImages.length > 0 || videos.length > 0;

  return (
    <>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 10px;
          background: #111;
        }

        .gallery-img,
        .gallery-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: pointer;
          border-radius: 10px;
        }

        .gallery-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          font-size: 1.8rem;
          background: rgba(255,255,255,0.04);
        }

        .gallery-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          font-size: 0.72rem;
          padding: 4px 7px;
          border-radius: 999px;
          pointer-events: none;
        }

        .gallery-loader {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          padding: 10px;
        }

        .gallery-empty {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-muted);
          padding: 8px;
        }

        .gallery-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }

        .gallery-modal-inner {
          max-width: 92vw;
          max-height: 92vh;
        }

        .gallery-modal img,
        .gallery-modal video {
          max-width: 92vw;
          max-height: 92vh;
          border-radius: 12px;
          display: block;
        }

        .gallery-close {
          position: absolute;
          top: 18px;
          right: 18px;
          border: none;
          background: rgba(255,255,255,0.14);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 1.2rem;
        }
      `}</style>

      {!hasContent && !loadingVideos ? (
        <div className="gallery-grid">
          {placeholderEmojis.map((emoji, i) => (
            <div key={i} className="gallery-placeholder">
              {emoji}
            </div>
          ))}
          <div className="gallery-empty">
            📸 Photos & videos coming soon. Be the first to share!
          </div>
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {uniqueImages.map((img, i) => (
              <div key={img || i} className="gallery-item">
                <img
                  src={img}
                  alt={`${name} ${i + 1}`}
                  className="gallery-img"
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  onClick={() => setSelectedMedia({ type: "image", src: img })}
                />
                <span className="gallery-badge">📸</span>
              </div>
            ))}

            {Array.isArray(videos) &&
              videos.map((vid) => {
                const videoSrc = vid.video_url?.startsWith("http")
                  ? vid.video_url
                  : `${API_BASE}${vid.video_url}`;

                return (
                  <div key={vid._id} className="gallery-item">
                    <video
                      className="gallery-video"
                      poster={vid.thumbnail_url || ""}
                      preload="metadata"
                      muted
                      playsInline
                      onClick={() =>
                        setSelectedMedia({
                          type: "video",
                          src: videoSrc,
                          poster: vid.thumbnail_url || "",
                          title: vid.title || "Video preview",
                        })
                      }
                      onError={(e) => {
                        console.warn("Video failed:", videoSrc);
                        e.currentTarget.parentElement.style.display = "none";
                      }}
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <span className="gallery-badge">🎥</span>
                  </div>
                );
              })}

            {loadingVideos && (
              <div className="gallery-loader">🎬 Loading videos...</div>
            )}
          </div>

          {selectedMedia && (
            <div className="gallery-modal" onClick={() => setSelectedMedia(null)}>
              <button
                type="button"
                className="gallery-close"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close preview"
              >
                ×
              </button>

              <div
                className="gallery-modal-inner"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.src}
                    alt="Preview"
                    onError={handleImageError}
                  />
                ) : (
                  <video
                    src={selectedMedia.src}
                    poster={selectedMedia.poster}
                    controls
                    autoPlay
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}