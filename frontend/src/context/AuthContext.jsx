import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Axios instance with interceptor
    const api = axios.create({
        baseURL: '/api',
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('nammadiscover_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('nammadiscover_token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                } catch (err) {
                    console.error('Failed to fetch user', err);
                    localStorage.removeItem('nammadiscover_token');
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('nammadiscover_token', data.token);
        setUser(data);
        return data;
    };

    const register = async (username, email, password, role = 'user') => {
        const { data } = await api.post('/auth/register', { username, email, password, role });
        localStorage.setItem('nammadiscover_token', data.token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('nammadiscover_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, api }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
