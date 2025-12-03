import { useState } from "react";

export default function Modal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[450px] animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="date"
            placeholder="Date (e.g. Jul 14, 2025)"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="time"
            placeholder="Time (e.g. 9:00 AM)"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              onChange={handleChange}
            />
            Mark as Featured
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
