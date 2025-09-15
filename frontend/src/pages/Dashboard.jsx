import React, { useEffect, useState } from 'react';
import { api } from '../api';
import RoomCard from '../components/RoomCard';

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data)).catch(()=>{});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-brand-500">Quick glance at rooms and allocations.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {rooms.map(r => <RoomCard key={r._id} room={r} />)}
      </div>
    </div>
  );
}
