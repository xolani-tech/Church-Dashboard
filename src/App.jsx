import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
