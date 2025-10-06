import React, { useEffect, useState } from "react";
import { events as EventsApi } from "../api/axios";

export default function ParticipantsList() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    EventsApi.allEvents
      .then((res) => setEvents(res.data || []))
      .catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    if (!selectedEventId) return setParticipants([]);
    setLoading(true);
    EventsApi.getEventById(selectedEventId)
      .then((res) => setParticipants(res.data.participants || []))
      .catch(() => setParticipants([]))
      .finally(() => setLoading(false));
  }, [selectedEventId]);

  const handleDelete = async (index) => {
    const confirm = window.confirm("Delete this participant?");
    if (!confirm) return;
    try {
      const updated = participants.filter((_, i) => i !== index);
      await EventsApi.updateEvent(selectedEventId, { participants: updated });
      setParticipants(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete participant");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Participants List</h1>

      <div className="mb-4">
        <label className="mr-2">Select event:</label>
        <select
          value={selectedEventId || ""}
          onChange={(e) => setSelectedEventId(e.target.value || null)}
          className="border p-2 rounded"
        >
          <option value="">-- choose event --</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading participants...</p>
      ) : !selectedEventId ? (
        <p>Select an event to view its participants.</p>
      ) : participants.length === 0 ? (
        <p>No participants registered for this event.</p>
      ) : (
        <div className="space-y-2">
          {participants.map((p, idx) => (
            <div
              key={idx}
              className="p-3 bg-white border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">Age: {p.age} | Phone: {p.phone}</div>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(idx)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
