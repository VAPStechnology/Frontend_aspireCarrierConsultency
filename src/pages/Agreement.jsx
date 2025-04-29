import { useState } from 'react';
import { uploadToCloudinary } from '../utils/cloudinaryUploader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Agreement() {
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await uploadToCloudinary(file);
      setSignature(url);
      toast.success('Signature uploaded!');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!signature) return;
    // Submit agreement logic here
    toast.success("Agreement submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Submit Your Agreement</h2>
        <p className="text-gray-600 mb-6">
          Please upload your digital signature to confirm your agreement with the terms and conditions.
        </p>

        <label className="block mb-3 text-sm font-medium text-gray-700">Upload Signature</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
        />

        {signature && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <img src={signature} alt="Signature" className="border rounded-lg shadow-md w-40 h-auto" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!signature || loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Submit Agreement'}
        </button>

        {/* Go to Dashboard button */}
        <Link
          to="/dashboard"
          className="btn btn-soft btn-acent group gap-2 mt-6 w-full"
        >
          <span className="transition-all duration-300 group-hover:tracking-wider">Go to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}

export default Agreement;
