'use client'

import { useState } from 'react';
import Image from 'next/image';

interface BikeCardProps {
  name: string;
  model: string;
  bikePic: string;
  status: 'available' | 'not available' | 'maintenance';
}

export default function BikeCard({ name, model, bikePic, status }: BikeCardProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleBookBike = () => {
    // Implement booking logic here
    console.log(`Booking bike: ${name}`);
  };

  const handleViewCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4">
      {/* <img className="w-full h-48 object-cover" src={bikePic} alt={name} />  */}
      <Image className="w-full h-48 object-cover" src={bikePic} alt="Bike Pic" width={500} height={200}/>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{model}</p>
        <span
          className={`inline-block px-4 py-1 text-sm font-semibold rounded-full mb-4 ${
            status === 'available'
              ? 'bg-green-200 text-green-800'
              : status === 'not available'
              ? 'bg-yellow-200 text-yellow-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        <div className="flex justify-between">
          <button
            onClick={handleBookBike}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            disabled={status !== 'available'}
          >
            Book Bike
          </button>
          <button
            onClick={handleViewCalendar}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            View Calendar
          </button>
        </div>
        {showCalendar && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            {/* Implement calendar component here */}
            <p>Calendar placeholder - Implement actual calendar component</p>
          </div>
        )}
      </div>
    </div>
  );
}