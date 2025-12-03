import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import {
  Trash2,
  Printer,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ---- Sample member data ----
const initialMembers = [
  {
    memberId: "CT001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+27 71 234 5678",
    region: "Cape Town",
    joined: "2023-03-12T10:15:00",
    role: "Member",
    address: "123 Main Street, Cape Town",
  },
  {
    memberId: "JHB002",
    name: "Sarah M",
    email: "sarah@example.com",
    phone: "+27 72 555 6677",
    region: "Johannesburg",
    joined: "2024-06-28T17:20:00",
    role: "Admin",
    address: "45 Rose Ave, Johannesburg",
  },
  {
    memberId: "DBN010",
    name: "Michael K",
    email: "michael@example.com",
    phone: "+27 73 111 2222",
    region: "Durban",
    joined: "2025-01-15T08:40:00",
    role: "Member",
    address: "78 Ocean Drive, Durban",
  },
];

const regions = ["Cape Town", "Johannesburg", "Durban", "Other"];
const roles = ["Member", "Admin", "Pastor"];

const prettyDateTime = (val) => {
  if (!val) return "-";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return val;
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};

const MembersPage = () => {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ region: "", role: "" });
  const [sorting, setSorting] = useState({ column: "joined", order: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const [selectedIds, setSelectedIds] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // ---- Derived ----
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members
      .filter((m) => {
        if (!q) return true;
        const hay = `${m.name} ${m.email} ${m.phone} ${m.region} ${m.memberId}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((m) => (!filters.region || m.region === filters.region))
      .filter((m) => (!filters.role || m.role === filters.role));
  }, [members, search, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { column, order } = sorting;
    arr.sort((a, b) => {
      const av = a[column];
      const bv = b[column];
      if (column === "joined") {
        const ad = new Date(av).getTime();
        const bd = new Date(bv).getTime();
        return order === "asc" ? ad - bd : bd - ad;
      }
      if (av < bv) return order === "asc" ? -1 : 1;
      if (av > bv) return order === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sorting]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const pageStart = (currentPage - 1) * perPage;
  const pageEnd = pageStart + perPage;
  const current = sorted.slice(pageStart, pageEnd);

  // ---- Handlers ----
  const toggleSort = (column) => {
    setSorting((prev) => ({
      column,
      order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const onToggleExpand = (id) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const onSelectOne = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const onSelectAllVisible = (checked) =>
    setSelectedIds(checked ? current.map((m) => m.memberId) : []);

  const onDeleteOne = (id) => {
    if (!window.confirm("Delete this member?")) return;
    setMembers((prev) => prev.filter((m) => m.memberId !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const onBulkDelete = () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Delete selected members?")) return;
    setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.memberId)));
    setSelectedIds([]);
  };

  const handlePrint = () => {
    const html = document.getElementById("members-print-area")?.innerHTML || "";
    const w = window.open("", "", "width=900,height=600");
    w.document.write(`<html><head><title>Print Members</title></head><body>${html}</body></html>`);
    w.document.close();
    w.print();
  };

  // ---- Render ----
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members Management</h1>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name, email, phone, or ID"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />

        <select
          value={filters.region}
          onChange={(e) => { setFilters((p) => ({ ...p, region: e.target.value })); setCurrentPage(1); }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select
          value={filters.role}
          onChange={(e) => { setFilters((p) => ({ ...p, role: e.target.value })); setCurrentPage(1); }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Roles</option>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Table */}
      <div id="members-print-area" className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                <input
                  type="checkbox"
                  onChange={(e) => onSelectAllVisible(e.target.checked)}
                  checked={current.length > 0 && selectedIds.length === current.length}
                />
              </th>

              {[
                { key: "memberId", label: "ID" },
                { key: "name", label: "Name" },
                { key: "region", label: "Region" },
                { key: "joined", label: "Joined" },
                { key: "role", label: "Role" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500 cursor-pointer select-none"
                >
                  {col.label} {sorting.column === col.key ? (sorting.order === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}

              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {current.map((m) => (
              <React.Fragment key={m.memberId}>
                <tr>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(m.memberId)}
                      onChange={() => onSelectOne(m.memberId)}
                    />
                  </td>
                  <td className="px-4 py-2">{m.memberId}</td>
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.region}</td>
                  <td className="px-4 py-2">{prettyDateTime(m.joined)}</td>
                  <td className="px-4 py-2">{m.role}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleExpand(m.memberId)}
                        title={expanded.includes(m.memberId) ? "Hide" : "View More"}
                        className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        {expanded.includes(m.memberId) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <button
                        onClick={() => onDeleteOne(m.memberId)}
                        title="Delete"
                        className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {expanded.includes(m.memberId) && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p><strong>Email:</strong> {m.email || "-"}</p>
                        <p><strong>Phone:</strong> {m.phone || "-"}</p>
                        <p><strong>Address:</strong> {m.address || "-"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {current.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Delete */}
      {selectedIds.length > 0 && (
        <div className="flex justify-start">
          <button onClick={onBulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Delete Selected
          </button>
        </div>
      )}

      {/* Export / Print */}
      <div className="flex justify-end gap-2">
        <button onClick={handlePrint} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg">
          <Printer size={16} /> Print
        </button>
        <CSVLink
          data={filtered}
          filename="members.csv"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          <Download size={16} /> Export CSV
        </CSVLink>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1 rounded ${currentPage === n ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
