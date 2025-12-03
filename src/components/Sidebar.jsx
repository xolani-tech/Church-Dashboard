import React from 'react';
import logo from '../../src/assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaHome, FaUser, FaUserPlus, FaUsers, FaBuilding, FaCalendarAlt, FaDonate, FaPray, FaCog 
} from 'react-icons/fa';

// Map your routes to labels
const navItems = [
  { icon: FaHome, label: 'Home', path: '/dashboard' },
  { icon: FaUser, label: 'My Profile', path: '/profile' },
  { icon: FaUserPlus, label: 'Add New Admin', path: '/add-admin' },
  { icon: FaUsers, label: 'Member Management', path: '/members' },
  { icon: FaBuilding, label: 'Departments', path: '/departments' },
  { icon: FaCalendarAlt, label: 'Events Calendar', path: '/events' },
  { icon: FaDonate, label: 'Giving', path: '/giving' },
  { icon: FaPray, label: 'Prayer', path: '/prayer' },
  { icon: FaCog, label: 'Manage Website', path: '/manage-website' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-brand-gold text-white p-4 shadow-lg flex flex-col">
      <div className="flex items-center mb-8">
        <img src={logo} alt="Church Logo" className="h-10 w-10 mr-2"/>
        <h1 className="text-2xl font-bold">Church Admin</h1>
      </div>

      <hr className="border-b border-white/50 my-4" />

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }` 
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
