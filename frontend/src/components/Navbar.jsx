import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-brand-900">Room<span className="text-brand-500">White</span></Link>
        <nav className="flex items-center gap-3">
          <Link className="btn-outline" to="/rooms">Rooms</Link>
          <Link className="btn-outline" to="/bookings">Bookings</Link>
          {user?.role === 'admin' && <Link className="btn-outline" to="/rooms/new">Create Room</Link>}
          {user ? (
            <button onClick={logout} className="btn-primary">Logout</button>
          ) : (
            <Link className="btn-primary" to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
