import { useState, useEffect } from "react";

export default function EditEventModal({ event, onClose, onSubmit }) {
  const [form, setForm] = useState(event);

  useEffect(() => {
    setForm(event);
  }, [event]);

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
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Mark as Featured
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
