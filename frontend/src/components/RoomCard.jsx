import React from 'react';
import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <span className="text-sm text-brand-500">{room.type}</span>
      </div>
      <p className="mt-2 text-sm">Capacity: <b>{room.capacity}</b></p>
      {room.allocatedTo && <p className="mt-1 text-sm">Allocated to: <b>{room.allocatedTo}</b></p>}
      <div className="mt-3 flex gap-2">
        <Link to={`/rooms/${room._id}`} className="btn-outline">View</Link>
      </div>
    </div>
  );
}
