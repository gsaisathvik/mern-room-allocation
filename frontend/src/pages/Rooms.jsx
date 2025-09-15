import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data));
  }, []);

  const filtered = rooms.filter(r => r.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <div className="flex gap-2">
          <input className="input" placeholder="Search rooms..." value={q} onChange={e=>setQ(e.target.value)} />
          <Link to="/rooms/new" className="btn-primary">New Room</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(r => <RoomCard key={r._id} room={r} />)}
      </div>
    </div>
  );
}
