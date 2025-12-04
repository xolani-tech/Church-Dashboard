// DepartmentCard.jsx
import React from "react";
import { FiEdit2, FiTrash2, FiUsers, FiCalendar, FiMail } from "react-icons/fi";
import "./departments.css"
export default function DepartmentCard({ dept, onEdit, onDelete }) {
  return (
    <div className="dept-card">
      <div
        className="dept-strip"
        style={{ backgroundColor: dept.color || "#2a7df6" }}
      />
      <div className="dept-body">
        <div className="dept-head">
          <h2>{dept.name}</h2>

          <div className="dept-actions">
            <button
              className="icon-btn"
              title="Edit department"
              onClick={() => onEdit(dept)}
            >
              <FiEdit2 />
            </button>

            <button
              className="icon-btn delete"
              title="Delete department"
              onClick={() => onDelete(dept)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        <p className="dept-desc">{dept.description}</p>

        <div className="dept-lines">
          <div className="line">
            <FiUsers />
            <span>Led by {dept.leaderName}</span>
          </div>

          <div className="line">
            <FiCalendar />
            <span>{dept.schedule}</span>
          </div>

          <div className="line">
            <FiMail />
            <span>{dept.leaderEmail}</span>
          </div>
        </div>

        <hr className="dept-divider" />

        <div className="dept-footer">{dept.members ?? 0} members</div>
      </div>
    </div>
  );
}
