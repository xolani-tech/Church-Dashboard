import React, { useState } from "react";

const regions = ["Cape Town", "Johannesburg", "Durban"];

const MemberManagement = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  // Example data grouped by region
  const [membersByRegion, setMembersByRegion] = useState({
    "Cape Town": [
      { memberId: "CT001", fullName: "Alice Johnson", dob: "1990-05-15", gender: "Female", phone: "+27 71 111 2222", address: "123 Main St", department: "Youth Ministry", dateJoined: "2023-01-10" },
      // ... more Cape Town members
    ],
    "Johannesburg": [
      { memberId: "JHB001", fullName: "Bob Smith", dob: "1985-12-02", gender: "Male", phone: "+27 72 333 4444", address: "456 Church Rd", department: "Music Ministry", dateJoined: "2022-09-20" },
    ],
    "Durban": [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    memberId: "", fullName: "", dob: "", gender: "", phone: "", address: "", department: "", dateJoined: "", region: regions[0]
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const currentMembers = membersByRegion[activeRegion]
    .filter(m =>
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage);

  const totalPages = Math.ceil(
    membersByRegion[activeRegion].filter(m =>
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / membersPerPage
  );

  const handleAddMember = (e) => {
    e.preventDefault();
    const region = newMember.region;
    setMembersByRegion(prev => ({
      ...prev,
      [region]: [...prev[region], { ...newMember }]
    }));
    setNewMember({ memberId: "", fullName: "", dob: "", gender: "", phone: "", address: "", department: "", dateJoined: "", region: regions[0] });
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-print-section").innerHTML;
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`<html><head><title>Print Members</title></head><body>${printContent}</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Member Management</h1>

      {/* Region Tabs */}
      <div className="flex space-x-4 mb-4">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => { setActiveRegion(region); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-lg ${activeRegion === region ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Search and Print */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Name or Member ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-1/3"
        />
        <button onClick={handlePrint} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Print</button>
      </div>

      {/* Member Table */}
      <div id="table-print-section" className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Member ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Full Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">DOB</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Gender</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Address</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Department</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMembers.map(m => (
              <tr key={m.memberId}>
                <td className="px-4 py-2">{m.memberId}</td>
                <td className="px-4 py-2">{m.fullName}</td>
                <td className="px-4 py-2">{m.dob}</td>
                <td className="px-4 py-2">{m.gender}</td>
                <td className="px-4 py-2">{m.phone}</td>
                <td className="px-4 py-2">{m.address}</td>
                <td className="px-4 py-2">{m.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <form onSubmit={handleAddMember} className="grid grid-cols-1 gap-4">
              <input type="text" name="memberId" placeholder="Member ID" value={newMember.memberId} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" required />
              <input type="text" name="fullName" placeholder="Full Name" value={newMember.fullName} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" required />
              <input type="date" name="dob" value={newMember.dob} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" />
              <select name="gender" value={newMember.gender} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input type="tel" name="phone" placeholder="Phone" value={newMember.phone} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" />
              <input type="text" name="address" placeholder="Address" value={newMember.address} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" />
              <input type="text" name="department" placeholder="Department" value={newMember.department} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" />
              <input type="date" name="dateJoined" value={newMember.dateJoined} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg" />
              <select name="region" value={newMember.region} onChange={(e)=>handleInputChange(e)} className="p-2 border rounded-lg">
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="flex justify-end space-x-3 mt-4">
                <button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-gold text-white rounded-lg">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MemberManagement;
