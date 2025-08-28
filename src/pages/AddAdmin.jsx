import React, { useState } from "react";

const AddNewAdmin = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+27 71 234 5678",
      roles: ["Admin", "Pastor"],
      department: "Youth Ministry",
      profilePic: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+27 72 345 6789",
      roles: ["Moderator"],
      department: "HR",
      profilePic: "https://via.placeholder.com/80",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    phone: "",
    roles: [],
    department: "",
    profilePic: null,
  });

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e) => {
    const options = e.target.options;
    const selectedRoles = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedRoles.push(options[i].value);
    }
    setNewAdmin((prev) => ({ ...prev, roles: selectedRoles }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewAdmin((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const admin = {
      id: admins.length + 1,
      ...newAdmin,
      profilePic: newAdmin.profilePic || "https://via.placeholder.com/80",
    };
    setAdmins([...admins, admin]);
    setNewAdmin({
      fullName: "",
      email: "",
      phone: "",
      roles: [],
      department: "",
      profilePic: null,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Existing Admins */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Admins</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {admins.map((admin) => (
            <div key={admin.id} className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
              <img
                src={admin.profilePic}
                alt={admin.fullName}
                className="w-20 h-20 rounded-full border-2 border-brand-gold"
              />
              <div>
                <h2 className="text-xl font-semibold">{admin.fullName}</h2>
                <p className="text-gray-600">{admin.roles.join(" • ")}</p>
                <p className="text-gray-500">{admin.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Admin Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-gold hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Add New Admin
        </button>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddAdmin} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={newAdmin.fullName}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={newAdmin.phone}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
              />
              <select multiple value={newAdmin.roles} onChange={handleRolesChange} className="p-2 border rounded-lg">
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Pastor">Pastor</option>
                <option value="Member">Member</option>
              </select>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={newAdmin.department}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
              />
              <input type="file" onChange={handleFileChange} className="p-2 border rounded-lg" />

              <div className="flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-gold text-white rounded-lg">
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewAdmin;
