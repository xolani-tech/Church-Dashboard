import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Pencil, 
  Trash2, 
  ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';   // <-- your existing StatsCard

const membersData = [
  {
    id: 1,
    name: 'John Smith',
    initials: 'JS',
    initialsBg: 'bg-amber-100 text-amber-700',
    subtext: 'Baptized',
    email: 'john.smith@email.com',
    phone: '(555) 111-2222',
    status: 'active',
    since: 'Mar 15, 2020'
  },
  {
    id: 2,
    name: 'Mary Johnson',
    initials: 'MJ',
    initialsBg: 'bg-orange-100 text-orange-700',
    subtext: 'Baptized',
    email: 'mary.johnson@email.com',
    phone: '(555) 333-4444',
    status: 'active',
    since: 'Jun 22, 2019'
  },
  {
    id: 3,
    name: 'Robert Williams',
    initials: 'RW',
    initialsBg: 'bg-amber-100 text-amber-700',
    subtext: null,
    email: 'robert.w@email.com',
    phone: '(555) 555-6666',
    status: 'active',
    since: 'Jan 10, 2021'
  },
  {
    id: 4,
    name: 'Emily Brown',
    initials: 'EB',
    initialsBg: 'bg-amber-100 text-amber-700',
    subtext: null,
    email: 'emily.b@email.com',
    phone: null,
    status: 'visitor',
    since: '-'
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-emerald-100 text-emerald-700',
    visitor: 'bg-blue-100 text-blue-700',
    inactive: 'bg-gray-100 text-gray-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || styles.inactive}`}>
      {status}
    </span>
  );
};

const MembersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = membersData.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <Header />

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <StatsCard 
          title="Total Members"
          value={membersData.length}
          bg="bg-brand-gold"
        />
        <StatsCard 
          title="Active Members"
          value={membersData.filter(m => m.status === "active").length}
          bg="bg-green-600"
        />
        <StatsCard 
          title="Visitors"
          value={membersData.filter(m => m.status === "visitor").length}
          bg="bg-blue-600"
        />
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent shadow-sm"
            />
          </div>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold">
              <option>All Status</option>
              <option>Active</option>
              <option>Visitor</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-gold hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member Since</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member, index) => (
                <motion.tr 
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${member.initialsBg}`}>
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                        {member.subtext && (
                          <p className="text-xs text-blue-600 font-medium">{member.subtext}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {member.email}
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {member.phone}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <StatusBadge status={member.status} />
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-600">
                    {member.since}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{filteredMembers.length}</span> results
          </p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500" disabled>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MembersTable;
