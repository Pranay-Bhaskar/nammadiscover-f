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
                    background: radial-gradient(circle at top right, rgba(255,107,53,0.25), transparent 40%),
                                rgba(0,0,0,0.55);
                    z-index: -1;
                }

                .glass {
                    background: rgba(255,255,255,0.06);
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255,255,255,0.12);
                    box-shadow: 
                        0 20px 60px rgba(0,0,0,0.6),
                        inset 0 0 40px rgba(255,255,255,0.03);
                    border-radius: 24px;
                    animation: fadeIn 0.6s ease;
                }

                .input {
                    width: 100%;
                    padding: 0.9rem 1rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    outline: none;
                    transition: all 0.25s ease;
                    font-size: 0.95rem;
                }

                .input::placeholder {
                    color: rgba(255,255,255,0.5);
                }

                .input:focus {
                    border-color: #ff6b35;
                    background: rgba(255,255,255,0.08);
                    box-shadow: 0 0 0 2px rgba(255,107,53,0.25);
                }

                .btn {
                    width: 100%;
                    padding: 0.95rem;
                    border-radius: 50px;
                    border: none;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 12px 30px rgba(255,107,53,0.5);
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 18px 40px rgba(255,107,53,0.6);
                }

                .google-btn {
                    width: 100%;
                    padding: 0.85rem;
                    border-radius: 50px;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.06);
                    color: #ccc;
                    font-weight: 600;
                    cursor: not-allowed;
                    margin-bottom: 1rem;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 1rem 0;
                    color: #aaa;
                    font-size: 0.8rem;
                }

                .divider::before,
                .divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                .info {
                    background: rgba(255,107,53,0.1);
                    padding: 10px;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    color: #ddd;
                    font-size: 0.8rem;
                }

                .switch {
                    text-align: center;
                    margin-top: 1.2rem;
                    color: #bbb;
                    font-size: 0.9rem;
                }

                .switch button {
                    background: none;
                    border: none;
                    color: #ff6b35;
                    cursor: pointer;
                    font-weight: 600;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
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

                    <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>
                        <h1 style={{
                            fontSize: '2.3rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #ff6b35, #ff3e6c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            NammaDiscover
                        </h1>
                        <p style={{ opacity: 0.8 }}>
                            {isLogin ? 'Sign in to continue your journey' : 'Create your account'}
                        </p>
                    </div>

                    <div className="glass" style={{ padding: '2.2rem' }}>

                        {/* Google Button */}
                        <button className="google-btn">
                            Continue with Google (Coming Soon)
                        </button>

                        <div className="divider">OR</div>

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
                                style={{ marginTop: '1rem' }}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ marginTop: '1rem' }}
                            />

                            {!isLogin && (
                                <select
                                    name="role"
                                    className="input"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={{ marginTop: '1rem' }}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            )}

                            {isLogin && <div className="info">🛡 Admin auto-detected</div>}

                            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
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
