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
        <>
            <style>{`
                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background: url("${bgImage}") center/cover no-repeat fixed;
                }

                body::before {
                    content: "";
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.45);
                    z-index: -1;
                }

                /* 🔥 TRUE GLASS EFFECT */
                .glass {
                    background: rgba(255,255,255,0.04);
                    backdrop-filter: blur(35px);
                    -webkit-backdrop-filter: blur(35px);
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 22px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
                }

                .input {
                    width: 100%;
                    padding: 0.9rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.05);
                    color: white;
                    outline: none;
                    margin-top: 1rem;
                }

                .input::placeholder {
                    color: rgba(255,255,255,0.6);
                }

                .input:focus {
                    border-color: #ff6b35;
                    box-shadow: 0 0 0 2px rgba(255,107,53,0.3);
                }

                .btn {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 50px;
                    border: none;
                    margin-top: 1rem;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .btn:hover {
                    transform: translateY(-2px);
                }

                /* 🔥 SOCIAL BUTTONS */
                .social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 0.85rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.06);
                    color: #eee;
                    font-weight: 600;
                    cursor: not-allowed;
                    transition: 0.25s;
                }

                .social-btn img {
                    width: 18px;
                }

                .social-btn:hover {
                    background: rgba(255,255,255,0.1);
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 1.2rem 0;
                    color: #aaa;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                }

                .divider::before,
                .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                .switch {
                    text-align: center;
                    margin-top: 1.2rem;
                    color: #bbb;
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #ff6b35;
                    cursor: pointer;
                    font-weight: 600;
                }

                .spinner {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #ffffff40;
                    border-top-color: #fff;
                    border-radius: 50%;
                    display: inline-block;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>

                    {/* 🔥 YOUR HEADER UNTOUCHED */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>
                        <h1 style={{
                            fontSize: '2.2rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #ff6b35, #ff3e6c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            NammaDiscover
                        </h1>
                        <p>{isLogin ? 'Sign in to continue your journey' : 'Create your account'}</p>
                    </div>

                    {/* 🔥 REDESIGNED BOX */}
                    <div className="glass" style={{ padding: '2.2rem' }}>

                        {/* Social Login */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="social-btn">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"/>
                                Continue with Google
                            </button>

                            <button className="social-btn">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/>
                                Continue with GitHub
                            </button>
                        </div>

                        <div className="divider">OR CONTINUE WITH EMAIL</div>

                        <form onSubmit={handleSubmit}>

                            {!isLogin && (
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="input"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            )}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {!isLogin && (
                                <select
                                    name="role"
                                    className="input"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            )}

                            <button type="submit" className="btn">
                                {loading
                                    ? <span className="spinner"></span>
                                    : (isLogin ? 'Sign In →' : 'Create Account →')}
                            </button>
                        </form>

                        <div className="switch">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => setIsLogin(v => !v)}>
                                {isLogin ? ' Sign up' : ' Sign in'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
