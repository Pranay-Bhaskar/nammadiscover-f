const TIER_ICONS = { Bronze: '🥉', Silver: '🥈', Gold: '🥇' };
const AVATARS = ['👨‍🌾','👩‍🌾','🧑‍🌿','👨‍💼','👩‍💼','🧑‍🎓','👨‍🎨','👩‍🎨'];

export default function LocalGuidesTab({ guides }) {
  if (!guides || guides.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <div>No local guides listed yet.</div>
      </div>
    );
  }

  return (
    <div>
      {guides.map((guide, idx) => (
        <div key={guide._id || idx} className="guide-card animate-fade">
          <span className="guide-avatar">{AVATARS[idx % AVATARS.length]}</span>
          <div style={{ flex: 1 }}>
            <div className="guide-name">{guide.name}</div>
            <div className="guide-tier">{TIER_ICONS[guide.tier]} {guide.tier} Explorer · {guide.specialty?.join(', ')}</div>
            <div className="guide-rating">★ {guide.rating?.toFixed(1)} · {guide.contributions} Contributions</div>
            {guide.bio && <div className="guide-specialty">{guide.bio.slice(0, 80)}...</div>}
            <div className="guide-actions">
              {guide.contact?.whatsapp && (
                <button className="guide-btn"
                  onClick={() => window.open(`https://wa.me/${guide.contact.whatsapp.replace(/\D/g,'')}`, '_blank')}>
                  💬 Chat
                </button>
              )}
              {guide.contact?.phone && (
                <button className="guide-btn" onClick={() => window.open(`tel:${guide.contact.phone}`, '_self')}>
                  📞 Call
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
