import React from 'react';

const StatsCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-brand-gold bg-opacity-10 text-brand-gold">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
