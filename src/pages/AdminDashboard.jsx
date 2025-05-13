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
  phone: z.string().min(10, 'Phone is required'),
  aadhaar: z.string().min(12, 'Aadhaar is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, blocked: 0 });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      return;
    }
    fetchUsers();
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
    } catch (error) {
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
      toast.success(`User ${action}ed`);
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const onSubmit = async (data) => {
    setCreating(true);
    try {
      await axios.post('https://aspirecareerconsultancy.store/api/auth/register', data, { headers });
      toast.success('User created');
      reset();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const navigateToRegisterRequests = () => {
    navigate('register-requests');
  };

  const navigateToContactMessages = () => {
    navigate('contact-messages');
  };

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
            <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Manage all users here.</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={navigateToRegisterRequests}
                className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 transition"
              >
                View Register Requests
              </button>
              <button
                onClick={navigateToContactMessages}
                className="bg-purple-600 text-white px-5 py-3 rounded hover:bg-purple-700 transition"
              >
                View Contact Messages
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-1">Total Users</h2>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-1">Blocked Users</h2>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">{stats.blocked}</p>
              </div>
            </div>

            {/* Create New User Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow mb-10 space-y-6 max-w-2xl"
            >
              <h2 className="text-xl font-semibold">Create New User</h2>

              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                  {...register('name')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                  {...register('phone')}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Aadhaar"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                  {...register('aadhaar')}
                />
                {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar.message}</p>}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full p-3 pr-10 border rounded dark:bg-gray-700 dark:text-white"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              >
                {creating ? 'Creating...' : 'Create User'}
              </button>
            </form>

            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">
                  <p className="text-xl font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                  <p className="text-sm">
                    Status:{' '}
                    <span className={user.isBlocked ? 'text-red-500' : 'text-green-500'}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUserAction(user._id, user.isBlocked ? 'unblock' : 'block')}
                      className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => handleUserAction(user._id, 'delete')}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-gray-500 dark:text-gray-300 col-span-3">No users found.</p>
              )}
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
