import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-brand-600 mt-2">Page not found</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Return Home</Link>
      </div>
    </div>
  );
}
