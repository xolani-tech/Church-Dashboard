import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import {
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  Plus,
  Printer,
  Download,
  Shield,
  ShieldOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * NOTE: To receive requests from your public website,
 * POST them to your backend and persist to DB.
 * Then fetch into this component (replace initialRequests with API data).
 */

// ---- Sample data ----
const initialRequests = [
  {
    requestId: "PRQ-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+27 71 234 5678",
    region: "Cape Town",
    message:
      "Please pray for my job interview this week. I need peace and confidence.",
    dateSubmitted: "2025-09-03T10:15:00",
    status: "Pending", // Pending | Prayed For | Answered
    isPrivate: false,
    memberId: "CT001", // optional
  },
  {
    requestId: "PRQ-002",
    name: "Anonymous",
    email: "",
    phone: "",
    region: "Johannesburg",
    message:
      "Health issues in my family. Trusting God for complete healing. Keep this private.",
    dateSubmitted: "2025-09-02T08:40:00",
    status: "Pending",
    isPrivate: true,
    memberId: "",
  },
  {
    requestId: "PRQ-003",
    name: "Sarah M",
    email: "sarah@example.com",
    phone: "+27 72 555 6677",
    region: "Durban",
    message: "Traveling this weekend. Please pray for journey mercies.",
    dateSubmitted: "2025-08-28T17:20:00",
    status: "Prayed For",
    isPrivate: false,
    memberId: "DBN010",
  },
];

// ---- Helpers ----
const statuses = ["Pending", "Prayed For", "Answered"];
const regions = ["Cape Town", "Johannesburg", "Durban", "Other"];

const prettyDateTime = (val) => {
  if (!val) return "-";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return val;
  return d.toLocaleString();
};

const PrayerRequests = () => {
  // ---- State ----
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    region: "",
    privacy: "", // "", "public", "private"
    from: "",
    to: "",
  });
  const [sorting, setSorting] = useState({ column: "dateSubmitted", order: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const [selectedIds, setSelectedIds] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    requestId: "",
    name: "",
    email: "",
    phone: "",
    region: "",
    message: "",
    dateSubmitted: "",
    status: "Pending",
    isPrivate: false,
    memberId: "",
  });
  // const [editing, setEditing] = useState(null);

  // ---- Derived ----
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return requests
      .filter((r) => {
        if (!q) return true;
        const hay = `${r.name} ${r.email} ${r.phone} ${r.region} ${r.message} ${r.requestId}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((r) => (!filters.status || r.status === filters.status))
      .filter((r) => (!filters.region || r.region === filters.region))
      .filter((r) =>
        filters.privacy === ""
          ? true
          : filters.privacy === "private"
          ? r.isPrivate
          : !r.isPrivate
      )
      .filter((r) => {
        const dt = new Date(r.dateSubmitted);
        const from = filters.from ? new Date(filters.from) : null;
        const to = filters.to ? new Date(filters.to) : null;
        if (from && dt < from) return false;
        if (to && dt > to) return false;
        return true;
      });
  }, [requests, search, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { column, order } = sorting;
    arr.sort((a, b) => {
      const av = a[column];
      const bv = b[column];
      if (column === "dateSubmitted") {
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
    setSelectedIds(checked ? current.map((r) => r.requestId) : []);

  const generateId = () => {
    const n = (requests.length + 1).toString().padStart(3, "0");
    return `PRQ-${n}`;
  };

  const openAddModal = () => {
    // setEditing(null);
    // setForm({
    //   requestId: "",
    //   name: "",
    //   email: "",
    //   phone: "",
    //   region: "",
    //   message: "",
    //   dateSubmitted: new Date().toISOString(),
    //   status: "Pending",
    //   isPrivate: false,
    //   memberId: "",
    // });
    // setIsModalOpen(true);
  };

  // const openEditModal = (r) => {
  //   setEditing(r);
  //   setForm({ ...r });
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setEditing(null);
  // };

  // const onFormChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     ...form,
  //     requestId: editing ? form.requestId : form.requestId || generateId(),
  //     name: form.name?.trim() || "Anonymous",
  //     email: form.email?.trim() || "",
  //     phone: form.phone?.trim() || "",
  //     region: form.region || "Other",
  //     message: form.message?.trim() || "",
  //     dateSubmitted: form.dateSubmitted || new Date().toISOString(),
  //     status: form.status || "Pending",
  //     isPrivate: !!form.isPrivate,
  //     memberId: form.memberId?.trim() || "",
  //   };

  //   if (editing) {
  //     setRequests((prev) =>
  //       prev.map((r) => (r.requestId === editing.requestId ? payload : r))
  //     );
  //   } else {
  //     if (requests.some((r) => r.requestId === payload.requestId)) {
  //       alert("Request ID already exists. Please change it.");
  //       return;
  //     }
  //     setRequests((prev) => [...prev, payload]);
  //   }
  //   closeModal();
  // };

  const onDeleteOne = (id) => {
    if (!window.confirm("Delete this request?")) return;
    setRequests((prev) => prev.filter((r) => r.requestId !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const onBulkDelete = () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Delete selected requests?")) return;
    setRequests((prev) => prev.filter((r) => !selectedIds.includes(r.requestId)));
    setSelectedIds([]);
  };

  const markAsPrayed = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.requestId === id ? { ...r, status: "Prayed For" } : r))
    );

  const markAsAnswered = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.requestId === id ? { ...r, status: "Answered" } : r))
    );

  const togglePrivacy = (id) =>
    setRequests((prev) =>
      prev.map((r) =>
        r.requestId === id ? { ...r, isPrivate: !r.isPrivate } : r
      )
    );

  const handlePrint = () => {
    const html = document.getElementById("prayer-print-area")?.innerHTML || "";
    const w = window.open("", "", "width=900,height=600");
    w.document.write(`<html><head><title>Print Prayer Requests</title></head><body>${html}</body></html>`);
    w.document.close();
    w.print();
  };

  // ---- Render ----
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prayer Requests</h1>
        {/* <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-lg"
        >
          <Plus size={18} />
          Add Request
        </button> */}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name, email, phone, message, or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />

        <select
          value={filters.status}
          onChange={(e) => {
            setFilters((p) => ({ ...p, status: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filters.region}
          onChange={(e) => {
            setFilters((p) => ({ ...p, region: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={filters.privacy}
          onChange={(e) => {
            setFilters((p) => ({ ...p, privacy: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">Privacy: All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <input
          type="date"
          value={filters.from}
          onChange={(e) => {
            setFilters((p) => ({ ...p, from: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Table */}
      <div id="prayer-print-area" className="overflow-x-auto bg-white shadow-md rounded-xl">
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
                { key: "requestId", label: "ID" },
                { key: "name", label: "Name" },
                { key: "region", label: "Region" },
                { key: "dateSubmitted", label: "Submitted" },
                { key: "status", label: "Status" },
                { key: "isPrivate", label: "Privacy" },
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
            {current.map((r) => (
              <React.Fragment key={r.requestId}>
                <tr>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(r.requestId)}
                      onChange={() => onSelectOne(r.requestId)}
                    />
                  </td>
                  <td className="px-4 py-2">{r.requestId}</td>
                  <td className="px-4 py-2">
                    <div className="font-medium">
                      {r.name || "Anonymous"}{" "}
                      {r.memberId ? (
                        <span className="text-xs text-gray-500">({r.memberId})</span>
                      ) : null}
                    </div>
                    <div className="text-xs text-gray-500">
                      {r.email || "-"} {r.phone ? `• ${r.phone}` : ""}
                    </div>
                  </td>
                  <td className="px-4 py-2">{r.region}</td>
                  <td className="px-4 py-2">{prettyDateTime(r.dateSubmitted)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        r.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : r.status === "Prayed For"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {r.isPrivate ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                        <Shield size={14} /> Private
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        <ShieldOff size={14} /> Public
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      {/* View more / hide */}
                      <button
                        onClick={() => onToggleExpand(r.requestId)}
                        title={expanded.includes(r.requestId) ? "Hide" : "View More"}
                        className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        {expanded.includes(r.requestId) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {/* Mark as prayed for */}
                      {r.status !== "Prayed For" && (
                        <button
                          onClick={() => markAsPrayed(r.requestId)}
                          title="Mark as Prayed For"
                          className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}

                      {/* Mark as answered */}
                      {r.status !== "Answered" && (
                        <button
                          onClick={() => markAsAnswered(r.requestId)}
                          title="Mark as Answered"
                          className="px-2 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          ✅
                        </button>
                      )}

                      {/* Toggle privacy */}
                      <button
                        onClick={() => togglePrivacy(r.requestId)}
                        title={r.isPrivate ? "Set Public" : "Set Private"}
                        className={`px-2 py-1 rounded-lg ${
                          r.isPrivate
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {r.isPrivate ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => onDeleteOne(r.requestId)}
                        title="Delete"
                        className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {expanded.includes(r.requestId) && (
                  <tr className="bg-gray-50">
                    <td colSpan={8} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <strong>Message:</strong>
                          <p className="mt-1 whitespace-pre-wrap">{r.message || "-"}</p>
                        </div>
                        <p><strong>Email:</strong> {r.email || "-"}</p>
                        <p><strong>Phone:</strong> {r.phone || "-"}</p>
                        <p><strong>Member ID:</strong> {r.memberId || "-"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {current.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No prayer requests found.
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
          filename="prayer_requests.csv"
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
            className={`px-3 py-1 rounded ${
              currentPage === n ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Prayer Request" : "Add Prayer Request"}
            </h2>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="requestId"
                  placeholder="Request ID (auto if blank)"
                  value={form.requestId}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                  disabled={!!editing}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name (or leave blank for Anonymous)"
                  value={form.name}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                />
                <select
                  name="region"
                  value={form.region}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  value={form.status}
                  onChange={onFormChange}
                  className="p-2 border rounded-lg"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={form.isPrivate}
                    onChange={onFormChange}
                  />
                  Private (admin-only)
                </label>
              </div>

              <textarea
                name="message"
                placeholder="Prayer request message"
                value={form.message}
                onChange={onFormChange}
                className="p-2 border rounded-lg"
                rows={4}
                required
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-gold text-white rounded-lg"
                >
                  {editing ? "Save Changes" : "Add Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PrayerRequests;
