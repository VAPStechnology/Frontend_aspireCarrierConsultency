/* eslint-disable no-unused-vars */
// pages/admin/RegisterRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RegisterRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem('user'));
  const token = admin?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        'https://aspirecareerconsultancy.store/api/admin/user-register-requests',
        { headers }
      );
      setRequests(res.data?.data || []);
    } catch (err) {
      toast.error('Failed to fetch registration requests');
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(
        `https://aspirecareerconsultancy.store/api/admin/user-register-requests/${id}/delete`,
        { headers }
      );
      toast.success('Request deleted');
      fetchRequests();
    } catch (err) {
      toast.error('Failed to delete request');
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">User Registration Requests</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Back to Dashboard
          </button>
        </div>

        {requests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No registration requests found.</p>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="flex-1 space-y-2">
                  <p><span className="font-semibold">Name:</span> {req.name}</p>
                  <p><span className="font-semibold">Email:</span> {req.email}</p>
                  <p><span className="font-semibold">Phone:</span> {req.phone}</p>
                 

                  {req.aadhaar && (
                    <div>
                      <p className="font-semibold">Aadhar:</p>
                      <img
                        src={req.aadhaar}
                        alt="Aadhar"
                        className="w-48 max-h-56 object-contain rounded border"
                      />
                    </div>
                  )}

                  {req.signature && (
                    <div>
                      <p className="font-semibold">Signature:</p>
                      <img
                        src={req.signature}
                        alt="Signature"
                        className="w-40 max-h-40 object-contain rounded border"
                      />
                    </div>
                  )}

                  {req.photo && (
                    <div>
                      <p className="font-semibold">Photo:</p>
                      <img
                        src={req.photo}
                        alt="Photo"
                        className="w-24 h-24 rounded-full object-cover border"
                      />
                    </div>
                  )}
                  
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-2">
                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterRequests;
