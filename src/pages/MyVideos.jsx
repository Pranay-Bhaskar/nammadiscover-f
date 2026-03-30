import React, { useState } from 'react';
import VideoUpload from '../components/VideoUpload';
import VideoDashboard from '../components/VideoDashboard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import VideoGallery from '../components/VideoGallery';

export default function MyVideos() {
  const { user } = useAuth();
  const [showUpload, setShowUpload] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!user) return <Navigate to="/login" replace />;

  const handleUploadSuccess = () => {
    setShowUpload(false);
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
          <div className="vu-page-subtitle">Manage all your uploaded videos</div>
        </div>
        <button
          className={`${showUpload ? 'vu-btn-ghost' : 'vu-btn-primary'}`}
          onClick={() => setShowUpload((v) => !v)}
        >
          {showUpload ? '✕ Cancel Upload' : '+ Upload Video'}
        </button>
      </div>

      
      {showUpload && (
        <div style={{ marginBottom: '1.75rem' }}>
          <VideoUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      )}

      

      <VideoDashboard key={refreshKey} userId={user?._id} />
    </div>
    
    </>
    
  );
  // return(
  //   <>
  //   <VideoGallery/>
  //   </>
  // );
}
