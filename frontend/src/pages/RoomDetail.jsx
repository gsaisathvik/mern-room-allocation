import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [alloc, setAlloc] = useState('');
  const [form, setForm] = useState({ name: '', capacity: 1, type: 'Single', features: '' });

  useEffect(() => {
    api.get(`/rooms/${id}`).then(res => {
      setRoom(res.data);
      setAlloc(res.data.allocatedTo || '');
      setForm({ 
        name: res.data.name, 
        capacity: res.data.capacity, 
        type: res.data.type, 
        features: (res.data.features || []).join(', ') 
      });
    });
  }, [id]);

  const updateAlloc = async () => {
    const { data } = await api.post(`/rooms/${id}/allocate`, { allocatedTo: alloc });
    setRoom(data);
  };

  const updateRoom = async () => {
    const payload = { ...form, capacity: Number(form.capacity), features: form.features.split(',').map(s=>s.trim()).filter(Boolean) };
    const { data } = await api.put(`/rooms/${id}`, payload);
    setRoom(data);
    alert('Updated');
  };

  const del = async () => {
    if (!confirm('Delete room?')) return;
    await api.delete(`/rooms/${id}`);
    navigate('/rooms');
  }

  if (!room) return <div className="mx-auto max-w-6xl px-4 py-6">Loading...</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <p className="text-sm text-brand-500">{room.type} • Capacity {room.capacity}</p>
        <p className="mt-2 text-sm">Features: {(room.features || []).join(', ') || 'None'}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h2 className="font-semibold">Allocate</h2>
          <div className="mt-3 flex gap-2">
            <input className="input" placeholder="Team or Person" value={alloc} onChange={e=>setAlloc(e.target.value)} />
            <button onClick={updateAlloc} className="btn-primary">Save</button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold">Edit Room</h2>
          <div className="mt-3 grid gap-3">
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
            <input className="input" placeholder="Capacity" type="number" min="1" value={form.capacity} onChange={e=>setForm({...form, capacity: e.target.value})} />
            <select className="input" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
              <option>Single</option><option>Double</option><option>Suite</option><option>Lab</option><option>Meeting</option>
            </select>
            <input className="input" placeholder="Features (comma-separated)" value={form.features} onChange={e=>setForm({...form, features: e.target.value})} />
            <div className="flex gap-2">
              <button onClick={updateRoom} className="btn-primary">Update</button>
              <button onClick={del} className="btn-outline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
