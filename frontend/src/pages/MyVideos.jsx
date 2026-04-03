import React, { useState } from 'react';
import VideoUpload from '../components/VideoUpload';
import PlacesForm from '../components/PlacesForm'; // ✅ ENABLED
import VideoDashboard from '../components/VideoDashboard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import VideoGallery from '../components/VideoGallery';

export default function MyVideos() {
  const { user } = useAuth();

  const [showUpload, setShowUpload] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false); // ✅ ENABLED

  const [refreshKey, setRefreshKey] = useState(0);

  if (!user) return <Navigate to="/login" replace />;

  const handleUploadSuccess = () => {
    setShowUpload(false);
    setRefreshKey((k) => k + 1);
  };

  const handlePlaceSuccess = () => {
    setShowPlaceForm(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <div style={{ paddingTop: '80px' }}>
        <VideoGallery />
      </div>

      <div className="vu-page-wrapper">
        <div className="vu-page-header">
          <div>
            <div className="vu-page-title">📂 My Content</div>
            <div className="vu-page-subtitle">
              Manage your videos and places
            </div>
          </div>

          {/* BUTTONS */}
          <div style={{ display: 'flex', gap: '10px' }}>

            {/* VIDEO BUTTON */}
            <button
              className={`${showUpload ? 'vu-btn-ghost' : 'vu-btn-primary'}`}
              onClick={() => {
                setShowUpload((v) => !v);
                setShowPlaceForm(false); // ✅ avoid overlap
              }}
            >
              {showUpload ? '✕ Cancel Upload' : '+ Upload Video'}
            </button>

            {/* PLACE BUTTON */}
            <button
              className={`${showPlaceForm ? 'vu-btn-ghost' : 'vu-btn-primary'}`}
              onClick={() => {
                setShowPlaceForm((v) => !v);
                setShowUpload(false); // ✅ avoid overlap
              }}
            >
              {showPlaceForm ? '✕ Cancel Place' : '+ Add Place'}
            </button>

          </div>
        </div>

        {/* VIDEO FORM */}
        {showUpload && (
          <div style={{ marginBottom: '1.75rem' }}>
            <VideoUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {/* PLACE FORM */}
        {showPlaceForm && (
          <div style={{ marginBottom: '1.75rem' }}>
            <PlacesForm onSuccess={handlePlaceSuccess} />
          </div>
        )}

        {/* DASHBOARD */}
        <VideoDashboard key={refreshKey} userId={user?._id} />
      </div>
    </>
  );
}
