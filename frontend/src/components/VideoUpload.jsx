import React, { useRef, useState } from 'react';
import { uploadVideo } from '../services/videoService';
import toast from 'react-hot-toast';

const CATEGORIES = ['Nature', 'Culture', 'Food', 'Travel', 'Events', 'Sports', 'Education', 'Other'];

export default function VideoUpload({ onUploadSuccess }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    place_name: '',
    latitude: '',
    longitude: '',
  });

  const handleField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileSelect = (selected) => {
    if (!selected) return;
    if (selected.size > 500 * 1024 * 1024) {
      toast.error('File exceeds 500 MB limit.');
      return;
    }
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file)              { toast.error('Please select a video file.'); return; }
    if (!form.title.trim()) { toast.error('Title is required.');          return; }
    if (!form.category)     { toast.error('Category is required.');       return; }

    const formData = new FormData();
    formData.append('video', file);
    Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v); });

    try {
      setUploading(true);
      setProgress(0);
      await uploadVideo(formData, setProgress);
      toast.success('Video uploaded! It will appear after admin approval.');
      setFile(null);
      setProgress(0);
      setForm({ title: '', description: '', category: '', tags: '', place_name: '', latitude: '', longitude: '' });
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="vu-card">
      <h2 className="vu-card-title">📤 Upload a Video</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Drop zone */}
        <div className="vu-form-group">
          <label className="vu-label">Video File *</label>
          <div
            className={`vu-upload-area${dragging ? ' vu-drag-over' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/x-matroska"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
            <div className="vu-upload-icon">🎥</div>
            <div className="vu-upload-label">
              {file ? file.name : 'Click or drag & drop a video here'}
            </div>
            <div className="vu-upload-hint">MP4, MOV, AVI, WebM, MKV · Max 500 MB</div>
            {file && <div className="vu-upload-fileinfo">{file.name} ({formatBytes(file.size)})</div>}
          </div>
        </div>

        {/* Progress */}
        {uploading && (
          <div className="vu-form-group">
            <label className="vu-label">Uploading… {progress}%</label>
            <div className="vu-progress-wrap">
              <div className="vu-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Title & Category */}
        <div className="vu-form-row">
          <div className="vu-form-group">
            <label htmlFor="vu-title" className="vu-label">Title *</label>
            <input id="vu-title" className="vu-input" name="title" value={form.title} onChange={handleField}
              placeholder="e.g. Cubbon Park Evening Walk" maxLength={100} />
          </div>
          <div className="vu-form-group">
            <label htmlFor="vu-category" className="vu-label">Category *</label>
            <select id="vu-category" className="vu-select" name="category" value={form.category} onChange={handleField}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="vu-form-group">
          <label htmlFor="vu-description" className="vu-label">Description</label>
          <textarea id="vu-description" className="vu-input" name="description" value={form.description}
            onChange={handleField} rows={3} placeholder="Tell us about this video…" maxLength={500}
            style={{ resize: 'vertical' }} />
          <div className="vu-hint">{form.description.length}/500</div>
        </div>

        {/* Tags */}
        <div className="vu-form-group">
          <label htmlFor="vu-tags" className="vu-label">Tags</label>
          <input id="vu-tags" className="vu-input" name="tags" value={form.tags} onChange={handleField}
            placeholder="bangalore, park, nature (comma separated)" />
          <div className="vu-hint">Separate tags with commas</div>
        </div>

        {/* Location */}
        <div className="vu-form-group">
          <label htmlFor="vu-place_name" className="vu-label">Place Name</label>
          <input id="vu-place_name" className="vu-input" name="place_name" value={form.place_name}
            onChange={handleField} placeholder="e.g. Cubbon Park, Bangalore" />
        </div>
        <div className="vu-form-row">
          <div className="vu-form-group">
            <label htmlFor="vu-latitude" className="vu-label">Latitude</label>
            <input id="vu-latitude" className="vu-input" name="latitude" type="number" step="any"
              value={form.latitude} onChange={handleField} placeholder="12.9716" />
          </div>
          <div className="vu-form-group">
            <label htmlFor="vu-longitude" className="vu-label">Longitude</label>
            <input id="vu-longitude" className="vu-input" name="longitude" type="number" step="any"
              value={form.longitude} onChange={handleField} placeholder="77.5946" />
          </div>
        </div>

        <button type="submit" className="vu-btn-primary" disabled={uploading} style={{ width: '100%' }}>
          {uploading ? `Uploading ${progress}%…` : '🚀 Upload Video'}
        </button>
      </form>
    </div>
  );
}
