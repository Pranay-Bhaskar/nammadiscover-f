import React, { useRef, useState } from 'react';

/**
 * VideoPlayer
 * Props:
 *   url        {string}  - video URL (Cloudinary or local)
 *   thumbnail  {string}  - thumbnail image URL
 *   title      {string}  - optional title displayed below
 */
export default function VideoPlayer({ url, thumbnail, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => setError(true));
      }
    }, 50);
  };

  if (!url) {
    return (
      <div className="vu-player-wrapper" style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
        No video source provided.
      </div>
    );
  }

  return (
    <div>
      <div className="vu-player-wrapper">
        <video
          ref={videoRef}
          src={url}
          controls
          playsInline
          preload="metadata"
          style={{ display: playing ? 'block' : 'none' }}
          onError={() => setError(true)}
        />
        {!playing && (
          <div className="vu-player-overlay" onClick={handlePlay} role="button" aria-label="Play video">
            {thumbnail && <img src={thumbnail} alt={title || 'Video thumbnail'} />}
            <div className="vu-player-play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}
        {error && (
          <div style={{ padding: '1.5rem', color: '#dc2626', textAlign: 'center', background: '#fff' }}>
            ⚠️ Failed to load video. Please try again.
          </div>
        )}
      </div>
      {title && <p className="vu-player-title">{title}</p>}
    </div>
  );
}
