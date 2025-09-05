import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Plus, Trash2, Printer, FileDown, Eye, Edit } from "lucide-react";

// Sample departments data
const initialDepartments = [
  {
    id: 1,
    name: "Worship Team",
    region: "Cape Town",
    head: "John Smith",
    workers: ["John Smith", "Alice Brown", "Peter White"],
    createdAt: "2023-04-01",
    status: "Active",
    description: "Handles worship and praise sessions.",
  },
  {
    id: 2,
    name: "Hospitality",
    region: "Johannesburg",
    head: "Sarah Johnson",
    workers: ["Sarah Johnson", "Emily Davis"],
    createdAt: "2023-05-12",
    status: "Active",
    description: "Manages welcoming visitors and members.",
  },
];

const Departments = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selected, setSelected] = useState([]);

  // Toggle row expand
  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Checkbox handler
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Bulk delete
  const deleteSelected = () => {
    setDepartments((prev) => prev.filter((d) => !selected.includes(d.id)));
    setSelected([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Departments</h1>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        {/* Table head with Add button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Departments List</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2">
            <Plus size={18} /> Add Department
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? departments.map((d) => d.id) : []
                    )
                  }
                  checked={
                    selected.length > 0 &&
                    selected.length === departments.length
                  }
                />
              </th>
              <th className="p-3">Department Name</th>
              <th className="p-3">Region</th>
              <th className="p-3">Head</th>
              <th className="p-3">Workers</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <React.Fragment key={dept.id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(dept.id)}
                      onChange={() => toggleSelect(dept.id)}
                    />
                  </td>
                  <td className="p-3 font-medium">{dept.name}</td>
                  <td className="p-3">{dept.region}</td>
                  <td className="p-3">{dept.head}</td>
                  <td className="p-3">{dept.workers.length}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        dept.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {dept.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => toggleExpand(dept.id)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button className="text-yellow-600 hover:underline flex items-center gap-1">
                      <Edit size={16} /> Edit
                    </button>
                  </td>
                </tr>

                {/* Expanded row */}
                {expandedRow === dept.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="p-4">
                      <p className="mb-2 text-gray-700">
                        <strong>Description:</strong> {dept.description}
                      </p>
                      <p className="mb-2 text-gray-700">
                        <strong>Created At:</strong> {dept.createdAt}
                      </p>
                      <p className="mb-2 text-gray-700">
                        <strong>Workers:</strong>{" "}
                        {dept.workers.length > 0
                          ? dept.workers.join(", ")
                          : "No workers assigned"}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Footer actions */}
        <div className="flex justify-between items-center mt-4">
          {selected.length > 0 && (
            <button
              onClick={deleteSelected}
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={18} /> Delete Selected
            </button>
          )}

          <div className="flex gap-2">
            <CSVLink
              data={departments}
              filename="departments.csv"
              className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 flex items-center gap-2"
            >
              <FileDown size={18} /> Export CSV
            </CSVLink>
            <button className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 flex items-center gap-2">
              <Printer size={18} /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
