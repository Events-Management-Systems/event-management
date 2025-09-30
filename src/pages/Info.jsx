import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { events } from "../axios/axios";

export default function Info() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    events.getEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{event.title}</h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center mb-6">
        <img
          src={event.image}
          alt={event.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-md"
        />
        <video
          src={event.video}
          className="w-full md:w-1/2 h-64 object-cover rounded-md"
          controls
          autoPlay
          loop
        />
      </div>

      <p className="text-gray-700 mb-2"><b>Date:</b> {event.date}</p>
      <p className="text-gray-700 mb-6"><b>Venue:</b> {event.venue}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <p className="text-gray-600">{event.description1}</p>
        <p className="text-gray-600">{event.description2}</p>
      </div>
    </div>
  );
}
