import React, { useState } from "react";
import { CSVLink } from "react-csv";

const regions = ["Cape Town", "Johannesburg", "Durban"];

const initialMembers = {
  "Cape Town": [
    { memberId: "CT001", fullName: "Alice Johnson", dob: "1990-05-15", gender: "Female", phone: "+27 71 111 2222", address: "123 Main St", department: "Youth Ministry", dateJoined: "2023-01-10", notes: "" },
    { memberId: "CT002", fullName: "Jon Snow", dob: "1995-02-15", gender: "Male", phone: "+27 71 131 2222", address: "153 Main St", department: "Men Ministry", dateJoined: "2025-01-10", notes: "" },
  ],
  "Johannesburg": [
    { memberId: "JHB001", fullName: "Bob Smith", dob: "1985-12-02", gender: "Male", phone: "+27 72 333 4444", address: "456 Church Rd", department: "Music Ministry", dateJoined: "2022-09-20", notes: "" },
  ],
  "Durban": [],
};

const MemberManagement = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [membersByRegion, setMembersByRegion] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", gender: "", dobFrom: "", dobTo: "" });
  const [sorting, setSorting] = useState({ column: "memberId", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [newMember, setNewMember] = useState({ memberId: "", fullName: "", dob: "", gender: "", phone: "", address: "", department: "", dateJoined: "", notes: "", region: regions[0] });

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingMember) {
      setEditingMember(prev => ({ ...prev, [name]: value }));
    } else {
      setNewMember(prev => ({ ...prev, [name]: value }));
    }
  };

  const filteredMembers = membersByRegion[activeRegion]
    .filter(m => (m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || m.memberId.toLowerCase().includes(searchQuery.toLowerCase())))
    .filter(m => (!filters.department || m.department === filters.department))
    .filter(m => (!filters.gender || m.gender === filters.gender))
    .filter(m => {
      const dob = new Date(m.dob);
      const from = filters.dobFrom ? new Date(filters.dobFrom) : null;
      const to = filters.dobTo ? new Date(filters.dobTo) : null;
      if (from && dob < from) return false;
      if (to && dob > to) return false;
      return true;
    });

  const sortedMembers = [...filteredMembers].sort((a,b) => {
    const col = sorting.column;
    if(a[col] < b[col]) return sorting.order === "asc" ? -1 : 1;
    if(a[col] > b[col]) return sorting.order === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = sortedMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedMembers.length / membersPerPage);

  const handleSort = (column) => {
    setSorting(prev => ({ column, order: prev.column === column && prev.order === "asc" ? "desc" : "asc" }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const region = newMember.region;
    setMembersByRegion(prev => ({
      ...prev,
      [region]: [...prev[region], { ...newMember }]
    }));
    setNewMember({ memberId: "", fullName: "", dob: "", gender: "", phone: "", address: "", department: "", dateJoined: "", notes: "", region: regions[0] });
    setIsModalOpen(false);
  };

  const handleEditMember = (e) => {
    e.preventDefault();
    setMembersByRegion(prev => ({
      ...prev,
      [activeRegion]: prev[activeRegion].map(m => m.memberId === editingMember.memberId ? editingMember : m)
    }));
    setEditingMember(null);
    setIsModalOpen(false);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembersByRegion(prev => ({
        ...prev,
        [activeRegion]: prev[activeRegion].filter(m => m.memberId !== memberId)
      }));
    }
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
  };

  const handleBulkDelete = () => {
    if(selectedMembers.length && window.confirm("Delete selected members?")) {
      setMembersByRegion(prev => ({
        ...prev,
        [activeRegion]: prev[activeRegion].filter(m => !selectedMembers.includes(m.memberId))
      }));
      setSelectedMembers([]);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-print-section").innerHTML;
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`<html><head><title>Print Members</title></head><body>${printContent}</body></html>`);
    win.document.close();
    win.print();
  };

  const toggleExpandRow = (memberId) => {
    setExpandedRows(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
  };

  // --- JSX ---
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Member Management</h1>

      {/* Region Tabs */}
      <div className="flex space-x-4 mb-4">
        {regions.map(region => (
          <button key={region} onClick={() => { setActiveRegion(region); setCurrentPage(1); }} className={`px-4 py-2 rounded-lg ${activeRegion === region ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-700"}`}>
            {region}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input type="text" placeholder="Search by Name or ID" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="p-2 border rounded-lg w-1/3" />
        <select value={filters.department} onChange={(e)=>setFilters({...filters, department: e.target.value})} className="p-2 border rounded-lg">
          <option value="">All Departments</option>
          <option>Youth Ministry</option>
          <option>Music Ministry</option>
          <option>Men Ministry</option>
          <option>Outreach</option>
        </select>
        <select value={filters.gender} onChange={(e)=>setFilters({...filters, gender: e.target.value})} className="p-2 border rounded-lg">
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="date" value={filters.dobFrom} onChange={(e)=>setFilters({...filters, dobFrom: e.target.value})} className="p-2 border rounded-lg" />
        <input type="date" value={filters.dobTo} onChange={(e)=>setFilters({...filters, dobTo: e.target.value})} className="p-2 border rounded-lg" />
      </div>

      {/* Members Table */}
      <div id="table-print-section" className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                <input type="checkbox" onChange={(e)=>{ e.target.checked ? setSelectedMembers(currentMembers.map(m=>m.memberId)) : setSelectedMembers([])}} />
              </th>
              {["memberId","fullName","department","dateJoined"].map(col => (
                <th key={col} onClick={()=>handleSort(col)} className="px-4 py-2 text-left text-sm font-medium text-gray-500 cursor-pointer">
                  {col} {sorting.column===col ? (sorting.order==="asc"?"↑":"↓"):""}
                </th>
              ))}
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                Actions
                <button
                  onClick={() => { setIsModalOpen(true); setEditingMember(null); }}
                  className="ml-2 px-3 py-2 bg-brand-gold text-white rounded-lg text-sm"
                >
                  Add Member
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMembers.map(m => (
              <React.Fragment key={m.memberId}>
                <tr>
                  <td className="px-4 py-2">
                    <input type="checkbox" checked={selectedMembers.includes(m.memberId)} onChange={()=>handleSelectMember(m.memberId)} />
                  </td>
                  <td className="px-4 py-2">{m.memberId}</td>
                  <td className="px-4 py-2">{m.fullName}</td>
                  <td className="px-4 py-2">{m.department}</td>
                  <td className="px-4 py-2">{m.dateJoined}</td>
                  <td className="px-4 py-2 flex gap-2 justify-end">
                    <button onClick={()=>{ setEditingMember(m); setIsModalOpen(true); }} className="px-2 py-1 bg-blue-600 text-white rounded-lg">Edit</button>
                    <button onClick={()=>handleDeleteMember(m.memberId)} className="px-2 py-1 bg-red-600 text-white rounded-lg">Delete</button>
                    <button onClick={()=>toggleExpandRow(m.memberId)} className="px-2 py-1 bg-gray-600 text-white rounded-lg">
                      {expandedRows.includes(m.memberId) ? "Hide" : "View More"}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(m.memberId) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-4 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p><strong>DOB:</strong> {m.dob}</p>
                        <p><strong>Gender:</strong> {m.gender}</p>
                        <p><strong>Phone:</strong> {m.phone}</p>
                        <p><strong>Address:</strong> {m.address}</p>
                        <p className="md:col-span-2"><strong>Notes:</strong> {m.notes || "-"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Delete Button */}
      {selectedMembers.length > 0 && (
        <div className="flex justify-start mt-2">
          <button onClick={handleBulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete Selected</button>
        </div>
      )}

      {/* Export / Print Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={handlePrint} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Print</button>
        <CSVLink data={membersByRegion[activeRegion]} filename={`${activeRegion}_members.csv`} className="px-4 py-2 bg-green-600 text-white rounded-lg">Export CSV</CSVLink>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({length: totalPages}, (_, i) => (
          <button key={i} onClick={()=>setCurrentPage(i+1)} className={`px-3 py-1 rounded ${currentPage===i+1 ? "bg-brand-gold text-white":"bg-gray-200 text-gray-700"}`}>{i+1}</button>
        ))}
      </div>

      {/* Add/Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingMember ? "Edit Member" : "Add New Member"}</h2>
            <form onSubmit={editingMember ? handleEditMember : handleAddMember} className="grid grid-cols-1 gap-4">
              <input type="text" name="memberId" placeholder="Member ID" value={editingMember?.memberId || newMember.memberId} onChange={handleInputChange} className="p-2 border rounded-lg" required disabled={!!editingMember} />
              <input type="text" name="fullName" placeholder="Full Name" value={editingMember?.fullName || newMember.fullName} onChange={handleInputChange} className="p-2 border rounded-lg" required />
              <input type="date" name="dob" value={editingMember?.dob || newMember.dob} onChange={handleInputChange} className="p-2 border rounded-lg" />
              <select name="gender" value={editingMember?.gender || newMember.gender} onChange={handleInputChange} className="p-2 border rounded-lg">
                <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
              <input type="tel" name="phone" placeholder="Phone" value={editingMember?.phone || newMember.phone} onChange={handleInputChange} className="p-2 border rounded-lg" />
              <input type="text" name="address" placeholder="Address" value={editingMember?.address || newMember.address} onChange={handleInputChange} className="p-2 border rounded-lg" />
              <input type="text" name="department" placeholder="Department" value={editingMember?.department || newMember.department} onChange={handleInputChange} className="p-2 border rounded-lg" />
              <input type="date" name="dateJoined" value={editingMember?.dateJoined || newMember.dateJoined} onChange={handleInputChange} className="p-2 border rounded-lg" />
              <textarea name="notes" placeholder="Notes" value={editingMember?.notes || newMember.notes} onChange={handleInputChange} className="p-2 border rounded-lg" />
              {!editingMember && (
                <select name="region" value={newMember.region} onChange={handleInputChange} className="p-2 border rounded-lg">
                  {regions.map(r => (<option key={r} value={r}>{r}</option>))}
                </select>
              )}
              <div className="flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingMember(null); }} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-gold text-white rounded-lg">{editingMember ? "Save Changes" : "Add Member"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
