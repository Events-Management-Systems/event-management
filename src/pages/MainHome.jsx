import { useNavigate } from "react-router-dom";

export default function MainHome() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-4 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-blue-700 mb-6 drop-shadow-lg">
        Event Manager
      </h1>

      {/* Banner Image */}
      <img
        src="https://img.freepik.com/free-vector/people-planning-events-illustration_23-2148797814.jpg"
        alt="Event Management"
        className="w-64 sm:w-96 h-64 sm:h-96 object-contain mb-8 shadow-xl rounded-lg"
      />

      <p className="text-gray-700 text-lg sm:text-xl mb-10 max-w-xl">
        Manage all your events efficiently. Navigate to different sections using the buttons below.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Event Management Button */}
        <button
          onClick={() => navigate("/events")}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Events List
        </button>

        {/* Create Event Button */}
        <button
          onClick={() => navigate("/create-event")}
          className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Create Event
        </button>
      </div>
    </div>
  );
}