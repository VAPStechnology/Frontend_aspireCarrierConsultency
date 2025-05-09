import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Dashboard() {
  const [forms, setForms] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const token = user?.accessToken;
  const location = useLocation();

  // Fetch data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId || !token) {
        toast.error("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

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

  // Submit form handler

  const handleSubmitForm = async (formId) => {
    // console.log("Submitting form with ID:", formId);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.patch(`https://aspirecareerconsultancy.store/api/user/forms/${formId}/submit`, {}, { headers });

      toast.success("Form submitted successfully!");

      // Update forms list
      setForms((prev) =>
        prev.map((f) =>
          f._id === formId ? { ...f, submitted: true } : f
        )
      );

      // Optionally update stats
      setStats((prev) => ({
        ...prev,
        submitted: (prev.submitted || 0) + 1,
        pending: (prev.pending || 1) - 1,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed!! Sign Agreement to Submit !!!.");
    }
  };

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Sidebar / Mobile Menu can go here */}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto transition-all duration-300 ease-in-out">
        {location.pathname === "/dashboard" ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Here you can manage your documents and view your stats.
            </p>

            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                    <p className="text-lg font-medium">Form #{form.data.formNumber || '700'}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Full Name: {form.data.name}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {form.data.phoneNumber}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Email: {form.data.email}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">DOB: {form.data.dateOfBirth}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Address: {form.data.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted: {form.submitted ? 'Yes' : 'No'}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Created on: {new Date(form.createdAt).toLocaleDateString()}
                    </p>

                    {/* Submit Button */}
                    {!form.submitted && (
                      <button
                        onClick={() => handleSubmitForm(form._id)}
                        className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Submit Form
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
