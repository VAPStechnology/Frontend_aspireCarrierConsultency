/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

function Submit700Forms() {
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    phoneNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    aadhaarNumber: '',
    panNumber: '',
    address: '',
    email: '',
    amount: '',
    dateOfBirth: '',
    formNumber: '',
  });

  const [formStats, setFormStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.accessToken;
  const userId = user?.id;

  const fetchFormStats = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${API}/api/user/my-forms/stats/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setFormStats(data?.data || {});
    } catch (error) {
      console.error('Failed to fetch form stats:', error);
      toast.error('Failed to fetch form stats');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchFormStats();
    const interval = setInterval(fetchFormStats, 30000); // Auto-refresh stats every 30s
    return () => clearInterval(interval);
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Unauthorized. Please log in again.');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        `${API}/api/user/forms`,
        { data: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success('Form uploaded successfully!');
      setFormData({
        name: '',
        accountNumber: '',
        phoneNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: '',
        aadhaarNumber: '',
        panNumber: '',
        address: '',
        email: '',
        amount: '',
        dateOfBirth: '',
      });

      fetchFormStats(); // Refresh stats after submission
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload form');
    } finally {
      setSubmitting(false);
    }
  };

  let totalFilled = formStats?.submitted + formStats?.pending || 0;
  const totalForms = 700;
  const submittedPercentage = ((formStats?.submitted || 0) / totalForms) * 100;
  const notSubmittedPercentage = ((formStats?.pending || 0) / totalForms) * 100;
  const filledPercentage = ((totalFilled || 0) / totalForms) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-success">📄 Upload 700 Form</h2>
          <Link
            to="/dashboard"
            className="btn btn-outline outline-[#216b5e] text-white hover:border-[#598981] bg-[#4cb3a0] group gap-2"
          >
            <PieChart className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="transition-all duration-300 group-hover:tracking-wider">Go to Dashboard</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['name', 'Name', 'text'],
            ['formNumber', 'Form Number', 'text'],
            ['accountNumber', 'Account Number', 'text'],
            ['phoneNumber', 'Phone Number', 'text'],
            ['bankName', 'Bank Name', 'text'],
            ['branchName', 'Branch Name', 'text'],
            ['ifscCode', 'IFSC Code', 'text'],
            ['aadhaarNumber', 'Aadhaar Number', 'text'],
            ['panNumber', 'PAN Number', 'text'],
            ['email', 'Email', 'email'],
            ['amount', 'Amount', 'number'],
            ['dateOfBirth', 'Date of Birth', 'date'],
          ].map(([key, label, type]) => (
            <div key={key} className="form-control">
              <label className="label font-semibold text-gray-700 dark:text-gray-300">{label}</label>
              <input
                type={type}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          ))}

          <div className="form-control md:col-span-2">
            <label className="label font-semibold text-gray-700 dark:text-gray-300">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button
              type="submit"
              className="btn btn-info w-full"
              disabled={submitting}
            >
              {submitting ? (
                <span className="loading btn-success loading-spinner"></span>
              ) : (
                'Upload Form'
              )}
            </button>
          </div>
        </form>

        {/* Stats and Progress */}
        <div className="mt-10">
          {loadingStats ? (
            <div className="text-center text-gray-500 dark:text-gray-400">Loading form stats...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
                <div className="bg-green-200 dark:bg-green-900 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-green-700 dark:text-green-300">Submitted</div>
                  <div className="text-3xl font-bold">{formStats?.submitted || 0}</div>
                </div>
                <div className="bg-yellow-200 dark:bg-yellow-900 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Filled</div>
                  <div className="text-3xl font-bold">{totalFilled || 0}</div>
                </div>
                <div className="bg-red-200 dark:bg-red-900 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-red-700 dark:text-red-300">Not Submitted</div>
                  <div className="text-3xl font-bold">{formStats?.pending || 0}</div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Submitted Progress</label>
                  <progress className="progress progress-success w-full" value={submittedPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">{submittedPercentage.toFixed(2)}%</div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Filled Progress</label>
                  <progress className="progress progress-warning w-full" value={filledPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">{filledPercentage.toFixed(2)}%</div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Not Submitted Progress</label>
                  <progress className="progress progress-error w-full" value={notSubmittedPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">{notSubmittedPercentage.toFixed(2)}%</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Submit700Forms;
