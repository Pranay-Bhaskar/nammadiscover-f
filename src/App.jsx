import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './store/AppContext';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


// Layout & Components
import Navbar from './components/Navbar';

// Pages
import Landing from './pages/Landing';
import ExplorePage from './pages/ExplorePage';
import Login from './pages/Login';
import LocationDetailPage from './pages/LocationDetailPage';
import MyVideos from './pages/MyVideos';
import AdminModeration from './pages/AdminModeration';
import AdminDashboard from './pages/AdminDashboard';
import ExplorerStudio from './pages/ExplorerStudio';
import GalleryPage from './pages/GalleryPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

const MainLayout = ({ children }) => {
  const location = useLocation();

  // 🚀 Routes where navbar should NOT show
  const hideNavbarRoutes = ['/', '/login'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}   {/* ✅ FIX */}

      <main>{children}</main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{
            style: { borderRadius: '10px', background: '#1e293b', color: '#f1f5f9' },
          }} />
          <MainLayout>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gallery" element={<GalleryPage />} />

              {/* Protected — general users */}
              <Route path="/dashboard" element={
                <ProtectedRoute><ExplorePage /></ProtectedRoute>
              } />
              <Route path="/my-videos" element={
                <ProtectedRoute><MyVideos /></ProtectedRoute>
              } />
              <Route path="/explorer-studio" element={
                <ProtectedRoute><ExplorerStudio /></ProtectedRoute>
              } />

              {/* Admin only */}
              <Route path="/admin" element={
                <AdminRoute><AdminDashboard /></AdminRoute>
              } />
              <Route path="/admin/dashboard" element={
                <AdminRoute><AdminDashboard /></AdminRoute>
              } />
              <Route path="/admin/moderation" element={
                <AdminRoute><AdminModeration /></AdminRoute>
              } />

              <Route path="/location/:id" element={<LocationDetailPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;