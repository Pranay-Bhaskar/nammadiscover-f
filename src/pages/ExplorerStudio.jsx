import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, Video as VideoIcon, Play, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ExplorerStudio = () => {
    const { api } = useAuth();
    const [activeTab, setActiveTab] = useState('upload'); // upload | my-videos
    const [myVideos, setMyVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Upload state
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', category: 'nature', place_name: '' });

    const fetchMyVideos = async () => {
        try {
            const { data } = await api.get('/videos/my');
            setMyVideos(data);
        } catch (err) {
            toast.error('Failed to load your videos');
        }
    };

    useEffect(() => {
        if (activeTab === 'my-videos') fetchMyVideos();
    }, [activeTab]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return toast.error('Please select a video file');
        setLoading(true);

        const data = new FormData();
        data.append('video', file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('place_name', formData.place_name);

        try {
            await api.post('/videos/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Video uploaded successfully! Pending review.');
            setFile(null);
            setFormData({ title: '', description: '', category: 'nature', place_name: '' });
            setActiveTab('my-videos');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        try {
            await api.delete(`/videos/${id}`);
            setMyVideos(prev => prev.filter(v => v._id !== id));
            toast.success('Video deleted');
        } catch (err) {
            toast.error('Failed to delete video');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '800px' }}>
            <h1 className="page-title">Creator Studio</h1>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-2)' }}>
                <button
                    onClick={() => setActiveTab('upload')}
                    style={{ padding: '12px 24px', background: 'transparent', color: activeTab === 'upload' ? 'var(--gold)' : 'var(--text-muted)', borderBottom: activeTab === 'upload' ? '3px solid var(--gold)' : '3px solid transparent', fontSize: '1.1rem', fontWeight: 600 }}
                >
                    <Upload size={18} style={{ marginRight: '8px', verticalAlign: '-3px' }} /> Upload Video
                </button>
                <button
                    onClick={() => setActiveTab('my-videos')}
                    style={{ padding: '12px 24px', background: 'transparent', color: activeTab === 'my-videos' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'my-videos' ? '3px solid var(--primary)' : '3px solid transparent', fontSize: '1.1rem', fontWeight: 600 }}
                >
                    <VideoIcon size={18} style={{ marginRight: '8px', verticalAlign: '-3px' }} /> My Videos
                </button>
            </div>

            {activeTab === 'upload' ? (
                <div className="card glass-panel" style={{ padding: '32px' }}>
                    <form onSubmit={handleUpload}>
                        <div className="form-group" style={{ textAlign: 'center', padding: '40px', border: '2px dashed var(--border-3)', borderRadius: 'var(--radius)', background: 'var(--bg-2)', marginBottom: '24px' }}>
                            <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} id="video-upload" />
                            <label htmlFor="video-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Upload size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
                                    {file ? file.name : 'Click or Drag to Upload Video'}
                                </span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Max 500MB (MP4, MOV, WEBM)</span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Video Title</label>
                            <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Hidden Waterfall in Coorg" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="nature">Nature</option>
                                    <option value="heritage">Heritage</option>
                                    <option value="food">Local Food</option>
                                    <option value="temple">Temple</option>
                                    <option value="hidden_gem">Hidden Gem</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Location/City Name</label>
                                <input type="text" className="form-control" value={formData.place_name} onChange={e => setFormData({ ...formData, place_name: e.target.value })} placeholder="e.g. Madikeri" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Tell us about this place..."></textarea>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1.1rem', background: 'var(--gradient-btn-sec)' }} disabled={loading}>
                            {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span> : 'Publish Video'}
                        </button>
                    </form>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {myVideos.length === 0 ? <p className="text-center" style={{ marginTop: '40px' }}>You haven't uploaded any videos yet.</p> : null}
                    {myVideos.map(video => (
                        <div key={video._id} className="card glass-panel" style={{ display: 'flex', gap: '16px', padding: '16px', alignItems: 'center' }}>
                            <div style={{ width: '160px', height: '90px', background: '#000', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                                {video.thumbnail_url ? (
                                    <img src={video.thumbnail_url} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><Play color="white" /></div>
                                )}
                                <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>
                                    {video.status}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{video.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{video.place_name} • {new Date(video.upload_time).toLocaleDateString()}</p>
                                <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>
                                    Views: {video.views} | Category: {video.category}
                                </div>
                            </div>
                            <button className="btn-secondary" style={{ color: 'var(--rose)', borderColor: 'var(--rose)' }} onClick={() => handleDelete(video._id)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExplorerStudio;
