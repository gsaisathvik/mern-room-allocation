import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', capacity: 1, type: 'Single', features: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, capacity: Number(form.capacity), features: form.features.split(',').map(s=>s.trim()).filter(Boolean) };
      const { data } = await api.post('/rooms', payload);
      navigate(`/rooms/${data._id}`);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <form onSubmit={submit} className="card w-full max-w-lg p-6">
        <h1 className="text-2xl font-semibold">Create Room</h1>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-4 grid gap-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="input" type="number" min="1" placeholder="Capacity" value={form.capacity} onChange={e=>setForm({...form, capacity: e.target.value})} />
          <select className="input" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
            <option>Single</option><option>Double</option><option>Suite</option><option>Lab</option><option>Meeting</option>
          </select>
          <input className="input" placeholder="Features (comma-separated)" value={form.features} onChange={e=>setForm({...form, features: e.target.value})} />
          <button className="btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}
