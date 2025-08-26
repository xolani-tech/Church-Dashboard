import React from 'react';

const ActivityTable = () => {
  const activities = [
    { type: 'Donation', details: 'John Smith donated $250', date: '2 hours ago', tagColor: 'bg-brand-gold' },
    { type: 'Event', details: 'New event "Sunday Service" added', date: 'Yesterday', tagColor: 'bg-blue-500' },
    { type: 'Member', details: 'Jane Doe joined the community', date: '3 days ago', tagColor: 'bg-green-500' },
    { type: 'Prayer', details: 'New prayer request submitted', date: '4 days ago', tagColor: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-brand-gold hover:text-opacity-80 font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 ${activity.tagColor} bg-opacity-10 text-${activity.tagColor.replace('bg-','')} rounded-full text-xs font-semibold`}
                  >
                    {activity.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{activity.details}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
