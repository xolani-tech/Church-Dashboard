import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          New Jerusalem of All Nations
        </h2>
        <button
          id="logout"
          className="bg-brand-gold text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center transition-colors duration-200"
        >
          <FaSignOutAlt className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
