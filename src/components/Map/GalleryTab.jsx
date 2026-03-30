export default function GalleryTab({ images, name }) {
  const placeholderEmojis = ['🌄','🏛','🌿','🛕','🍛','🏔','💧','🌸','🎭','🗺'];

  if (!images || images.length === 0) {
    return (
      <div className="gallery-grid">
        {placeholderEmojis.map((emoji, i) => (
          <div key={i} className="gallery-placeholder">
            {emoji}
          </div>
        ))}
        <div style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', padding: '8px' }}>
          📸 Photos coming soon. Be the first to share!
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${name} ${i + 1}`}
          className="gallery-img"
          loading="lazy"
          onClick={() => window.open(img, '_blank')}
        />
      ))}
    </div>
  );
}
