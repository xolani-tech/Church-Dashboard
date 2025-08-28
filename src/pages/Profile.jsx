import React, { useState } from "react";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+27 71 234 5678",
    roles: ["Admin", "Pastor"],
    department: "Youth Ministry",
    userId: "EMP12345",
    dateJoined: "2023-01-15",
    lastLogin: "2025-08-25",
  });

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    setIsModalOpen(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deleted"); // Replace with API call
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center space-x-6">
        {/* Profile Picture */}
        <div>
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-brand-gold shadow-md"
          />
        </div>

        {/* User Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-600">{user.roles.join(" • ")}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Edit Button */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-gold hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Information Display Card */}
      <div className="mt-8 bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.fullName}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.email}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.phone}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Roles</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.roles.join(", ")}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Department</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.department}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">User ID</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.userId}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Date Joined</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.dateJoined}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Last Login</label>
            <div className="w-full mt-1 p-2 border rounded-lg bg-gray-50">
              {user.lastLogin}
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="mt-6">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                defaultValue={user.fullName}
                className="p-2 border rounded-lg"
              />
              <input
                type="email"
                defaultValue={user.email}
                className="p-2 border rounded-lg"
              />
              <input
                type="tel"
                defaultValue={user.phone}
                className="p-2 border rounded-lg"
              />
              <select multiple className="p-2 border rounded-lg">
                <option selected={user.roles.includes("Admin")}>Admin</option>
                <option selected={user.roles.includes("Pastor")}>Pastor</option>
                <option selected={user.roles.includes("Member")}>Member</option>
              </select>
              <input
                type="text"
                defaultValue={user.department}
                className="p-2 border rounded-lg"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-gold text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
