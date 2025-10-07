import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { events } from "../api/axios";
import EventCard from "../components/event/EventCard";

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
    <div className="min-h-screen bg-gray-50 p-6 pt-15">
      {/* ↑ Added pt-20 to prevent overlap with fixed navbar */}
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Event Management System
      </h1>

      {/* Search + Create */}
      <div className="flex justify-center items-center mb-6 gap-6 flex-wrap">
        <input
          type="text"
          placeholder="Search events..."
          className="border p-2 rounded w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => navigate("/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
        <button
          onClick={() => navigate("/participants")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Participants List
        </button>
        {/* Enroll button removed */}
      </div>

      {/* Cards Grid / Fallback UI */}
      {filteredEvents.length === 0 ? (
        <div className="w-full text-center py-12">
          {search.trim() ? (
            <>
              <p className="text-lg text-gray-600 mb-4">
                No events found for "
                <span className="font-semibold">{search}</span>".
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSearch("")}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Clear search
                </button>
                <button
                  onClick={() => navigate("/create-event")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create new event
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-4">No events available yet.</p>
              <button
                onClick={() => navigate("/create-event")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create the first event
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
