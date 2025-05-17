/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  aadhaar: z.string().min(12, 'Aadhaar number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, blocked: 0 });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem('user'));
  const token = admin?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      aadhaar: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Unauthorized. Please log in.');
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://aspirecareerconsultancy.store/api/admin/users', { headers });
      const data = res.data?.data || [];
      setUsers(data);
      setStats({
        total: data.length,
        blocked: data.filter((u) => u.isBlocked).length,
      });
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (id, action) => {
    const url = `https://aspirecareerconsultancy.store/api/admin/users/${id}/${action}`;
    const method = action === 'delete' ? 'delete' : 'patch';

    try {
      await axios({ method, url, headers });
      toast.success(`User ${action}ed successfully`);
      fetchUsers();
    } catch {
      toast.error(`Failed to ${action} user`);
    }
  };

  const onSubmit = async (data) => {
    setCreating(true);
    try {
      await axios.post('https://aspirecareerconsultancy.store/api/auth/register', data, { headers });
      toast.success('User created successfully');
      reset();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const toggleLogs = (userId) => {
    setExpandedLogs((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const navigateToRegisterRequests = () => navigate('register-requests');
  const navigateToContactMessages = () => navigate('contact-messages');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="flex-1 p-6 md:p-10 overflow-y-auto transition-all duration-300 ease-in-out">
        {location.pathname === '/admin/dashboard' ? (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage users and view system stats</p>
            </header>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-8 sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-2">
              <button
                onClick={navigateToRegisterRequests}
                className="bg-green-600 text-white px-5 py-2.5 rounded hover:bg-green-700 transition"
              >
                View Register Requests
              </button>
              <button
                onClick={navigateToContactMessages}
                className="bg-purple-600 text-white px-5 py-2.5 rounded hover:bg-purple-700 transition"
              >
                View Contact Messages
              </button>
            </div>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold">Blocked Users</h2>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">{stats.blocked}</p>
              </div>
            </section>

            {/* Create New User */}
            <section className="mb-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow space-y-6 max-w-2xl"
              >
                <h2 className="text-xl font-semibold">Create New User</h2>

                <input
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input
                  type="text"
                  placeholder="Phone"
                  {...register('phone')}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                <input
                  type="text"
                  placeholder="Aadhaar"
                  {...register('aadhaar')}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar.message}</p>}

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password')}
                    className="w-full p-3 pr-10 border rounded dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </section>

            {/* Users List */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300 col-span-full">No users found.</p>
              ) : (
                users.map((user) => {
                  const logs = user.loginLogs || [];
                  const showAll = expandedLogs[user._id];
                  const visibleLogs = showAll ? logs : logs.slice(0, 4);
                  return (
                    <div
                      key={user._id}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:ring-2 hover:ring-blue-500 transition cursor-pointer flex flex-col justify-between"
                      onClick={() => navigate(`users/${user._id}/forms`)}
                    >
                      <div className="space-y-1">
                        <p className="text-xl font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                        <p className="text-sm">
                          Status:{' '}
                          <span className={user.isBlocked ? 'text-red-500' : 'text-green-500'}>
                            {user.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </p>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Login Logs:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            {visibleLogs.length > 0 ? (
                              visibleLogs.map((log, idx) => (
                                <li key={idx}>
                                  {new Date(log).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                  })}
                                </li>
                              ))
                            ) : (
                              <li>No login logs available.</li>
                            )}
                          </ul>
                          {logs.length > 4 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLogs(user._id);
                              }}
                              className="text-blue-600 hover:underline mt-1 text-sm"
                            >
                              {showAll ? 'Show Less' : 'View More'}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserAction(user._id, user.isBlocked ? 'unblock' : 'block');
                          }}
                          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                        >
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserAction(user._id, 'delete');
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
