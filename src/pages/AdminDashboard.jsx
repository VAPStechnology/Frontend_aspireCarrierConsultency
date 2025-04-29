import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const API = import.meta.env.VITE_API_BASE_URL;

// Zod schema
const userSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
});

function AdminDashboard() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  // Fetch users
  const fetchUsers = async () => {
    const { data } = await axios.get(`${API}/api/v1/admin/users`, {
      withCredentials: true,
    });
    return data.users;
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchUsers,
  });

  // Mutations
  const blockUser = useMutation({
    mutationFn: (id) =>
      axios.patch(`${API}/api/v1/admin/users/${id}/block`, {}, { withCredentials: true }),
    onSuccess: () => {
      toast.success('User blocked');
      queryClient.invalidateQueries(['adminUsers']);
    },
  });

  const unblockUser = useMutation({
    mutationFn: (id) =>
      axios.patch(`${API}/api/v1/admin/users/${id}/unblock`, {}, { withCredentials: true }),
    onSuccess: () => {
      toast.success('User unblocked');
      queryClient.invalidateQueries(['adminUsers']);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) =>
      axios.delete(`${API}/api/v1/admin/users/${id}/delete`, { withCredentials: true }),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries(['adminUsers']);
    },
  });

  const registerUser = useMutation({
    mutationFn: async (newUser) => {
      const { data } = await axios.post(`${API}/api/v1/auth/register`, newUser, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('User registered');
      queryClient.invalidateQueries(['adminUsers']);
      reset();
      setShowModal(false);
    },
    onError: () => toast.error('Failed to register user'),
  });

  const onSubmit = (values) => registerUser.mutate(values);

  // ✅ Loading spinner while fetching users
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🛠️ Admin Dashboard</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Register User
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-md border">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-3xl font-bold">{users?.length || 0}</p>
          </div>
        </div>
        <div className="card bg-red-100 border border-red-300 shadow">
          <div className="card-body">
            <h2 className="card-title">Blocked Users</h2>
            <p className="text-3xl font-bold text-red-600">
              {users?.filter((u) => u.isBlocked).length || 0}
            </p>
          </div>
        </div>
        <div className="card bg-green-100 border border-green-300 shadow">
          <div className="card-body">
            <h2 className="card-title">Active Users</h2>
            <p className="text-3xl font-bold text-green-700">
              {users?.filter((u) => !u.isBlocked).length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.email}</td>
                <td>
                  {user.isBlocked ? (
                    <span className="badge badge-error">Blocked</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td>
                  <span className="badge badge-neutral">{user.role}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  {user.isBlocked ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => unblockUser.mutate(user._id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => blockUser.mutate(user._id)}
                    >
                      Block
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteUser.mutate(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users?.length === 0 && (
          <div className="text-center mt-6 text-gray-500">No users found.</div>
        )}
      </div>

      {/* Modal for Register User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-circle absolute top-2 right-2"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Register New User</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <button className="btn btn-primary w-full" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
