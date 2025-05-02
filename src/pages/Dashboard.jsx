import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FiHome,
  FiGrid,
  FiFileText,
  FiSend,
  FiPhone,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

function Dashboard({ user }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchForms = async () => {
    const { data } = await axios.get(`${API}/api/v1/user/my-forms`, {
      withCredentials: true,
    });
    return data.forms;
  };

  const fetchStats = async () => {
    const { data } = await axios.get(`${API}/api/v1/user/my-forms/stats/me`, {
      withCredentials: true,
    });
    return data.stats;
  };

  const { data: forms, isLoading: formsLoading, isError: formsError } = useQuery({
    queryKey: ['userForms'],
    queryFn: fetchForms,
  });

  const { data: stats, isLoading: statsLoading, isError: statsError } = useQuery({
    queryKey: ['userStats'],
    queryFn: fetchStats,
  });

  const submitMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(`${API}/api/v1/user/forms/${id}/submit`, {}, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Form submitted");
      queryClient.invalidateQueries(['userForms']);
      queryClient.invalidateQueries(['userStats']);
    },
    onError: () => toast.error("Submission failed"),
  });

  const logout = async () => {
    await axios.post(`${API}/api/v1/user/logout`, {}, { withCredentials: true });
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center bg-base-200 p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-ghost btn-circle">
            <FiMenu size={20} />
          </button>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <button onClick={logout} className="btn btn-sm btn-outline text-red-500">
          Logout
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
         className={`bg-base-200 w-full md:w-64 p-4 flex-col border-r z-10 fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative`}
      
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost btn-circle">
            <FiX size={24} />
          </button>
        </div>
        <nav className="space-y-2">
          <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition">
            <FiHome size={18} /> <span className="font-medium">Home</span>
          </a>
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition">
            <FiGrid size={18} /> <span className="font-medium">Dashboard</span>
          </a>
          <a href="/agreement" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition">
            <FiFileText size={18} /> <span className="font-medium">Agreement</span>
          </a>
          <a href="/submit-700-forms" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition">
            <FiSend size={18} /> <span className="font-medium">Form Filling</span>
          </a>
          <a href="/contact" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition">
            <FiPhone size={18} /> <span className="font-medium">Contact</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-500 transition"
          >
            <FiLogOut size={18} /> <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Topbar */}
        <header className="hidden md:flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePic || '/default-avatar.png'}
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-semibold">{user?.name || 'User'}</span>
          </div>
          <button onClick={logout} className="btn btn-outline btn-sm text-red-500">
            Logout
          </button>
        </header>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">📄 User Dashboard</h2>

        {(formsLoading || statsLoading) && (
          <div className="flex justify-center items-center mt-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {(formsError || statsError) && (
          <div className="text-center text-red-500 mt-10">
            Error loading data. Please try again later.
          </div>
        )}

        {/* Stats Cards */}
        {!statsLoading && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="card bg-base-100 shadow-md border">
              <div className="card-body">
                <h2 className="card-title">Total Forms</h2>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
            </div>
            <div className="card bg-green-100 shadow-md border border-green-400">
              <div className="card-body">
                <h2 className="card-title">Submitted</h2>
                <p className="text-3xl font-bold text-green-700">{stats.submitted}</p>
              </div>
            </div>
            <div className="card bg-yellow-100 shadow-md border border-yellow-400">
              <div className="card-body">
                <h2 className="card-title">Pending</h2>
                <p className="text-3xl font-bold text-yellow-700">{stats.left}</p>
              </div>
            </div>
          </div>
        )}

        {/* Forms List */}
        {!formsLoading && forms && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, index) => {
              const isSubmitting = submitMutation.isLoading && submitMutation.variables === form._id;
              return (
                <div key={form._id} className="card bg-base-100 shadow-lg border">
                  <div className="card-body">
                    <h2 className="card-title">Form #{index + 1}</h2>
                    <p className="text-sm text-gray-500">ID: {form._id}</p>
                    <p>
                      Status:{' '}
                      {form.isSubmitted ? (
                        <span className="badge badge-success">Submitted</span>
                      ) : (
                        <span className="badge badge-warning">Pending</span>
                      )}
                    </p>
                    <p className="text-xs mt-1">
                      Last Updated: {new Date(form.updatedAt).toLocaleString()}
                    </p>
                    <div className="card-actions mt-4 justify-end flex-wrap gap-2">
                      <button
                        onClick={() => submitMutation.mutate(form._id)}
                        disabled={form.isSubmitted || isSubmitting}
                        className="btn btn-sm btn-primary"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                      <button className="btn btn-sm btn-outline btn-info">View</button>
                      <button className="btn btn-sm btn-outline btn-secondary">Update</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!formsLoading && forms?.length === 0 && (
          <div className="mt-6 text-center text-gray-500">No forms found.</div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
