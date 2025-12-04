// DeleteModal.jsx
import React from "react";

export default function DeleteModal({ title, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="delete-window">
        <h3>Delete Department</h3>
        <p>
          Are you sure you want to delete <strong>{title}</strong>?
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              onConfirm();
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
