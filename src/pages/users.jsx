import React, { useState } from 'react';
import { users } from '../constants';
import { FaCheck, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const Users = () => {
  const loggedInUser = "Yaseer Majed"; // Simulated logged-in user
  const [userData, setUserData] = useState(
    users.map((user) => ({
      ...user,
      attendance: [], // Array of check-in timestamps
      leaveRequests: [], // Array of { date, reason, status }
    }))
  );
  const [leaveForm, setLeaveForm] = useState({ isOpen: false, date: '', reason: '' });
  const [viewAttendance, setViewAttendance] = useState(false);

  const handleCheckIn = () => {
    const userIndex = userData.findIndex((user) => user.name === loggedInUser);
    if (userIndex === -1) return;
    const newData = [...userData];
    newData[userIndex].attendance.push(
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    );
    setUserData(newData);
  };

  const openLeaveForm = () => {
    setLeaveForm({ isOpen: true, date: '', reason: '' });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const userIndex = userData.findIndex((user) => user.name === loggedInUser);
    if (userIndex === -1) return;
    const newData = [...userData];
    newData[userIndex].leaveRequests.push({
      date: leaveForm.date,
      reason: leaveForm.reason,
      status: 'Pending',
    });
    setUserData(newData);
    setLeaveForm({ isOpen: false, date: '', reason: '' });
  };

  const toggleAttendanceView = () => {
    setViewAttendance(!viewAttendance);
  };

  return (
    <div className="min-h-screen p-4 lg:ml-64 bg-gray-100 dark:bg-gray-900 font-quickSand">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Users</h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {userData.length === 0 ? (
            <p className="p-4 text-gray-600 dark:text-gray-400">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {userData.map((user, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${user.bgColor} dark:bg-gray-700 hover:bg-opacity-80 dark:hover:bg-gray-600`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold">{user.name}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{user.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{user.country}</p>
                    </div>
                  </div>
                  {user.name === loggedInUser && (
                    <>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <button
                          onClick={handleCheckIn}
                          className="flex items-center px-3 py-1 text-sm bg-violet-500 text-white rounded hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
                        >
                          <FaCheck className="mr-2" />
                          Check In
                        </button>
                        <button
                          onClick={openLeaveForm}
                          className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          <FaCalendarAlt className="mr-2" />
                          Request Leave
                        </button>
                        <button
                          onClick={toggleAttendanceView}
                          className="flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                        >
                          <FaHistory className="mr-2" />
                          View Attendance
                        </button>
                      </div>
                      {viewAttendance && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <h3 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Attendance Record</h3>
                          {user.attendance.length === 0 && user.leaveRequests.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400 text-sm">No records found.</p>
                          ) : (
                            <>
                              <div className="mb-4">
                                <p className="text-gray-800 dark:text-gray-200 font-medium">Check-Ins:</p>
                                {user.attendance.length === 0 ? (
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">No check-ins.</p>
                                ) : (
                                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm">
                                    {user.attendance.map((time, i) => (
                                      <li key={i}>{time}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div>
                                <p className="text-gray-800 dark:text-gray-200 font-medium">Leave Requests:</p>
                                {user.leaveRequests.length === 0 ? (
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">No leave requests.</p>
                                ) : (
                                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm">
                                    {user.leaveRequests.map((request, i) => (
                                      <li key={i}>
                                        {request.date}: {request.reason} ({request.status})
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Leave Request Modal */}
      {leaveForm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Request Leave</h2>
            <form onSubmit={handleLeaveSubmit}>
              <div className="mb-4">
                <label htmlFor="leaveDate" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="leaveDate"
                  value={leaveForm.date}
                  onChange={(e) => setLeaveForm({ ...leaveForm, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="reason" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows="4"
                  placeholder="Reason for leave..."
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLeaveForm({ isOpen: false, date: '', reason: '' })}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;