import { useState } from "react";
import Header from '../components/Header';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import AddEventModal from "../components/EventsModal";
import EditEventModal from "../components/EditEventModal";
import DeleteModal from "../components/DeleteEventModal";

export default function EventPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Youth Summer Camp",
      description: "A week of fun, adventure, and spiritual growth for middle and high school students.",
      date: "Jul 14, 2025",
      time: "9:00 AM",
      location: "Camp Wilderness",
      image: "https://images.unsplash.com/photo-1501700493788-fa1a6e57a3a1?auto=format&fit=crop&w=500&q=60",
      featured: false,
    },
    {
      id: 2,
      title: "Easter Sunday Celebration",
      description: "Join us for a special Easter service celebrating the resurrection of Jesus Christ.",
      date: "Apr 20, 2025",
      time: "10:00 AM",
      location: "Main Sanctuary",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=60",
      featured: true,
    },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleAddEvent = (newEvent) => setEvents([...events, { id: Date.now(), ...newEvent }]);
  const handleUpdateEvent = (updatedEvent) => setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  const confirmDeleteEvent = () => {
    setEvents(events.filter(ev => ev.id !== eventToDelete.id));
    setOpenDelete(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <Header />

      {/* Main content container with consistent padding */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Events</h1>

          <button
            onClick={() => setOpenAdd(true)}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-orange-600 transition"
          >
            <span className="text-lg">+</span> Add Event
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow rounded-xl p-5 flex gap-5 items-start border hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  {event.featured && (
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{event.description}</p>
                <div className="flex gap-6 mt-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1"><FiCalendar /> {event.date}</span>
                  <span className="flex items-center gap-1"><FiClock /> {event.time}</span>
                  <span className="flex items-center gap-1"><FiMapPin /> {event.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => { setSelectedEvent(event); setOpenEdit(true); }}
                  className="text-gray-700 hover:text-blue-600 text-xl"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => { setEventToDelete(event); setOpenDelete(true); }}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {openAdd && <AddEventModal onClose={() => setOpenAdd(false)} onSubmit={handleAddEvent} />}
      {openEdit && <EditEventModal event={selectedEvent} onClose={() => setOpenEdit(false)} onSubmit={handleUpdateEvent} />}
      {openDelete && <DeleteModal onClose={() => setOpenDelete(false)} onConfirm={confirmDeleteEvent} title={eventToDelete?.title} />}
    </div>
  );
}
