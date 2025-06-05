import React, { useState } from 'react';
import { FaPaperPlane, FaFlag } from 'react-icons/fa';

const initialMessages = [
  {
    id: 1,
    sender: 'Jane Doe',
    subject: 'Project Update',
    preview: 'Here’s the latest on the project timeline...',
    timestamp: '2025-05-24 10:30 AM',
    unread: true,
    priority: 'low',
  },
  {
    id: 2,
    sender: 'John Smith',
    subject: 'Meeting Tomorrow',
    preview: 'Can we schedule a quick sync at 9 AM?',
    timestamp: '2025-05-23 3:15 PM',
    unread: false,
    priority: 'low',
  },
  {
    id: 3,
    sender: 'Alice Johnson',
    subject: 'Feedback Requested',
    preview: 'Please review the attached document...',
    timestamp: '2025-05-22 11:00 AM',
    unread: true,
    priority: 'high',
  },
];

const Inbox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    body: '',
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      subject: newMessage.subject,
      preview: newMessage.body.slice(0, 50) + '...',
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
      unread: false,
      priority: 'low',
    };
    setMessages([newMsg, ...messages]);
    setNewMessage({ recipient: '', subject: '', body: '' });
  };

  const handleMarkAsRead = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, unread: !msg.unread } : msg
      )
    );
  };

  const handleTogglePriority = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id
          ? { ...msg, priority: msg.priority === 'high' ? 'low' : 'high' }
          : msg
      )
    );
  };

  return (
    <div className="min-h-screen p-4 lg:ml-64 bg-gray-100 dark:bg-gray-900 font-quickSand">
      <div className="max-w-4xl mx-auto">
        {/* Send Message Box */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Compose Message</h1>
          <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="mb-4">
              <label htmlFor="recipient" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                To
              </label>
              <input
                type="text"
                id="recipient"
                value={newMessage.recipient}
                onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Recipient name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Message subject"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Message
              </label>
              <textarea
                id="body"
                value={newMessage.body}
                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                rows="4"
                placeholder="Write your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              <FaPaperPlane className="mr-2" />
              Send
            </button>
          </form>
        </div>

        {/* Message List */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Inbox</h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {messages.length === 0 ? (
            <p className="p-4 text-gray-600 dark:text-gray-400">No messages found.</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                  message.unread ? 'font-bold bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                } hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-gray-800 dark:text-gray-200 font-semibold">
                        {message.sender}
                      </p>
                      {message.priority === 'high' && (
                        <FaFlag className="ml-2 text-red-500 dark:text-red-400" />
                      )}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{message.subject}</p>
                    <p className="text-gray-600 dark:text-gray-400 truncate">{message.preview}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{message.timestamp}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      {message.unread ? 'Mark as Read' : 'Mark as Unread'}
                    </button>
                    <button
                      onClick={() => handleTogglePriority(message.id)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                    >
                      {message.priority === 'high' ? 'Remove Priority' : 'Set Priority'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;