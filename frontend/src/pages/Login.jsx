import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.ok) setError(res.error);
    else navigate('/');
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-brand-500">Log in to manage rooms and bookings.</p>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-4 space-y-3">
          <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
        <p className="mt-4 text-sm">No account? <Link to="/register" className="underline">Create one</Link></p>
      </form>
    </div>
  );
}
