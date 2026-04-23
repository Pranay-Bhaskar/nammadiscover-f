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
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');

                .page-wrap {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: url("${bgImage}") center/cover no-repeat fixed;
                    position: relative;
                    perspective: 1500px;
                    overflow: hidden;
                    padding: 20px;
                }

                /* Reduced overlay to let the background image shine through */
                .page-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.2);
                    z-index: 0;
                }

                .brand-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    z-index: 2;
                }

                .brand-title {
                    font-size: 3rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, #ffffff, #ff6b35);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -2px;
                }

                /* Header Controls */
                .toggle-header {
                    text-align: center;
                    margin-bottom: 25px;
                    z-index: 10;
                }

                .toggle-header span {
                    padding: 0 15px;
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: 1.5px;
                    color: rgba(255, 255, 255, 0.4);
                    transition: 0.3s;
                }

                .toggle-header span.active {
                    color: #fff;
                }

                /* Switch Toggle Styling */
                .switch-box {
                    width: 54px;
                    height: 14px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    margin: 15px auto;
                    position: relative;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .switch-box::after {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: #fff;
                    border-radius: 50%;
                    top: -9px;
                    left: -5px;
                    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }

                .is-signup-ui .switch-box::after {
                    transform: translateX(34px);
                    background: #ff6b35;
                }

                /* 3D Container */
                .card-3d-wrap {
                    position: relative;
                    width: 420px;
                    max-width: 100%;
                    height: 520px;
                    transform-style: preserve-3d;
                    z-index: 1;
                }

                .card-3d-wrapper {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                    transition: all 800ms cubic-bezier(0.645, 0.045, 0.355, 1);
                }

                .flipped {
                    transform: rotateY(180deg);
                }

                /* ULTRA TRANSPARENT GLASS */
                .card-front, .card-back {
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.01); /* Almost zero background */
                    backdrop-filter: blur(5px) saturate(120%);
                    -webkit-backdrop-filter: blur(15px) saturate(120%);
                    position: absolute;
                    border-radius: 40px;
                    /* Sharp specular border makes it look like glass */
                    border: 1.5px solid rgba(255, 255, 255, 0.3);
                    backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    padding: 40px;
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
                }

                .card-back {
                    transform: rotateY(180deg);
                }

                .form-group {
                    margin-bottom: 18px;
                    position: relative;
                }

                .input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 18px;
                    padding: 16px 20px;
                    color: white;
                    outline: none;
                    transition: 0.3s;
                    font-size: 0.95rem;
                }

                .input:focus {
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                .btn {
                    width: 100%;
                    padding: 16px;
                    border-radius: 18px;
                    border: none;
                    background: #fff;
                    color: #000;
                    font-weight: 800;
                    text-transform: uppercase;
                    cursor: pointer;
                    margin-top: 15px;
                    transition: 0.3s;
                    letter-spacing: 1px;
                }

                .btn:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
                }

                .social-btn {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 18px;
                    padding: 12px;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 25px;
                    cursor: not-allowed;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .coming-soon {
                    font-size: 0.65rem;
                    background: #ff6b35;
                    padding: 3px 10px;
                    border-radius: 20px;
                    color: #fff;
                    text-transform: uppercase;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 0.7rem;
                    margin: 10px 0 20px 0;
                    letter-spacing: 2px;
                }
                .divider::before, .divider::after {
                    content: ""; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.1);
                }
                .divider:not(:empty)::before { margin-right: 15px; }
                .divider:not(:empty)::after { margin-left: 15px; }

                .spinner {
                    width: 20px; height: 20px; border: 3px solid rgba(0,0,0,0.1);
                    border-top-color: currentColor; border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="brand-header">
                <h1 className="brand-title">NammaDiscover</h1>
            </div>

            <div className={`toggle-header ${!isLogin ? 'is-signup-ui' : ''}`}>
                <h6 className="mb-0">
                    <span className={isLogin ? 'active' : ''}>Log In</span>
                    <span className={!isLogin ? 'active' : ''}>Sign Up</span>
                </h6>
                <div className="switch-box" onClick={() => setIsLogin(!isLogin)}></div>
            </div>

            <div className="card-3d-wrap">
                <div className={`card-3d-wrapper ${!isLogin ? 'flipped' : ''}`}>
                    
                    {/* FRONT CARD (LOGIN) */}
                    <div className="card-front">
                        <button className="social-btn" disabled>
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#fff" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.94s3.95-8.94 8.79-8.94c2.75 0 4.59 1.17 5.64 2.18l2.59-2.5c-1.66-1.55-3.82-2.5-8.23-2.5C5.38 1.18 0 6.56 0 13.18s5.38 12 12 12c6.91 0 11.51-4.86 11.51-11.71 0-.79-.08-1.39-.19-1.99l-10.84.44z"/>
                            </svg>
                            Sign in with Google <span className="coming-soon">Soon</span>
                        </button>
                        
                        <div className="divider">OR</div>

                        <form onSubmit={handleSubmit} className="form-stack">
                            <div className="form-group">
                                <input 
                                    type="email" name="email" className="input" 
                                    placeholder="Your Email" value={formData.email} 
                                    onChange={handleChange} required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" name="password" className="input" 
                                    placeholder="Your Password" value={formData.password} 
                                    onChange={handleChange} required 
                                />
                            </div>
                            <button type="submit" className="btn">
                                {loading ? <div className="spinner"></div> : 'Submit →'}
                            </button>
                        </form>
                    </div>

                    {/* BACK CARD (REGISTER) */}
                    <div className="card-back">
                        <button className="social-btn" disabled>
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#fff" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.94s3.95-8.94 8.79-8.94c2.75 0 4.59 1.17 5.64 2.18l2.59-2.5c-1.66-1.55-3.82-2.5-8.23-2.5C5.38 1.18 0 6.56 0 13.18s5.38 12 12 12c6.91 0 11.51-4.86 11.51-11.71 0-.79-.08-1.39-.19-1.99l-10.84.44z"/>
                            </svg>
                            Sign up with Google <span className="coming-soon">Soon</span>
                        </button>

                        <form onSubmit={handleSubmit} className="form-stack">
                            <div className="form-group">
                                <input 
                                    type="text" name="username" className="input" 
                                    placeholder="Full Name" value={formData.username} 
                                    onChange={handleChange} required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" name="email" className="input" 
                                    placeholder="Email Address" value={formData.email} 
                                    onChange={handleChange} required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" name="password" className="input" 
                                    placeholder="Password" value={formData.password} 
                                    onChange={handleChange} required 
                                />
                            </div>
                            <div className="form-group">
                                <select 
                                    name="role" className="input" 
                                    value={formData.role} onChange={handleChange}
                                >
                                    <option value="user" style={{background: '#111'}}>Explorer</option>
                                    <option value="admin" style={{background: '#111'}}>Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn">
                                {loading ? <div className="spinner"></div> : 'Register →'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
