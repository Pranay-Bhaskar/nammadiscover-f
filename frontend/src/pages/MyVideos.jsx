import React, { useState } from 'react';
import VideoUpload from '../components/VideoUpload';
// import PlacesForm from '../components/PlacesForm'; 
import VideoDashboard from '../components/VideoDashboard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import VideoGallery from '../components/VideoGallery';

export default function MyVideos() {
  const { user } = useAuth();

  const [showUpload, setShowUpload] = useState(false); 
  const [showPlaceForm, setShowPlaceForm] = useState(false); 

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
            <div className="vu-page-title">📂 My Videos</div>
            <div className="vu-page-subtitle">
              Manage all your uploaded content
            </div>
          </div>

          {/* ✅ BUTTONS */}
          <div style={{ display: 'flex', gap: '10px' }}>

            {/* EXISTING VIDEO BUTTON (UNCHANGED) */}
            <button
              className={`${showUpload ? 'vu-btn-ghost' : 'vu-btn-primary'}`}
              onClick={() => setShowUpload((v) => !v)}
            >
              {showUpload ? '✕ Cancel Upload' : '+ Upload Video'}
            </button>

            {/* ✅ NEW PLACE BUTTON */}
            {/* <button
              className={`${showPlaceForm ? 'vu-btn-ghost' : 'vu-btn-primary'}`}
              onClick={() => setShowPlaceForm((v) => !v)}
            >
              {showPlaceForm ? '✕ Cancel Place' : '+ Add Place'}
            </button> */}

          </div>
        </div>

        {/* ✅ VIDEO FORM (UNCHANGED) */}
        {showUpload && (
          <div style={{ marginBottom: '1.75rem' }}>
            <VideoUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {/* ✅ NEW PLACE FORM */}
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
  // return(
  //   <>
  //   <VideoGallery/>
  //   </>
  // );
}
