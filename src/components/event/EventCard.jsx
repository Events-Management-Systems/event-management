import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <>
    
   
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600"> {event.date}</p>
      <p className="text-sm text-gray-600">{event.venue}</p>
      <p className="text-sm text-gray-600">{event.time}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/info/${event.id}`)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Info
        </button>
        <button
          onClick={() => navigate('/enroll-participant')}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Enroll
        </button>
      </div>
    </div> 
    </>
  );
}
