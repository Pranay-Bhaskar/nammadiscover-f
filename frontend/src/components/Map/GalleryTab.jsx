import { useState } from "react";

export default function GalleryTab({ images, name }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const placeholderEmojis = ['🌄','🏛','🌿','🛕','🍛','🏔','💧','🌸','🎭','🗺'];

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/fallback.jpg";
  };

  const uniqueImages = Array.isArray(images)
    ? [...new Set(images)]
    : [];

  return (
    <>
      {/* ✅ Inline CSS */}
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
      `}</style>

      {!uniqueImages || uniqueImages.length === 0 ? (
        <div className="gallery-grid">
          {placeholderEmojis.map((emoji, i) => (
            <div key={i} className="gallery-placeholder">
              {emoji}
            </div>
          ))}

          <div
            style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              padding: '8px'
            }}
          >
            📸 Photos coming soon. Be the first to share!
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
