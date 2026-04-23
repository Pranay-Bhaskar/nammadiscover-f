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

                /* Dark overlay to provide contrast for white text while keeping bg visible */
                .page-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
                    z-index: 0;
                }

                .glass-shell {
                    width: 100%;
                    max-width: 440px;
                    position: relative;
                    z-index: 1;
                    /* Ultra-transparent base */
                    background: rgba(255, 255, 255, 0.01);
                    /* Heavy blur to create the premium frosted effect */
                    backdrop-filter: blur(30px) saturate(180%);
                    -webkit-backdrop-filter: blur(30px) saturate(180%);
                    border-radius: 40px;
                    /* Specular edge highlight */
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow: 
                        0 40px 100px rgba(0, 0, 0, 0.5),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                }

                .card-body {
                    padding: 4rem 3rem;
                }

                .heading-wrap {
                    text-align: center;
                    margin-bottom: 35px;
                }

                .brand-title {
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, #ffffff 0%, #ff6b35 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -2px;
                }

                .heading-wrap p {
                    color: rgba(255, 255, 255, 0.7);
                    margin: 12px 0 0 0;
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
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.9rem;
                    font-weight: 600;
                    position: relative;
                    cursor: not-allowed;
                    backdrop-filter: blur(5px);
                }

                .coming-soon-tag {
                    position: absolute;
                    right: 15px;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    font-size: 0.6rem;
                    padding: 4px 10px;
                    border-radius: 30px;
                    font-weight: 800;
                    text-transform: uppercase;
                    box-shadow: 0 4px 10px rgba(255, 107, 53, 0.3);
                }

                .divider {
                    display: flex;
                    align-items: center;
                    margin: 25px 0;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                }

                .divider::before, .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
                }

                .form-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                    padding: 18px 24px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                }

                .input::placeholder { color: rgba(255, 255, 255, 0.3); }

                .input:focus {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 107, 53, 0.6);
                    outline: none;
                    box-shadow: 0 0 25px rgba(255, 107, 53, 0.15);
                    transform: scale(1.02);
                }

                .btn {
                    background: #fff;
                    color: #000;
                    border: none;
                    border-radius: 20px;
                    padding: 18px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                }

                .btn:hover {
                    background: #ff6b35;
                    color: #fff;
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
                }

                .btn:active { transform: translateY(0); }

                .info {
                    font-size: 0.8rem;
                    color: #ff6b35;
                    text-align: center;
                    font-weight: 600;
                    padding: 10px;
                    background: rgba(255, 107, 53, 0.1);
                    border-radius: 12px;
                }

                .switch {
                    text-align: center;
                    margin-top: 35px;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.95rem;
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #fff;
                    font-weight: 800;
                    cursor: pointer;
                    margin-left: 8px;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                    transition: 0.3s;
                }

                .switch button:hover {
                    color: #ff6b35;
                    text-decoration-color: #ff6b35;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(0,0,0,0.1);
                    border-top-color: currentColor;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .role-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 20px center;
                    background-size: 15px;
                }

                @media (max-width: 480px) {
                    .card-body { padding: 3rem 1.5rem; }
                    .brand-title { font-size: 2.3rem; }
                }
            `}</style>

            <div className="glass-shell">
                <div className="card-body">
                    <div className="heading-wrap">
                        <h1 className="brand-title">NammaDiscover</h1>
                        <p>{isLogin ? 'Sign in to access your dashboard' : 'Join the community of explorers'}</p>
                    </div>

                    <div className="social-grid">
                        <button type="button" className="social-btn" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.94s3.95-8.94 8.79-8.94c2.75 0 4.59 1.17 5.64 2.18l2.59-2.5c-1.66-1.55-3.82-2.5-8.23-2.5C5.38 1.18 0 6.56 0 13.18s5.38 12 12 12c6.91 0 11.51-4.86 11.51-11.71 0-.79-.08-1.39-.19-1.99l-10.84.44z"/>
                            </svg>
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                            <span className="coming-soon-tag">Soon</span>
                        </button>
                    </div>

                    <div className="divider">SECURE EMAIL ACCESS</div>

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
                                <option value="admin" style={{background: '#1a1a1a'}}>Guide Access</option>
                            </select>
                        )}

                        {isLogin && <div className="info">✨ Auto-verifying credentials</div>}

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? <div className="spinner"></div> : (isLogin ? 'Sign In →' : 'Create Account →')}
                        </button>
                    </form>

                    <div className="switch">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
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
