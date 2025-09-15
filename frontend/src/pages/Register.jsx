import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (!res.ok) setError(res.error);
    else navigate('/login');
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold">Create account</h1>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-4 space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <select className="input" value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </div>
      </form>
    </div>
  );
}
