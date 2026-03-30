import React, { useEffect, useState } from 'react';
import { getModerationQueue, moderateVideo } from '../services/videoService';
import VideoPlayer from './VideoPlayer';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function PreviewModal({ video, onClose }) {
  return (
    <div className="vu-modal-backdrop" onClick={onClose}>
      <div className="vu-modal" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="vu-modal-header">
          <span className="vu-modal-title">👁 Preview: {video.title}</span>
          <button className="vu-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="vu-modal-body" style={{ padding: '1rem' }}>
          <VideoPlayer url={video.video_url} thumbnail={video.thumbnail_url} title={video.title} />
          <table className="vu-meta-table">
            <tbody>
              {[
                ['Category', video.category],
                ['Place', video.place_name],
                ['Tags', (video.tags || []).join(', ')],
                ['Description', video.description],
                ['Uploaded', new Date(video.upload_time).toLocaleString('en-IN')],
              ].map(([k, v]) =>
                v ? (
                  <tr key={k}>
                    <td className="vu-meta-key">{k}</td>
                    <td className="vu-meta-val">{v}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ModerationQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});
  const [actioning, setActioning] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const loadQueue = async () => {
    try {
      setLoading(true);
      const res = await getModerationQueue();
      setQueue(res.data);
    } catch {
      toast.error('Failed to load moderation queue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQueue(); }, []);

  const handleModerate = async (id, action) => {
    try {
      setActioning(id + action);
      await moderateVideo(id, action, notes[id] || '');
      setQueue((prev) => prev.filter((v) => v._id !== id));
      toast.success(`✅ Video ${action}d successfully.`);
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to ${action} video.`);
    } finally {
      setActioning(null);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  if (loading) return <div className="vu-spinner-wrap"><div className="vu-spinner" /></div>;

  return (
    <div>
      <div className="vu-page-header">
        <div>
          <div className="vu-page-title">🛡 Moderation Queue</div>
          <div className="vu-page-subtitle">
            {queue.length} video{queue.length !== 1 ? 's' : ''} awaiting review
          </div>
        </div>
        <button className="vu-btn-ghost vu-btn-sm" onClick={loadQueue}>🔄 Refresh</button>
      </div>

      {queue.length === 0 ? (
        <div className="vu-empty-state">
          <div className="vu-empty-icon">🎉</div>
          <div className="vu-empty-title">Queue is clear!</div>
          <div className="vu-empty-text">All videos have been reviewed. Check back later.</div>
        </div>
      ) : (
        <div className="vu-card">
          {queue.map((video, idx) => (
            <div key={video._id} className="vu-mod-item"
              style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
              {/* Thumbnail */}
              <div className="vu-mod-thumb-wrap">
                <img className="vu-mod-thumb"
                  src={video.thumbnail_url || 'https://placehold.co/120x68?text=No+Thumb'}
                  alt={video.title} />
                <button className="vu-mod-play-btn" onClick={() => setPreviewVideo(video)}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="vu-mod-info">
                <div className="vu-mod-title">{video.title}</div>
                <div className="vu-mod-meta">
                  📁 {video.category}
                  {video.place_name && <> · 📍 {video.place_name}</>}
                  {' · '}📅 {formatDate(video.upload_time)}
                  {video.tags?.length > 0 && <> · 🏷 {video.tags.join(', ')}</>}
                </div>
                {video.description && (
                  <p className="vu-mod-desc">{video.description}</p>
                )}
                <button className="vu-btn-ghost vu-btn-sm" style={{ marginBottom: '0.5rem' }}
                  onClick={() => setPreviewVideo(video)}>
                  👁 Preview
                </button>
                <input className="vu-input vu-mod-note" type="text"
                  placeholder="Optional moderation note (e.g. reason for rejection)"
                  value={notes[video._id] || ''}
                  onChange={(e) => setNotes({ ...notes, [video._id]: e.target.value })} />
                <div className="vu-mod-actions">
                  <button className="vu-btn-success vu-btn-sm"
                    onClick={() => handleModerate(video._id, 'approve')}
                    disabled={actioning === video._id + 'approve'}>
                    {actioning === video._id + 'approve' ? '…' : '✅ Approve'}
                  </button>
                  <button className="vu-btn-danger vu-btn-sm"
                    onClick={() => handleModerate(video._id, 'reject')}
                    disabled={actioning === video._id + 'reject'}>
                    {actioning === video._id + 'reject' ? '…' : '❌ Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewVideo && <PreviewModal video={previewVideo} onClose={() => setPreviewVideo(null)} />}
    </div>
  );
}
