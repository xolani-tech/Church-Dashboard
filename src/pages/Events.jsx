import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { Edit } from "lucide-react";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// ---- Sample data ----
const initialEvents = [
  {
    eventId: "EVT-001",
    title: "Sunday Service",
    datetime: "2025-09-07T09:00",
    location: "Main Sanctuary",
    organiser: "Worship Team",
    category: "Service",
    status: "Upcoming",
    description: "Weekly Sunday service with praise and worship.",
    attendees: ["CT001", "JHB001"],
    createdAt: "2025-08-20",
  },
  {
    eventId: "EVT-002",
    title: "Youth Conference",
    datetime: "2025-10-15T18:00",
    location: "Hall A",
    organiser: "Youth Ministry",
    category: "Conference",
    status: "Upcoming",
    description: "Two-day youth conference with guest speakers.",
    attendees: [],
    createdAt: "2025-08-25",
  },
  {
    eventId: "EVT-003",
    title: "Community Outreach",
    datetime: "2025-08-20T10:00",
    location: "City Park",
    organiser: "Outreach Team",
    category: "Outreach",
    status: "Completed",
    description: "Feeding program and evangelism.",
    attendees: ["CT002"],
    createdAt: "2025-08-01",
  },
];

// ---- Helpers ----
const categories = ["Service", "Conference", "Outreach", "Fundraiser", "Meeting", "Other"];
const statuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

const prettyDateTime = (val) => {
  if (!val) return "-";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return val;
  return d.toLocaleString();
};

const autoStatusByNow = (dt) => {
  const now = new Date();
  const start = new Date(dt);
  if (Number.isNaN(start.getTime())) return "Upcoming";
  return start > now ? "Upcoming" : "Completed";
};

const Events = () => {
  // ---- State ----
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", category: "", from: "", to: "" });
  const [sorting, setSorting] = useState({ column: "datetime", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const [selectedIds, setSelectedIds] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    eventId: "",
    title: "",
    datetime: "",
    location: "",
    organiser: "",
    category: "",
    status: "Upcoming",
    description: "",
    attendeesText: "",
  });

  // ---- Derived ----
  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        const hay = `${e.title} ${e.location} ${e.organiser} ${e.eventId}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((e) => (!filters.status || e.status === filters.status))
      .filter((e) => (!filters.category || e.category === filters.category))
      .filter((e) => {
        const dt = new Date(e.datetime);
        const from = filters.from ? new Date(filters.from) : null;
        const to = filters.to ? new Date(filters.to) : null;
        if (from && dt < from) return false;
        if (to && dt > to) return false;
        return true;
      });
  }, [events, search, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { column, order } = sorting;
    arr.sort((a, b) => {
      const av = a[column];
      const bv = b[column];
      if (column === "datetime" || column === "createdAt") {
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

  const totalPages = Math.ceil(sorted.length / perPage) || 1;
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
    setSelectedIds(checked ? current.map((e) => e.eventId) : []);

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({
      eventId: "",
      title: "",
      datetime: "",
      location: "",
      organiser: "",
      category: "",
      status: "Upcoming",
      description: "",
      attendeesText: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ev) => {
    setEditingEvent(ev);
    setForm({
      eventId: ev.eventId,
      title: ev.title,
      datetime: ev.datetime,
      location: ev.location,
      organiser: ev.organiser,
      category: ev.category,
      status: ev.status,
      description: ev.description,
      attendeesText: ev.attendees?.join(", ") || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const generateId = () => {
    const n = (events.length + 1).toString().padStart(3, "0");
    return `EVT-${n}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      eventId: editingEvent ? form.eventId : form.eventId || generateId(),
      title: form.title.trim(),
      datetime: form.datetime,
      location: form.location.trim(),
      organiser: form.organiser.trim(),
      category: form.category || "Other",
      status: form.status || autoStatusByNow(form.datetime),
      description: form.description.trim(),
      attendees: form.attendeesText.split(",").map((s) => s.trim()).filter(Boolean),
      createdAt: editingEvent?.createdAt || new Date().toISOString().slice(0, 10),
    };

    if (editingEvent) {
      setEvents((prev) => prev.map((e) => (e.eventId === editingEvent.eventId ? payload : e)));
    } else {
      if (events.some((e) => e.eventId === payload.eventId)) {
        alert("Event ID already exists. Please change it.");
        return;
      }
      setEvents((prev) => [...prev, payload]);
    }
    closeModal();
  };

  const onDeleteOne = (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    setEvents((prev) => prev.filter((e) => e.eventId !== eventId));
    setSelectedIds((prev) => prev.filter((x) => x !== eventId));
  };

  const onBulkDelete = () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Delete selected events?")) return;
    setEvents((prev) => prev.filter((e) => !selectedIds.includes(e.eventId)));
    setSelectedIds([]);
  };

  const handlePrint = () => {
    const html = document.getElementById("events-print-area")?.innerHTML || "";
    const w = window.open("", "", "width=900,height=600");
    w.document.write(`<html><head><title>Print Events</title></head><body>${html}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 300);
  };

  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(events);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
    XLSX.writeFile(workbook, "events.xlsx");
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Events Report", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["ID", "Title", "Date", "Location", "Organiser", "Status"]],
      body: events.map((ev) => [
        ev.eventId,
        ev.title,
        prettyDateTime(ev.datetime),
        ev.location,
        ev.organiser,
        ev.status,
      ]),
    });
    doc.save("events.pdf");
  };

  // ---- Render ----
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Events Management</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by Title / Location / Organiser / ID"
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
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filters.category}
          onChange={(e) => {
            setFilters((p) => ({ ...p, category: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
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
        <input
          type="date"
          value={filters.to}
          onChange={(e) => {
            setFilters((p) => ({ ...p, to: e.target.value }));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Table */}
      <div id="events-print-area" className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) => onSelectAllVisible(e.target.checked)}
                  checked={current.length > 0 && selectedIds.length === current.length}
                />
              </th>
              {[ 
                { key: "eventId", label: "Event ID" },
                { key: "title", label: "Title" },
                { key: "datetime", label: "Date & Time" },
                { key: "location", label: "Location" },
                { key: "organiser", label: "Organiser" },
                { key: "status", label: "Status" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500 cursor-pointer"
                >
                  {col.label} {sorting.column === col.key ? (sorting.order === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                Actions
                <button
                  onClick={openAddModal}
                  className="ml-2 px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm"
                >
                  Add Event
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {current.map((ev) => (
              <React.Fragment key={ev.eventId}>
                <tr>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(ev.eventId)}
                      onChange={() => onSelectOne(ev.eventId)}
                    />
                  </td>
                  <td className="px-4 py-2">{ev.eventId}</td>
                  <td className="px-4 py-2 font-medium">{ev.title}</td>
                  <td className="px-4 py-2">{prettyDateTime(ev.datetime)}</td>
                  <td className="px-4 py-2">{ev.location}</td>
                  <td className="px-4 py-2">{ev.organiser}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        ev.status === "Upcoming"
                          ? "bg-green-100 text-green-700"
                          : ev.status === "Ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : ev.status === "Completed"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-end">
                    <button
                      onClick={() => onToggleExpand(ev.eventId)}
                      className="px-2 py-1 bg-gray-600 text-white rounded-lg"
                    >
                      {expanded.includes(ev.eventId) ? "Hide" : "View More"}
                    </button>
                    <button
                      onClick={() => openEditModal(ev)}
                      className="text-yellow-600 hover:underline flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => onDeleteOne(ev.eventId)}
                      className="px-2 py-1 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expanded.includes(ev.eventId) && (
                  <tr className="bg-gray-50">
                    <td colSpan={9} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p><strong>Category:</strong> {ev.category}</p>
                        <p><strong>Created:</strong> {ev.createdAt}</p>
                        <p className="md:col-span-2"><strong>Description:</strong> {ev.description || "-"}</p>
                        <div className="md:col-span-2">
                          <strong>Attendees:</strong>{" "}
                          {ev.attendees?.length ? ev.attendees.join(", ") : "-"}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {current.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                  No events found.
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
        <button onClick={handlePrint} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Print</button>
        <button onClick={handleExcel} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Export Excel</button>
        <button onClick={handlePDF} className="px-4 py-2 bg-red-600 text-white rounded-lg">Export PDF</button>
        <CSVLink data={events} filename="events.csv" className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Export CSV
        </CSVLink>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1 rounded ${currentPage === n ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="block">Event ID</label>
                <input
                  type="text"
                  name="eventId"
                  value={form.eventId}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                  disabled={!!editingEvent}
                  required
                />
              </div>
              <div>
                <label className="block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block">Date & Time</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={form.datetime}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block">Organiser</label>
                <input
                  type="text"
                  name="organiser"
                  value={form.organiser}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">-- Select --</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block">Attendees (comma separated IDs)</label>
                <input
                  type="text"
                  name="attendeesText"
                  value={form.attendeesText}
                  onChange={onFormChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-lg">
                  {editingEvent ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
