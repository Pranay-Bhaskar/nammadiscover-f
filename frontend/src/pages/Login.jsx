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
                    overflow-x: hidden;
                }

                body::before {
                    content: "";
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(circle at top left, rgba(255, 107, 53, 0.20), transparent 28%),
                        radial-gradient(circle at bottom right, rgba(255, 62, 108, 0.18), transparent 30%),
                        rgba(0, 0, 0, 0.35);
                    z-index: -1;
                }

                .glass-shell {
                    width: 100%;
                    max-width: 470px;
                    border-radius: 28px;
                    background: rgba(255, 255, 255, 0.035);
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    box-shadow:
                        0 24px 80px rgba(0, 0, 0, 0.45),
                        inset 0 1px 0 rgba(255, 255, 255, 0.10),
                        inset 0 0 40px rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(26px) saturate(145%);
                    -webkit-backdrop-filter: blur(26px) saturate(145%);
                    position: relative;
                    overflow: hidden;
                }

                .glass-shell::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.10),
                        rgba(255, 255, 255, 0.02) 35%,
                        rgba(255, 255, 255, 0.00) 70%
                    );
                    pointer-events: none;
                }

                .glass-shell::after {
                    content: "";
                    position: absolute;
                    inset: 1px;
                    border-radius: 27px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    pointer-events: none;
                }

                .input {
                    width: 100%;
                    padding: 0.95rem 1rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    background: rgba(255, 255, 255, 0.04);
                    color: #fff;
                    outline: none;
                    transition: all 0.25s ease;
                    font-size: 0.95rem;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
                }

                .input::placeholder {
                    color: rgba(255, 255, 255, 0.55);
                }

                .input:focus {
                    border-color: rgba(255, 107, 53, 0.7);
                    background: rgba(255, 255, 255, 0.07);
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.14);
                }

                .btn {
                    width: 100%;
                    padding: 0.95rem 1rem;
                    border-radius: 999px;
                    border: none;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 14px 30px rgba(255, 107, 53, 0.28);
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 18px 36px rgba(255, 107, 53, 0.36);
                }

                .btn:active {
                    transform: translateY(0px);
                }

                .social-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 10px;
                }

                .social-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 0.85rem 1rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    background: rgba(255, 255, 255, 0.045);
                    color: rgba(255, 255, 255, 0.82);
                    font-weight: 600;
                    font-size: 0.92rem;
                    cursor: not-allowed;
                    opacity: 0.95;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .social-btn:hover {
                    background: rgba(255, 255, 255, 0.065);
                }

                .social-btn svg,
                .social-btn img {
                    width: 18px;
                    height: 18px;
                    flex: 0 0 18px;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 1.1rem 0;
                    color: rgba(255, 255, 255, 0.72);
                    font-size: 0.74rem;
                    letter-spacing: 1.7px;
                    text-transform: uppercase;
                }

                .divider::before,
                .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.18),
                        transparent
                    );
                }

                .info {
                    background: rgba(255, 107, 53, 0.09);
                    border: 1px solid rgba(255, 107, 53, 0.18);
                    padding: 10px 12px;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    color: rgba(255, 255, 255, 0.86);
                    font-size: 0.82rem;
                }

                .switch {
                    text-align: center;
                    margin-top: 1.2rem;
                    color: rgba(255, 255, 255, 0.75);
                    font-size: 0.92rem;
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #ff6b35;
                    cursor: pointer;
                    font-weight: 700;
                    padding: 0;
                }

                .switch button:hover {
                    text-decoration: underline;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .spinner {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255, 255, 255, 0.35);
                    border-top-color: #fff;
                    border-radius: 50%;
                    display: inline-block;
                    animation: spin 0.6s linear infinite;
                }

                .page-wrap {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }

                .heading-wrap {
                    text-align: center;
                    margin-bottom: 1.6rem;
                    color: #fff;
                    animation: fadeIn 0.6s ease;
                }

                .brand-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin: 0 0 0.4rem 0;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    WebkitBackgroundClip: text;
                    WebkitTextFillColor: transparent;
                    background-clip: text;
                    color: transparent;
                    letter-spacing: -0.8px;
                }

                .heading-wrap p {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.95rem;
                }

                .card-body {
                    position: relative;
                    z-index: 1;
                    padding: 2.1rem;
                }

                .form-stack > * + * {
                    margin-top: 1rem;
                }

                .role-select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background-image:
                        linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.75) 50%),
                        linear-gradient(135deg, rgba(255,255,255,0.75) 50%, transparent 50%);
                    background-position:
                        calc(100% - 18px) calc(1.05rem + 2px),
                        calc(100% - 12px) calc(1.05rem + 2px);
                    background-size: 6px 6px, 6px 6px;
                    background-repeat: no-repeat;
                    padding-right: 2.5rem;
                }

                @media (max-width: 480px) {
                    .page-wrap {
                        padding: 0.75rem;
                    }

                    .glass-shell {
                        border-radius: 22px;
                    }

                    .card-body {
                        padding: 1.5rem;
                    }

                    .brand-title {
                        font-size: 1.95rem;
                    }
                }
            `}</style>

            <div className="page-wrap">
                <div style={{ width: '100%', maxWidth: '470px' }}>
                    <div className="heading-wrap">
                        <h1 className="brand-title">NammaDiscover</h1>
                        <p>{isLogin ? 'Sign in to continue your journey' : 'Create your account'}</p>
                    </div>

                    <div className="glass-shell">
                        <div className="card-body">
                            <div className="social-grid">
                                <button type="button" className="social-btn" disabled aria-disabled="true">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-5.9-2.8-5.9-6.2S8.7 5.8 12 5.8c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.2 14.6 2.3 12 2.3 6.5 2.3 2 6.7 2 12.2S6.5 22 12 22c6.1 0 10.1-4.3 10.1-10.3 0-.7-.1-1.2-.2-1.7H12z" />
                                    </svg>
                                    Sign in with Google
                                </button>

                                <button type="button" className="social-btn" disabled aria-disabled="true">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-5.9-2.8-5.9-6.2S8.7 5.8 12 5.8c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.2 14.6 2.3 12 2.3 6.5 2.3 2 6.7 2 12.2S6.5 22 12 22c6.1 0 10.1-4.3 10.1-10.3 0-.7-.1-1.2-.2-1.7H12z" />
                                    </svg>
                                    Sign up with Google
                                </button>
                            </div>

                            <div className="divider">OR CONTINUE WITH EMAIL</div>

                            <form onSubmit={handleSubmit} className="form-stack">
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
                                        className="input role-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                )}

                                {isLogin && <div className="info">🛡 Admin auto-detected</div>}

                                <button type="submit" className="btn">
                                    {loading ? <span className="spinner"></span> : (isLogin ? 'Sign In →' : 'Create Account →')}
                                </button>
                            </form>

                            <div className="switch">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button type="button" onClick={() => setIsLogin(v => !v)}>
                                    {isLogin ? ' Sign up' : ' Sign in'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
