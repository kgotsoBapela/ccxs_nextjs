'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfileForm() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setMessage('Profile updated successfully');
    } else {
      setMessage('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Update Profile
      </button>
      {message && <p className={message.includes('Error') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
    </form>
  );
}