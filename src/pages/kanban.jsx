import React from 'react';
import { FaLock } from 'react-icons/fa';

const Kanban = () => {
  return (
    <div className="min-h-screen p-4 lg:ml-64 bg-gray-100 dark:bg-gray-900 font-quickSand flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <FaLock className="mx-auto text-4xl text-gray-500 dark:text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This page is restricted to administrators only. Please contact your system administrator for access.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default Kanban;