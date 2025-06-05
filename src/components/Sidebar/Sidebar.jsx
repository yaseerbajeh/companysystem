import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../constants';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <nav className="mt-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              <link.icon className="w-5 h-5 mr-2" />
              <span>{link.text}</span>
              {link.badge && (
                <span
                  className={`ml-auto text-xs px-2 py-1 rounded ${link.badge.color} ${link.badge.darkColor}`}
                >
                  {link.badge.text}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;