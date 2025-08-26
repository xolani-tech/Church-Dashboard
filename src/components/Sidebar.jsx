import React from 'react';
import logo from '../../src/assets/logo.png'
import { 
  FaHome, FaUser, FaUserPlus, FaUsers, FaBuilding, FaCalendarAlt, FaDonate, FaPray, FaCog 
} from 'react-icons/fa';

const navItems = [
  { icon: FaHome, label: 'Home', active: true },
  { icon: FaUser, label: 'My Profile' },
  { icon: FaUserPlus, label: 'Add New Admin' },
  { icon: FaUsers, label: 'Member Management' },
  { icon: FaBuilding, label: 'Departments' },
  { icon: FaCalendarAlt, label: 'Events Calendar' },
  { icon: FaDonate, label: 'Giving' },
  { icon: FaPray, label: 'Prayer Request' },
  { icon: FaCog, label: 'Manage Website' },
];

const NavLink = ({ icon: Icon, label, active }) => (
  <li>
    <a
      href="#"
      className={`flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-white bg-opacity-20 text-white'
          : 'text-white hover:bg-white hover:bg-opacity-10'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </a>
  </li>
);

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
          {navItems.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
