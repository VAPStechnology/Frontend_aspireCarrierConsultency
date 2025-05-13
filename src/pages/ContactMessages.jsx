/* eslint-disable no-unused-vars */
// pages/admin/ContactMessages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem('user'));
  const token = admin?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('https://aspirecareerconsultancy.store/api/admin/contact-messages', { headers });
      setMessages(res.data?.data || []);
    } catch (err) {
      toast.error('Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`https://aspirecareerconsultancy.store/api/admin/contact-messages/${id}/delete`, { headers });
      toast.success('Message deleted');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Contact Messages</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Back to Dashboard
          </button>
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow"
              >
                <p><span className="font-semibold">Name:</span> {msg.name}</p>
                <p><span className="font-semibold">Email:</span> {msg.email}</p>
                <p><span className="font-semibold">Message:</span> {msg.message}</p>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMessages;
