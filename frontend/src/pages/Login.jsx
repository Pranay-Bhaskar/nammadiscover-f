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
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

                .page-wrap {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: url("${bgImage}") center/cover no-repeat fixed;
                    position: relative;
                    overflow: hidden;
                }

                /* Animated background blobs */
                .page-wrap::before, .page-wrap::after {
                    content: "";
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 62, 108, 0.3));
                    filter: blur(80px);
                    z-index: 0;
                    animation: float 20s infinite alternate;
                }
                .page-wrap::before { top: -100px; left: -100px; }
                .page-wrap::after { bottom: -100px; right: -100px; animation-delay: -10s; }

                @keyframes float {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 100px); }
                }

                .glass-shell {
                    width: 100%;
                    max-width: 450px;
                    background: rgba(15, 15, 15, 0.7);
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
                    position: relative;
                    z-index: 1;
                    transition: transform 0.3s ease;
                }

                .card-body {
                    padding: 3rem 2.5rem;
                }

                .heading-wrap {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .brand-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, #ff8c5f, #ff3e6c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -1.5px;
                }

                .heading-wrap p {
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 8px;
                    font-size: 0.95rem;
                }

                .form-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 1.1rem;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .input:focus {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: #ff6b35;
                    outline: none;
                    box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.15);
                    transform: translateY(-1px);
                }

                .btn {
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    border: none;
                    border-radius: 16px;
                    padding: 1.1rem;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 20px rgba(255, 62, 108, 0.2);
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(255, 62, 108, 0.4);
                    filter: brightness(1.1);
                }

                .btn:active { transform: translateY(0); }

                .social-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .social-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 0.8rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-weight: 600;
                    cursor: not-allowed;
                    transition: 0.3s;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    margin: 20px 0;
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                }

                .divider::before, .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                }
                .divider:not(:empty)::before { margin-right: 15px; }
                .divider:not(:empty)::after { margin-left: 15px; }

                .info {
                    font-size: 0.85rem;
                    color: #ff8c5f;
                    background: rgba(255, 107, 53, 0.1);
                    padding: 10px 15px;
                    border-radius: 12px;
                    border-left: 3px solid #ff6b35;
                }

                .switch {
                    text-align: center;
                    margin-top: 2rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    padding-left: 5px;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                    transition: 0.3s;
                }

                .switch button:hover {
                    color: #ff6b35;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 0.8s ease-in-out infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .role-select {
                    cursor: pointer;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1.2em;
                    padding-right: 2.5rem;
                    appearance: none;
                }
            `}</style>

            <div className="glass-shell">
                <div className="card-body">
                    <div className="heading-wrap">
                        <h1 className="brand-title">NammaDiscover</h1>
                        <p>{isLogin ? 'Welcome back! Please enter your details.' : 'Join us to start your journey.'}</p>
                    </div>

                    <div className="social-grid">
                        <button type="button" className="social-btn" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#fff" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.94s3.95-8.94 8.79-8.94c2.75 0 4.59 1.17 5.64 2.18l2.59-2.5c-1.66-1.55-3.82-2.5-8.23-2.5C5.38 1.18 0 6.56 0 13.18s5.38 12 12 12c6.91 0 11.51-4.86 11.51-11.71 0-.79-.08-1.39-.19-1.99l-10.84.44z"/>
                            </svg>
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                        </button>
                    </div>

                    <div className="divider">OR</div>

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
                                <option value="user">Explorer (User)</option>
                                <option value="admin">Guide (Admin)</option>
                            </select>
                        )}

                        {isLogin && (
                            <div className="info">
                                <span>✨ Smart detection enabled</span>
                            </div>
                        )}

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? <div className="spinner"></div> : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div className="switch">
                        {isLogin ? "New here?" : "Joined us before?"}
                        <button type="button" onClick={() => setIsLogin(v => !v)}>
                            {isLogin ? 'Create an account' : 'Login to account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
