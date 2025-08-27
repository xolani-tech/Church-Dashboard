import React from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ActivityTable from '../components/ActivityTable';
import { FaCalendarAlt, FaDonate } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<FaCalendarAlt className="w-8 h-8" />}
            title="Upcoming Events"
            value="12"
          />
          <StatsCard
            icon={<FaDonate className="w-8 h-8" />}
            title="Total Donations"
            value="R5,420"
          />
           <StatsCard
            icon={<FaDonate className="w-8 h-8" />}
            title="Total Members"
            value="1,250"
          />
           <StatsCard
            icon={<FaDonate className="w-8 h-8" />}
            title="New Members"
            value="50"
          />
        </div>
        <div className="mt-6">
          <ActivityTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
