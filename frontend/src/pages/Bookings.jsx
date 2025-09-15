import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ room: '', title: '', start: '', end: '' });
  const [error, setError] = useState('');

  const load = async () => {
    const [b, r] = await Promise.all([api.get('/bookings'), api.get('/rooms')]);
    setBookings(b.data); setRooms(r.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/bookings', form);
      setForm({ room: '', title: '', start: '', end: '' });
      await load();
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  const del = async (id) => {
    await api.delete(`/bookings/${id}`);
    await load();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Create Booking</h2>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        <form onSubmit={submit} className="mt-3 grid gap-3">
          <select className="input" value={form.room} onChange={e=>setForm({...form, room: e.target.value})}>
            <option value="">Select room</option>
            {rooms.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
          <label className="text-sm text-brand-600">Start</label>
          <input className="input" type="datetime-local" value={form.start} onChange={e=>setForm({...form, start: e.target.value})} />
          <label className="text-sm text-brand-600">End</label>
          <input className="input" type="datetime-local" value={form.end} onChange={e=>setForm({...form, end: e.target.value})} />
          <button className="btn-primary">Create</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">All Bookings</h2>
        <div className="space-y-3">
          {bookings.map(b => (
            <div key={b._id} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{b.title} • {new Date(b.start).toLocaleString()} → {new Date(b.end).toLocaleString()}</div>
                <div className="text-sm text-brand-500">{b.room?.name}</div>
              </div>
              <button onClick={()=>del(b._id)} className="btn-outline">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
