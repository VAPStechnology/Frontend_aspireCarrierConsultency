import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
  const [forms, setForms] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const token = user?.accessToken;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId || !token) {
        toast.error("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [formsRes, statsRes] = await Promise.all([
          axios.get(`https://aspirecareerconsultancy.store/api/user/forms/${userId}`, { headers }),
          axios.get(`https://aspirecareerconsultancy.store/api/user/my-forms/stats/${userId}`, { headers }),
        ]);

        setForms(formsRes.data?.data || []);
        setStats(statsRes.data?.data || {});
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Dashboard</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Here you can manage your documents and view your stats.
      </p>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Total Submitted Forms</h2>
            <p className="text-2xl text-teal-600 dark:text-teal-400">{stats.submitted || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Pending Forms</h2>
            <p className="text-2xl text-green-600 dark:text-green-400">{stats.pending || 0}</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
      {forms.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You have not submitted any forms yet.</p>
      ) : (
        <ul className="space-y-4">
          {forms.map((form) => (
            <li key={form._id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg space-y-1">
              <p className="text-lg font-medium">Form #{form.formNumber || '700'}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Full Name: {form.data.fullName}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {form.data.phoneNumber}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">DOB: {form.data.dob}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Gender: {form.data.gender}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Address: {form.data.address}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Submitted: {form.submitted ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Created on: {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
