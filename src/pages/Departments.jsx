// DepartmentsPage.jsx
import React, { useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import DepartmentModal from "../components/AddDepartment";
import DeleteModal from "../components/DeleteDepartment";
import Header from "../components/Header";
const initialDepartments = [
  {
    id: 1,
    name: "Children's Ministry",
    description:
      "Teaching children about God's love through fun and interactive lessons",
    leaderName: "Jennifer Davis",
    leaderEmail: "jennifer@gracecommunity.org",
    schedule: "Every Sunday at 9 AM",
    image: "",
    color: "#f6a21a", // orange
    active: true,
    members: 0,
  },
  {
    id: 2,
    name: "Outreach Team",
    description: "Serving our local community and spreading the gospel",
    leaderName: "David Wilson",
    leaderEmail: "david@gracecommunity.org",
    schedule: "First Saturday of each month",
    image: "",
    color: "#2fc45a", // green
    active: true,
    members: 0,
  },
  {
    id: 3,
    name: "Worship Team",
    description:
      "Leading our congregation in praise and worship through music and song",
    leaderName: "Sarah Johnson",
    leaderEmail: "sarah@gracecommunity.org",
    schedule: "Every Thursday at 7 PM",
    image: "",
    color: "#9b59ff", // purple
    active: true,
    members: 0,
  },
  {
    id: 4,
    name: "Youth Ministry",
    description: "Engaging and equipping the next generation to follow Christ",
    leaderName: "Mike Thompson",
    leaderEmail: "mike@gracecommunity.org",
    schedule: "Every Friday at 6 PM",
    image: "",
    color: "#2a7df6", // blue
    active: true,
    members: 0,
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null); // department object or null
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const handleCreate = (dept) => {
    const newDept = { ...dept, id: Date.now(), members: 0 };
    setDepartments((d) => [newDept, ...d]);
  };

  const handleUpdate = (updated) => {
    // Ensure id exists and replace by id
    setDepartments((d) => d.map((x) => (x.id === updated.id ? updated : x)));
  };

  const handleDelete = () => {
    if (!toDelete) return;
    setDepartments((d) => d.filter((x) => x.id !== toDelete.id));
    setOpenDelete(false);
    setToDelete(null);
  };

 return (
  <div>
    <Header /> {/* same header as dashboard */}

    <div className="p-6 departments-page">
      <div className="departments-header">
        <h1>Departments</h1>
        <button
          className="btn-add"
          onClick={() => {
            setEditing(null);
            setOpenModal(true);
          }}
        >
          + Add Department
        </button>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            dept={dept}
            onEdit={(d) => {
              setEditing(d);
              setOpenModal(true);
            }}
            onDelete={(d) => {
              setToDelete(d);
              setOpenDelete(true);
            }}
          />
        ))}
      </div>
    </div>

    {openModal && (
      <DepartmentModal
        onClose={() => setOpenModal(false)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editing={editing}
      />
    )}

    {openDelete && (
      <DeleteModal
        title={toDelete?.name}
        onClose={() => {
          setOpenDelete(false);
          setToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    )}
  </div>
);
}