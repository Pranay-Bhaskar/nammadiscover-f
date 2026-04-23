import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import bgImage from '../assets/background.jpeg';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let userData;
            if (isLogin) {
                userData = await login(formData.email, formData.password);
                toast.success('Welcome back to NammaDiscover!');
            } else {
                userData = await register(formData.username, formData.email, formData.password, formData.role);
                toast.success('Account created successfully!');
            }

            const role = userData?.role;
            if (role === 'admin') navigate('/admin');
            else navigate('/dashboard');

        } catch (err) {
            toast.error(err.response?.data?.error || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrap">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

                .page-wrap {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: url("${bgImage}") center/cover no-repeat fixed;
                    position: relative;
                }

                /* Dark overlay to make the glass pop */
                .page-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 0;
                }

                .glass-shell {
                    width: 100%;
                    max-width: 440px;
                    position: relative;
                    z-index: 1;
                    background: rgba(255, 255, 255, 0.03); /* Extremely low opacity for true glass feel */
                    backdrop-filter: blur(40px) saturate(150%) brightness(100%);
                    -webkit-backdrop-filter: blur(40px) saturate(150%) brightness(100%);
                    border-radius: 40px;
                    /* Specular highlight border */
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 
                        0 25px 50px -12px rgba(0, 0, 0, 0.5),
                        inset 0 0 80px rgba(255, 255, 255, 0.02);
                    overflow: hidden;
                }

                .card-body {
                    padding: 3.5rem 3rem;
                }

                .brand-title {
                    font-size: 2.8rem;
                    font-weight: 800;
                    text-align: center;
                    margin: 0;
                    background: linear-gradient(to right, #ffffff, #ff6b35);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -2px;
                }

                .heading-wrap p {
                    color: rgba(255, 255, 255, 0.5);
                    text-align: center;
                    margin: 10px 0 35px 0;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .social-grid {
                    margin-bottom: 25px;
                }

                .social-btn {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.95rem;
                    font-weight: 600;
                    position: relative;
                    cursor: not-allowed;
                }

                .coming-soon-tag {
                    position: absolute;
                    right: 12px;
                    background: rgba(255, 107, 53, 0.15);
                    color: #ff6b35;
                    font-size: 0.65rem;
                    padding: 4px 10px;
                    border-radius: 30px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid rgba(255, 107, 53, 0.2);
                }

                .divider {
                    display: flex;
                    align-items: center;
                    margin: 25px 0;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                }

                .divider::before, .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                }
                .divider:not(:empty)::before { margin-right: 15px; }
                .divider:not(:empty)::after { margin-left: 15px; }

                .form-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .input {
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 18px;
                    padding: 16px 20px;
                    color: #fff;
                    font-size: 0.95rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .input::placeholder { color: rgba(255, 255, 255, 0.3); }

                .input:focus {
                    background: rgba(0, 0, 0, 0.3);
                    border-color: #ff6b35;
                    outline: none;
                    box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
                }

                .btn {
                    background: #fff;
                    color: #000;
                    border: none;
                    border-radius: 18px;
                    padding: 16px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn:hover {
                    background: #ff6b35;
                    color: #fff;
                    transform: translateY(-2px);
                }

                .info {
                    font-size: 0.8rem;
                    color: #ff6b35;
                    text-align: center;
                    font-weight: 600;
                    opacity: 0.8;
                }

                .switch {
                    text-align: center;
                    margin-top: 30px;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.9rem;
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    margin-left: 6px;
                    transition: 0.2s;
                }

                .switch button:hover {
                    color: #ff6b35;
                }

                .spinner {
                    width: 22px;
                    height: 22px;
                    border: 3px solid rgba(0,0,0,0.1);
                    border-top-color: currentColor;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .role-select {
                    appearance: none;
                    cursor: pointer;
                }

                @media (max-width: 480px) {
                    .card-body { padding: 2.5rem 1.8rem; }
                    .brand-title { font-size: 2.2rem; }
                }
            `}</style>

            <div className="glass-shell">
                <div className="card-body">
                    <div className="heading-wrap">
                        <h1 className="brand-title">NammaDiscover</h1>
                        <p>{isLogin ? 'Sign in to your private portal' : 'Start your journey with us'}</p>
                    </div>

                    <div className="social-grid">
                        <button type="button" className="social-btn" disabled>
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                            <span className="coming-soon-tag">Soon</span>
                        </button>
                    </div>

                    <div className="divider">OR USE EMAIL</div>

                    <form onSubmit={handleSubmit} className="form-stack">
                        {!isLogin && (
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {!isLogin && (
                            <select
                                name="role"
                                className="input role-select"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user" style={{background: '#1a1a1a'}}>Explorer Access</option>
                                <option value="admin" style={{background: '#1a1a1a'}}>Admin Access</option>
                            </select>
                        )}

                        {isLogin && <div className="info">Protected by NammaDiscover Guard</div>}

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? <div className="spinner"></div> : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div className="switch">
                        {isLogin ? "Need an account?" : "Have an account already?"}
                        <button type="button" onClick={() => setIsLogin(v => !v)}>
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
