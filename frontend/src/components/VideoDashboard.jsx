import React, { useEffect, useState, useCallback } from 'react';
import { getVideos, deleteVideo, updateVideo } from '../services/videoService';
import VideoPlayer from './VideoPlayer';
import toast from 'react-hot-toast';

const CATEGORIES = ['Nature', 'Culture', 'Food', 'Travel', 'Events', 'Sports', 'Education', 'Other'];

function EditModal({ video, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: video.title || '',
    description: video.description || '',
    category: video.category || '',
    tags: (video.tags || []).join(', '),
    place_name: video.place_name || '',
    latitude: video.latitude || '',
    longitude: video.longitude || '',
  });
  const [saving, setSaving] = useState(false);

  const handleField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    try {
      setSaving(true);
      await updateVideo(video._id, form);
      toast.success('Video updated!');
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="vu-modal-backdrop" onClick={onClose}>
      <div className="vu-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vu-modal-header">
          <span className="vu-modal-title">✏️ Edit Video</span>
          <button className="vu-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="vu-modal-body">
          <form onSubmit={handleSave} noValidate>
            <div className="vu-form-group">
              <label className="vu-label">Title *</label>
              <input className="vu-input" name="title" value={form.title} onChange={handleField} maxLength={100} />
            </div>
            <div className="vu-form-group">
              <label className="vu-label">Category</label>
              <select className="vu-select" name="category" value={form.category} onChange={handleField}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="vu-form-group">
              <label className="vu-label">Description</label>
              <textarea className="vu-input" name="description" value={form.description} onChange={handleField}
                rows={3} style={{ resize: 'vertical' }} />
            </div>
            <div className="vu-form-group">
              <label className="vu-label">Tags (comma separated)</label>
              <input className="vu-input" name="tags" value={form.tags} onChange={handleField} />
            </div>
            <div className="vu-form-group">
              <label className="vu-label">Place Name</label>
              <input className="vu-input" name="place_name" value={form.place_name} onChange={handleField} />
            </div>
            <div className="vu-form-row">
              <div className="vu-form-group">
                <label className="vu-label">Latitude</label>
                <input className="vu-input" name="latitude" type="number" step="any" value={form.latitude} onChange={handleField} />
              </div>
              <div className="vu-form-group">
                <label className="vu-label">Longitude</label>
                <input className="vu-input" name="longitude" type="number" step="any" value={form.longitude} onChange={handleField} />
              </div>
            </div>
          </form>
        </div>
        <div className="vu-modal-footer">
          <button className="vu-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="vu-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : '💾 Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayerModal({ video, onClose }) {
  return (
    <div className="vu-modal-backdrop" onClick={onClose}>
      <div className="vu-modal" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="vu-modal-header">
          <span className="vu-modal-title">{video.title}</span>
          <button className="vu-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="vu-modal-body" style={{ padding: '1rem' }}>
          <VideoPlayer url={video.video_url} thumbnail={video.thumbnail_url} title={video.title} />
          {video.description && (
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoDashboard({ userId }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editVideo, setEditVideo] = useState(null);
  const [playVideo, setPlayVideo] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getVideos({ uploader_id: userId, status: 'all' });
      setVideos(res.data);
    } catch {
      toast.error('Failed to load your videos.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video? This action cannot be undone.')) return;
    try {
      setDeletingId(id);
      await deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      toast.success('Video deleted.');
    } catch {
      toast.error('Failed to delete video.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = filterStatus === 'all' ? videos : videos.filter((v) => v.status === filterStatus);
  const counts = {
    all:      videos.length,
    pending:  videos.filter((v) => v.status === 'pending').length,
    approved: videos.filter((v) => v.status === 'approved').length,
    rejected: videos.filter((v) => v.status === 'rejected').length,
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return <div className="vu-spinner-wrap"><div className="vu-spinner" /></div>;

  return (
    <div>
      {/* Stats bar */}
      <div className="vu-stats-bar">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <div key={s} className={`vu-stat-card${filterStatus === s ? ' vu-stat-active' : ''}`}
            onClick={() => setFilterStatus(s)}>
            <div className="vu-stat-value">{counts[s]}</div>
            <div className="vu-stat-label" style={{ textTransform: 'capitalize' }}>{s}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="vu-empty-state">
          <div className="vu-empty-icon">📭</div>
          <div className="vu-empty-title">No videos found</div>
          <div className="vu-empty-text">Upload your first video to get started.</div>
        </div>
      ) : (
        <div className="vu-video-grid">
          {filtered.map((video) => (
            <div key={video._id} className="vu-video-card">
              <div className="vu-video-thumb" onClick={() => setPlayVideo(video)}>
                {video.thumbnail_url
                  ? <img src={video.thumbnail_url} alt={video.title} />
                  : <div className="vu-thumb-placeholder">🎬</div>
                }
                <div className="vu-play-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
              </div>
              <div className="vu-video-body">
                <div className="vu-video-header">
                  <div className="vu-video-title" title={video.title}>{video.title}</div>
                  <span className={`vu-badge vu-badge-${video.status}`}>{video.status}</span>
                </div>
                <div className="vu-video-meta">
                  <span>📁 {video.category}</span>
                  {video.place_name && <span>📍 {video.place_name}</span>}
                  <span>📅 {formatDate(video.upload_time)}</span>
                  <span>👁 {video.views ?? 0} views</span>
                </div>
                {video.tags?.length > 0 && (
                  <div className="vu-tag-list">
                    {video.tags.map((t) => <span key={t} className="vu-tag">#{t}</span>)}
                  </div>
                )}
                <div className="vu-video-actions">
                  <button className="vu-btn-ghost vu-btn-sm" onClick={() => setPlayVideo(video)}>▶ Play</button>
                  <button className="vu-btn-primary vu-btn-sm" onClick={() => setEditVideo(video)}>✏️ Edit</button>
                  <button className="vu-btn-danger vu-btn-sm" onClick={() => handleDelete(video._id)}
                    disabled={deletingId === video._id}>
                    {deletingId === video._id ? '…' : '🗑 Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editVideo && (
        <EditModal video={editVideo} onClose={() => setEditVideo(null)}
          onSaved={() => { setEditVideo(null); fetchVideos(); }} />
      )}
      {playVideo && <PlayerModal video={playVideo} onClose={() => setPlayVideo(null)} />}
    </div>
  );
}
