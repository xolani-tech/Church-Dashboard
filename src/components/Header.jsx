import React from "react";
import { FaSignOutAlt, FaEye } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center p-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          New Jerusalem of All Nations
        </h2>

        {/* Buttons container */}
        <div className="flex items-center space-x-3">
          {/* View Site Button */}
          <button
            className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg 
                       flex items-center transition-all duration-200
                       hover:bg-gray-100 hover:border-gray-400"
          >
            <FaEye className="w-5 h-5 mr-2" />
            View site
          </button>

          {/* Logout Button */}
          <button
            className="bg-brand-gold text-white px-4 py-2 rounded-lg 
                       flex items-center transition-all duration-200
                       hover:bg-amber-600"
          >
            <FaSignOutAlt className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
