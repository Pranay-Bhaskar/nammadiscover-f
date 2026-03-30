import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ExplorerLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', reason: '' });
    const [loading, setLoading] = useState(false);
    const { login, register, api } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                const data = await login(formData.email, formData.password);
                if (data.role === 'explorer' || data.role === 'admin') {
                    toast.success('Welcome back, Explorer!');
                    navigate('/dashboard');
                } else {
                    toast.error('You do not have Explorer privileges yet.');
                    navigate('/dashboard');
                }
            } else {
                // Register as user, then apply for explorer
                const data = await register(formData.username, formData.email, formData.password);
                await api.post('/explorers/apply', { reason: formData.reason, experience: 'Applied at signup' });
                toast.success('Explorer Application Submitted! Pending Admin Approval.');
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.error || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '120px', maxWidth: '450px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--gold)' }}>
                <h1 className="page-title" style={{ fontSize: '1.8rem', textAlign: 'center' }}>
                    {isLogin ? 'Explorer Portal Login' : 'Become an Explorer'}
                </h1>
                <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: '24px', fontSize: '0.95rem' }}>
                    {isLogin ? 'Sign in to access your Creator Studio' : 'Apply to share the hidden gems of Karnataka with the world.'}
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Creator Name</label>
                            <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required={!isLogin} />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>Why do you want to be an Explorer?</label>
                            <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange} required={!isLogin} placeholder="Share your passion for Karnataka..."></textarea>
                        </div>
                    )}

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px', background: 'var(--gradient-btn-sec)' }} disabled={loading}>
                        {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span> : (isLogin ? 'Login to Studio' : 'Submit Application')}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {isLogin ? "Want to apply? " : "Already an Explorer? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'transparent', color: 'var(--gold)', fontWeight: 600 }}>
                        {isLogin ? 'Apply Now' : 'Login Here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ExplorerLogin;
