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
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: url("${bgImage}") center/cover no-repeat fixed;
                    position: relative;
                    perspective: 1000px;
                    overflow: hidden;
                    padding: 20px;
                }

                .page-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 0;
                }

                /* 3D Container */
                .card-3d-wrap {
                    position: relative;
                    width: 440px;
                    max-width: 100%;
                    height: 550px;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                    z-index: 1;
                }

                .card-3d-wrapper {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform-style: preserve-3d;
                    transition: all 800ms cubic-bezier(0.645, 0.045, 0.355, 1);
                }

                /* The flip logic based on isLogin state */
                .flipped {
                    transform: rotateY(180deg);
                }

                .card-front, .card-back {
                    width: 100%;
                    height: 100%;
                    /* FULL TRANSPARENT GLASS */
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                    position: absolute;
                    border-radius: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    padding: 40px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .card-back {
                    transform: rotateY(180deg);
                }

                /* Header Controls */
                .toggle-header {
                    text-align: center;
                    margin-bottom: 30px;
                    z-index: 10;
                }

                .toggle-header span {
                    padding: 0 15px;
                    text-transform: uppercase;
                    font-weight: 800;
                    font-size: 14px;
                    letter-spacing: 1px;
                    color: rgba(255, 255, 255, 0.4);
                    transition: 0.3s;
                }

                .toggle-header span.active {
                    color: #fff;
                    text-shadow: 0 0 10px rgba(255,107,53,0.5);
                }

                /* Switch Toggle Styling */
                .switch-box {
                    width: 60px;
                    height: 20px;
                    background: rgba(255, 107, 53, 0.3);
                    border-radius: 20px;
                    margin: 15px auto;
                    position: relative;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .switch-box::after {
                    content: '→';
                    position: absolute;
                    width: 34px;
                    height: 34px;
                    background: #ff6b35;
                    border-radius: 50%;
                    top: -8px;
                    left: -5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 10px rgba(255, 107, 53, 0.5);
                }

                .is-signup-ui .switch-box::after {
                    transform: translateX(36px) rotate(180deg);
                    background: #ff3e6c;
                }

                /* Form Elements */
                .brand-title {
                    font-size: 2rem;
                    font-weight: 800;
                    margin: 0 0 10px 0;
                    background: linear-gradient(135deg, #fff, #ff6b35);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-align: center;
                }

                .form-group {
                    margin-bottom: 15px;
                    position: relative;
                }

                .input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 15px 20px;
                    color: white;
                    outline: none;
                    transition: 0.3s;
                }

                .input:focus {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #ff6b35;
                }

                .btn {
                    width: 100%;
                    padding: 16px;
                    border-radius: 15px;
                    border: none;
                    background: #fff;
                    color: #000;
                    font-weight: 800;
                    text-transform: uppercase;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: 0.3s;
                }

                .btn:hover {
                    background: #ff6b35;
                    color: #fff;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
                }

                .social-btn {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 12px;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 20px;
                    cursor: not-allowed;
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .coming-soon {
                    font-size: 0.6rem;
                    background: rgba(255, 107, 53, 0.2);
                    padding: 2px 8px;
                    border-radius: 10px;
                    color: #ff6b35;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 0.7rem;
                    margin: 15px 0;
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
                        <h4 className="brand-title">Login</h4>
                        
                        <button className="social-btn" disabled>
                            Google <span className="coming-soon">Coming Soon</span>
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
                        <h4 className="brand-title">Register</h4>
                        
                        <button className="social-btn" disabled>
                            Google <span className="coming-soon">Coming Soon</span>
                        </button>

                        <div className="divider">OR</div>

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
                                    <option value="user" style={{background: '#222'}}>User Access</option>
                                    <option value="admin" style={{background: '#222'}}>Admin Access</option>
                                </select>
                            </div>
                            <button type="submit" className="btn">
                                {loading ? <div className="spinner"></div> : 'Sign Up →'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
