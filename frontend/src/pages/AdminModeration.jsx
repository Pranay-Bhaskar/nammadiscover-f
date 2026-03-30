import React from 'react';
import ModerationQueue from '../components/ModerationQueue';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminModeration() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="vu-page-wrapper">
      <ModerationQueue />
    </div>
  );
}
