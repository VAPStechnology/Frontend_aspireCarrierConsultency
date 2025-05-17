/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const admin = JSON.parse(localStorage.getItem('user'));
    const token = admin?.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        if (!token) {
            toast.error('Unauthorized access');
            navigate('/admin/login');
            return;
        }

        fetchForms();
        fetchStats();
    }, [id]);

    const fetchForms = async () => {
        try {
            const res = await axios.get(`https://aspirecareerconsultancy.store/api/admin/forms/${id}`, { headers });
            setForms(res.data?.data || []);
        } catch (err) {
            toast.error('Failed to fetch forms');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`https://aspirecareerconsultancy.store/api/admin/forms/stats/${id}`, { headers });
            setStats(res.data?.data || {});
        } catch (err) {
            toast.error('Failed to fetch stats');
        }
    };

    const handleDelete = async (formId) => {
        try {
            await axios.delete(`https://aspirecareerconsultancy.store/api/admin/forms/${formId}/delete`, { headers });
            toast.success('Form deleted');
            fetchForms();
            fetchStats(); // ✅ Refresh stats after deletion
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
                ← Back to Users
            </button>

            <h2 className="text-2xl font-bold">Forms of User ID: {id}</h2>

            {stats && (
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="bg-gray-100 p-3 rounded shadow">Total Forms: 700</div>
                    <div className="bg-green-100 p-3 rounded shadow">Submitted: {stats.submitted}</div>
                    <div className="bg-yellow-100 p-3 rounded shadow">Pending: {stats.pending}</div>
                </div>
            )}

            {loading ? (
                <p>Loading forms...</p>
            ) : forms.length === 0 ? (
                <p>No forms available.</p>
            ) : (
                <div className="space-y-4">
                    {forms.map((form) => (
                        <div key={form._id} className="border p-4 rounded shadow-sm bg-white">
                            <h3 className="text-lg font-semibold">{form.data.formNumber}</h3>
                            <h4 className="text-lg font-semibold">
                                Status:{' '}
                                {form.submitted === true ? (
                                    <span className="text-green-600">Submitted</span>
                                ) : (
                                    <span className="text-yellow-600">Pending</span>
                                )}
                            </h4>

                            <p><strong>Name:</strong> {form.data.name}</p>
                            <p><strong>Email:</strong> {form.data.email}</p>
                            <p><strong>Phone:</strong> {form.data.phoneNumber}</p>
                            <p><strong>Address:</strong> {form.data.address}</p>
                            <p><strong>Date of Birth:</strong> {form.data.dateOfBirth}</p>
                            <p><strong>Created At:</strong> {new Date(form.createdAt).toLocaleDateString()}</p>

                            <div className="flex gap-4 mt-3">
                                {/* Uncomment and customize when update is needed
                                <button
                                    onClick={() => handleUpdate(form._id, { title: 'Updated Title' })}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                                */}
                                <button
                                    onClick={() => handleDelete(form._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserForm;
