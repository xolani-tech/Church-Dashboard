import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddAdmin from "./pages/AddAdmin";
import Members from "./pages/Members";
import Departments from "./pages/Departments";
import Events from "./pages/Events";
import Giving from "./pages/Giving";
import Prayer from "./pages/Prayer";
import ManageWebsite from "./pages/ManageWebsite";

// Layout wrapper with sidebar
const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard routes (default app behaviour) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/Profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/add-admin"
          element={
            <DashboardLayout>
              <AddAdmin />
            </DashboardLayout>
          }
        />
        <Route
          path="/members"
          element={
            <DashboardLayout>
              <Members />
            </DashboardLayout>
          }
        />
        <Route
          path="/departments"
          element={
            <DashboardLayout>
              <Departments />
            </DashboardLayout>
          }
        />
        <Route
          path="/events"
          element={
            <DashboardLayout>
              <Events />
            </DashboardLayout>
          }
        />
        <Route
          path="/giving"
          element={
            <DashboardLayout>
              <Giving />
            </DashboardLayout>
          }
        />
        <Route
          path="/prayer"
          element={
            <DashboardLayout>
              <Prayer />
            </DashboardLayout>
          }
        />
        <Route
          path="/manage-website"
          element={
            <DashboardLayout>
              <ManageWebsite />
            </DashboardLayout>
          }
        />

        {/* Redirect any unknown path to dashboard */}
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
