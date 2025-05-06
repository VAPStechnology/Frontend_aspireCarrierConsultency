/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { formData as allForms } from '../data/fakeIndianFormData';

const API = import.meta.env.VITE_API_BASE_URL;

function Submit700Forms() {
  const [formData, setFormData] = useState({});
  const [userInput, setUserInput] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formStats, setFormStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.accessToken;
  const userId = user?.id;

  // Set formData and userInput when currentIndex changes
  useEffect(() => {
    if (currentIndex !== null && currentIndex < allForms.length) {
      setFormData(allForms[currentIndex]);
      setUserInput(allForms[currentIndex]);
    }
  }, [currentIndex]);

  const fetchFormStats = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${API}/api/user/my-forms/stats/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const stats = data?.data || {};
      setFormStats(stats);

      // Set currentIndex to the number of submitted forms
      setCurrentIndex((stats.submitted + stats.pending) || 0);
    } catch (error) {
      console.error('Failed to fetch form stats:', error);
      toast.error('Failed to fetch form stats');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchFormStats();
    const interval = setInterval(fetchFormStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
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
        { data: userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success('Form uploaded successfully!');
      setCurrentIndex((prev) => prev + 1);
      fetchFormStats();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload form');
    } finally {
      setSubmitting(false);
    }
  };

  const totalForms = 700;
  const submitted = formStats?.submitted || 0;
  const pending = formStats?.pending || 0;
  const totalFilled = submitted + pending;
  const submittedPercentage = (submitted / totalForms) * 100;
  const notSubmittedPercentage = (pending / totalForms) * 100;
  const filledPercentage = (totalFilled / totalForms) * 100;

  if (loadingStats || currentIndex === null) {
    return (
      <div className="text-center text-gray-600 font-medium mt-10">
        Loading form data...
      </div>
    );
  }

  if (currentIndex >= allForms.length) {
    return (
      <div className="text-center text-xl text-green-600 font-bold mt-10">
        🎉 All 700 forms submitted successfully!
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Sticky Topbar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-4 shadow-md flex justify-between items-center px-4 rounded-t-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-success">📄 Upload 700 Form</h2>
        <Link
          to="/dashboard"
          className="btn btn-sm bg-[#4cb3a0] text-white hover:bg-[#3aa892] group gap-2"
        >
          <PieChart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-b-xl p-6 sm:p-8 mt-4">

        {/* Form Progress */}
        <div className="text-center mb-4 text-sm text-gray-500 dark:text-gray-400">
          Submitting form {currentIndex + 1} of {totalForms}
        </div>

        {/* Static Fake Form Preview */}
        <div className="bg-base-200 p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold  text-orange-500 mb-2"> Customer:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200">
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b py-1">
                <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
                value={userInput[key] || ''}
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
              value={userInput.address || ''}
              onChange={handleChange}
              className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button type="submit" className="btn btn-info w-full flex justify-center items-center gap-2" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="loading loading-spinner"></span> Uploading...
                </>
              ) : (
                'Upload Form'
              )}
            </button>
          </div>
        </form>

        {/* Stats Section */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
            <div className="bg-green-200 dark:bg-green-900 p-4 rounded-xl shadow-sm">
              <div className="text-lg font-semibold text-green-700 dark:text-green-300">Submitted</div>
              <div className="text-3xl font-bold">{submitted}</div>
            </div>
            <div className="bg-yellow-200 dark:bg-yellow-900 p-4 rounded-xl shadow-sm">
              <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Filled</div>
              <div className="text-3xl font-bold">{totalFilled}</div>
            </div>
            <div className="bg-red-200 dark:bg-red-900 p-4 rounded-xl shadow-sm">
              <div className="text-lg font-semibold text-red-700 dark:text-red-300">Not Submitted</div>
              <div className="text-3xl font-bold">{pending}</div>
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
        </div>
      </div>
    </div>
  );
}

export default Submit700Forms;
