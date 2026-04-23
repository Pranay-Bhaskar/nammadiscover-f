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
                    background: rgba(0,0,0,0.6);
                    z-index: -1;
                }

                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }

                .toggle {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #fff;
                }

                .toggle span {
                    margin: 0 15px;
                    cursor: pointer;
                    font-weight: 600;
                    opacity: 0.6;
                }

                .toggle .active {
                    opacity: 1;
                    color: #ff6b35;
                }

                .card-3d {
                    width: 380px;
                    height: 460px;
                    perspective: 1000px;
                }

                .inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                }

                .flip {
                    transform: rotateY(180deg);
                }

                .face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    backdrop-filter: blur(30px);
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.15);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
                    padding: 2rem;
                    backface-visibility: hidden;
                }

                .back {
                    transform: rotateY(180deg);
                }

                h2 {
                    color: #fff;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .input {
                    width: 100%;
                    padding: 0.9rem;
                    margin-top: 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.05);
                    color: white;
                }

                .input:focus {
                    outline: none;
                    border-color: #ff6b35;
                    box-shadow: 0 0 0 2px rgba(255,107,53,0.3);
                }

                .btn {
                    width: 100%;
                    padding: 1rem;
                    margin-top: 1.5rem;
                    border-radius: 50px;
                    border: none;
                    background: linear-gradient(135deg, #ff6b35, #ff3e6c);
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .btn:hover {
                    transform: translateY(-2px);
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

            <div className="container">

                <div>
                    <div className="toggle">
                        <span className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</span>
                        <span className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</span>
                    </div>

                    <div className="card-3d">
                        <div className={`inner ${!isLogin ? 'flip' : ''}`}>

                            {/* LOGIN */}
                            <div className="face">
                                <h2>Welcome Back</h2>

                                <form onSubmit={handleSubmit}>
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

                                    <button className="btn">
                                        {loading ? <span className="spinner"></span> : 'Sign In'}
                                    </button>
                                </form>
                            </div>

                            {/* SIGNUP */}
                            <div className="face back">
                                <h2>Create Account</h2>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="input"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />

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

                                    <select
                                        name="role"
                                        className="input"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <button className="btn">
                                        {loading ? <span className="spinner"></span> : 'Sign Up'}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;
