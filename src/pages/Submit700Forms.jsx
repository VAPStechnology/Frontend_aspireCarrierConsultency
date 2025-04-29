import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
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
  });

  const uploadForm = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${API}/api/v1/user/forms`,
        { data: formData },
        { withCredentials: true }
      );
      return data.form;
    },
    onSuccess: () => {
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
    },
    onError: () => toast.error('Failed to upload form'),
  });

  const { data: formStats, isLoading: statsLoading } = useQuery({
    queryKey: ['formStats'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/api/v1/user/my-forms/stats`, { withCredentials: true });
      return data.stats;
    },
    refetchInterval: 30000,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadForm.mutate();
  };

  const totalForms = formStats?.submitted + formStats?.notSubmitted + formStats?.filled || 1;
  const submittedPercentage = (formStats?.submitted / totalForms) * 100 || 0;
  const notSubmittedPercentage = (formStats?.notSubmitted / totalForms) * 100 || 0;
  const filledPercentage = (formStats?.filled / totalForms) * 100 || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-base-200 shadow-xl rounded-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-success">📄 Upload 700 Form</h2>
          <Link
            to="/dashboard"
            className="btn btn-outline outline-[#216b5e] text-gray-200 hover:border-[#598981] bg-[#4cb3a0] group gap-2"
          >
            <PieChart className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="transition-all duration-300 group-hover:tracking-wider">Go to Dashboard</span>
          </Link>

        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['name', 'Name', 'text'],
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
              <label className="label font-semibold text-gray-600">{label}</label>
              <input
                type={type}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          ))}

          <div className="form-control md:col-span-2">
            <label className="label font-semibold text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button
              type="submit"
              className="btn btn-info w-full"
              disabled={uploadForm.isPending}
            >
              {uploadForm.isPending ? (
                <span className="loading btn-success loading-spinner"></span>
              ) : (
                'Upload Form'
              )}
            </button>
          </div>
        </form>

        {/* Stats and Progress */}
        <div className="mt-10">
          {statsLoading ? (
            <div className="text-center text-gray-500">Loading form stats...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
                <div className="bg-green-100 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-green-600">Submitted</div>
                  <div className="text-3xl font-bold">{formStats?.submitted || 0}</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-yellow-600">Filled</div>
                  <div className="text-3xl font-bold">{formStats?.filled || 0}</div>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-semibold text-red-600">Not Submitted</div>
                  <div className="text-3xl font-bold">{formStats?.notSubmitted || 0}</div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Submitted Progress</label>
                  <progress className="progress progress-success w-full" value={submittedPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500">{submittedPercentage.toFixed(2)}%</div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">Filled Progress</label>
                  <progress className="progress progress-warning w-full" value={filledPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500">{filledPercentage.toFixed(2)}%</div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">Not Submitted Progress</label>
                  <progress className="progress progress-error w-full" value={notSubmittedPercentage} max="100" />
                  <div className="text-center text-sm text-gray-500">{notSubmittedPercentage.toFixed(2)}%</div>
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
