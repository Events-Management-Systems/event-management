import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { events } from "../axios/axios";
import Card from "../components/EventCard";

export default function Home() {
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    events.allEvents.then((res) => setEventList(res.data));
  }, []);

  const filteredEvents = eventList.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Event Management System
      </h1>

      {/* Search + Create */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
