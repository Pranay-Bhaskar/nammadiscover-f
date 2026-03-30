import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, Video, MapPin, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { api } = useAuth();
    const [stats, setStats] = useState(null);
    const [pendingVideos, setPendingVideos] = useState([]);
    const [pendingApps, setPendingApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, videosRes, appsRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/videos?status=pending'),          // ← fixed endpoint
                    api.get('/explorers/applications?status=pending')
                ]);
                setStats(statsRes.data);
                setPendingVideos(videosRes.data);
                setPendingApps(appsRes.data);
            } catch (err) {
                toast.error('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [api]);

    const handleVideoModerate = async (id, action) => {
        try {
            await api.post(`/moderate/${id}`, { action });   // ← fixed endpoint
            setPendingVideos(prev => prev.filter(v => v._id !== id));
            toast.success(`Video ${action}d`);
        } catch (err) {
            toast.error('Failed to moderate video');
        }
    };

    const handleAppModerate = async (id, action) => {
        try {
            await api.put(`/explorers/${id}/review`, { action });
            setPendingApps(prev => prev.filter(a => a._id !== id));
            toast.success(`Application ${action}d`);
        } catch (err) {
            toast.error('Failed to review application');
        }
    };


    if (loading) return <div className="spinner-wrap" style={{ marginTop: '100px' }}><div className="spinner"></div></div>;

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Platform overview and moderation queues.</p>

            {/* KPI Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="card glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Users size={32} color="var(--primary)" />
                    <div><h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.users.total}</h3><p style={{ margin: 0, color: 'var(--text-muted)' }}>Total Users</p></div>
                </div>
                <div className="card glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <MapPin size={32} color="var(--rose)" />
                    <div><h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.locations.total}</h3><p style={{ margin: 0, color: 'var(--text-muted)' }}>Locations</p></div>
                </div>
                <div className="card glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Video size={32} color="var(--gold)" />
                    <div><h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.videos.approved}</h3><p style={{ margin: 0, color: 'var(--text-muted)' }}>Approved Videos</p></div>
                </div>
                <div className="card glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '2rem' }}>👁️</div>
                    <div><h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.totalViews}</h3><p style={{ margin: 0, color: 'var(--text-muted)' }}>Video Views</p></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Video Queue */}
                <div className="card glass-panel" style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-2)', paddingBottom: '12px', marginBottom: '16px' }}>
                        Video Moderation Queue ({pendingVideos.length})
                    </h2>
                    {pendingVideos.length === 0 ? <p>No videos pending review.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {pendingVideos.map(video => (
                                <div key={video._id} style={{ border: '1px solid var(--border-3)', borderRadius: 'var(--radius-sm)', padding: '16px', background: 'var(--bg-2)' }}>
                                    <h4>{video.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>By: {video.uploader_id?.username} | Category: {video.category}</p>
                                    <video src={video.video_url} controls style={{ width: '100%', borderRadius: '8px', marginTop: '12px', maxHeight: '200px', background: '#000' }} />
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                        <button onClick={() => handleVideoModerate(video._id, 'approve')} className="btn-primary" style={{ flex: 1, padding: '6px' }}><CheckCircle size={16} /> Approve</button>
                                        <button onClick={() => handleVideoModerate(video._id, 'reject')} className="btn-secondary" style={{ flex: 1, padding: '6px', color: 'var(--rose)', borderColor: 'var(--rose)' }}><XCircle size={16} /> Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Explorer Queue */}
                <div className="card glass-panel" style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-2)', paddingBottom: '12px', marginBottom: '16px' }}>
                        Explorer Applications ({pendingApps.length})
                    </h2>
                    {pendingApps.length === 0 ? <p>No applications pending review.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {pendingApps.map(app => (
                                <div key={app._id} style={{ border: '1px solid var(--border-3)', borderRadius: 'var(--radius-sm)', padding: '16px', background: 'var(--bg-2)' }}>
                                    <h4>{app.user?.username} ({app.user?.email})</h4>
                                    <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', fontSize: '0.9rem', marginTop: '8px', borderLeft: '3px solid var(--primary)' }}>
                                        <strong>Reason:</strong> {app.reason}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                        <button onClick={() => handleAppModerate(app._id, 'approve')} className="btn-primary" style={{ flex: 1, padding: '6px' }}><CheckCircle size={16} /> Approve</button>
                                        <button onClick={() => handleAppModerate(app._id, 'reject')} className="btn-secondary" style={{ flex: 1, padding: '6px', color: 'var(--rose)', borderColor: 'var(--rose)' }}><XCircle size={16} /> Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
