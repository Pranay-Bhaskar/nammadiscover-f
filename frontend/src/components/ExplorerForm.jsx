import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../store/AppContext';
import toast from 'react-hot-toast';

const ExplorerForm = ({ onClose }) => {
    const { state } = useApp();
    const [formData, setFormData] = useState({
        phone: '',
        reason: '',
        experience: '',
        city: '',
        specialties: '',
        locations: '',
        instagram: '',
        twitter: '',
        website: ''
    });
    const [loading, setLoading] = useState(false);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = {
                ...formData,
                specialties: formData.specialties.split(',').map(s => s.trim()),
                locations: formData.locations.split(',').map(l => l.trim()),
                socialLinks: {
                    instagram: formData.instagram,
                    twitter: formData.twitter,
                    website: formData.website
                }
            };
            await axios.post('http://localhost:5001/api/explorers/apply', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(t('Application submitted successfully!', 'ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!'));
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card" style={{ maxWidth: '600px', padding: '2rem' }}>
                <div className="flex-between">
                    <h3>{t('Become a Verified Explorer', 'ಪರಿಶೀಲಿಸಿದ ಅನ್ವೇಷಕರಾಗಿ')}</h3>
                    <button className="icon-toggle" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="grid-2">
                        <div className="form-group">
                            <label>{t('Phone Number', 'ಫೋನ್ ಸಂಖ್ಯೆ')}</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('Current City', 'ಪ್ರಸ್ತುತ ನಗರ')}</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <label>{t('Why do you want to be an explorer?', 'ನೀವು ಏಕೆ ಅನ್ವೇಷಕರಾಗಲು ಬಯಸುತ್ತೀರಿ?')}</label>
                        <textarea 
                            className="form-control" 
                            required 
                            value={formData.reason}
                            onChange={e => setFormData({...formData, reason: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="form-group mt-2">
                        <label>{t('Your Experience (Expertise)', 'ನಿಮ್ಮ ಅನುಭವ (ಪರಿಣತಿ)')}</label>
                        <textarea 
                            className="form-control" 
                            value={formData.experience}
                            onChange={e => setFormData({...formData, experience: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="grid-2 mt-2">
                        <div className="form-group">
                            <label>{t('Specialties (comma separated)', 'ಪರಿಣತಿಗಳು (ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿ)')}</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Food, History, Nature"
                                value={formData.specialties}
                                onChange={e => setFormData({...formData, specialties: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('Familiar Locations', 'ಪರಿಚಿತ ಸ್ಥಳಗಳು')}</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Hampi, CTR, Cubbon Park"
                                value={formData.locations}
                                onChange={e => setFormData({...formData, locations: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid-3 mt-2">
                        <div className="form-group">
                            <label>Instagram</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formData.instagram}
                                onChange={e => setFormData({...formData, instagram: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Twitter</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formData.twitter}
                                onChange={e => setFormData({...formData, twitter: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formData.website}
                                onChange={e => setFormData({...formData, website: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-3" disabled={loading}>
                        {loading ? 'Submitting...' : t('Submit Application', 'ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExplorerForm;
