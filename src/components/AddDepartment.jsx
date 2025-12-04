// DepartmentModal.jsx
import React, { useEffect, useState } from "react";

const COLOR_OPTIONS = [
  "#2a7df6", // blue
  "#2fc45a", // green
  "#9b59ff", // purple
  "#f6a21a", // orange
  "#ff5a73", // pink/red
  "#10b8d6", // teal
];

export default function DepartmentModal({ onClose, onCreate, onUpdate, editing }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    leaderName: "",
    leaderEmail: "",
    schedule: "",
    image: "",
    color: COLOR_OPTIONS[0],
    active: true,
  });

  // When editing prop changes, populate form (fixes "update does not work" issues)
  useEffect(() => {
    if (editing) {
      // copy all fields, ensure id preserved
      setForm({
        name: editing.name || "",
        description: editing.description || "",
        leaderName: editing.leaderName || "",
        leaderEmail: editing.leaderEmail || "",
        schedule: editing.schedule || "",
        image: editing.image || "",
        color: editing.color || COLOR_OPTIONS[0],
        active: editing.active ?? true,
        id: editing.id,
        members: editing.members ?? 0,
      });
    } else {
      // reset for create
      setForm((f) => ({
        name: "",
        description: "",
        leaderName: "",
        leaderEmail: "",
        schedule: "",
        image: "",
        color: COLOR_OPTIONS[0],
        active: true,
      }));
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleColourPick = (c) => {
    setForm((f) => ({ ...f, color: c }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (editing) {
      // important: return full object with id so parent can replace correctly
      onUpdate({
        id: form.id,
        name: form.name,
        description: form.description,
        leaderName: form.leaderName,
        leaderEmail: form.leaderEmail,
        schedule: form.schedule,
        image: form.image,
        color: form.color,
        active: form.active,
        members: form.members ?? 0,
      });
    } else {
      onCreate({
        name: form.name,
        description: form.description,
        leaderName: form.leaderName,
        leaderEmail: form.leaderEmail,
        schedule: form.schedule,
        image: form.image,
        color: form.color,
        active: form.active,
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h3 className="modal-title">{editing ? "Edit Department" : "New Department"}</h3>

        <form onSubmit={handleSubmit} className="modal-form">
          <label className="label">
            Name *
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="label">
            Description
            <textarea
              className="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </label>

          <div className="row">
            <label className="label half">
              Leader Name
              <input
                className="input"
                name="leaderName"
                value={form.leaderName}
                onChange={handleChange}
              />
            </label>

            <label className="label half">
              Leader Email
              <input
                className="input"
                name="leaderEmail"
                value={form.leaderEmail}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="label">
            Meeting Schedule
            <input
              className="input"
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
              placeholder="e.g., Every Sunday at 9 AM"
            />
          </label>

          <label className="label">
            Image URL
            <input
              className="input"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <div className="label">
            Color Theme
            <div className="color-row">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`color-pill ${form.color === c ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => handleColourPick(c)}
                />
              ))}
            </div>
          </div>

          <label className="toggle-row">
            <div className="toggle">
              <input
                type="checkbox"
                name="active"
                checked={!!form.active}
                onChange={handleChange}
                id="activeToggle"
              />
              <span className="toggle-slider" />
            </div>
            <span className="toggle-label">Active</span>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {editing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
