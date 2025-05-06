import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-pad-wrapper';
import { uploadToCloudinary } from '../utils/cloudinaryUploader.js';  // Import your Cloudinary upload function
import LegalPage from '../components/LegalPage.jsx';

function Agreement() {
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const navigate = useNavigate();
  const signaturePadRef = useRef();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aspirecareerconsultancy.store';
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const token = user?.accessToken;

  // === Fetch agreement if exists ===
  useEffect(() => {
    if (!userId || !token) {
      toast.error("Unauthorized. Please log in.");
      navigate('/login');
      return;
    }

    const fetchAgreement = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/agreement/get-agreements/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.data[0]?.signature) {
          setSignature(res.data.data[0].signature);
          setAlreadySubmitted(true);
          setSubmittedAt(res.data.data[0].signedAt);
        }
      } catch {
        console.log('No existing agreement found.');
      }
    };

    fetchAgreement();
  }, [userId, token, navigate, API_BASE_URL]);

  // === Submit Agreement ===
  const handleSubmit = async () => {
    if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
      toast.error('Please draw your signature');
      return;
    }

    const signatureData = signaturePadRef.current.toDataURL('image/png');
    setSignature(signatureData);

    // === Upload the signature to Cloudinary ===
    try {
      const uploadedSignatureUrl = await uploadToCloudinary(signatureData, (progress) => {
        console.log(`Upload progress: ${progress}%`);
      });

      if (!uploadedSignatureUrl) return;

      // The agreement text you want to send
      const agreementText = `Please sign to confirm you accept the terms and conditions of Aspire Career Consultancy.`;

      const agreementData = {
        signature: uploadedSignatureUrl, // Cloudinary URL of the signature
        agreementText: agreementText, 
        agreementId: "your-agreement-id", // Optional: if agreement ID is needed
      };

      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/api/agreement/submit-agreement`,
        agreementData, // Send both signature and agreement text here
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Agreement submitted!');
      setAlreadySubmitted(true);
      setSubmittedAt(new Date().toISOString());

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    signaturePadRef.current.clear();
    setSignature('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">User Agreement</h2>
        <div><LegalPage/></div>

        <p className="text-gray-600">
          Please sign below to confirm you accept the terms and conditions of Aspire Career Consultancy.
        </p>

        {alreadySubmitted ? (
          <div className="text-green-600 font-medium">
            ✅ Already submitted on {new Date(submittedAt).toLocaleString()}
            <div className="mt-4">
              <img src={signature} alt="Submitted Signature" className="w-44 border rounded" />
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Draw Your Signature</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <SignaturePad
                  ref={signaturePadRef}
                  options={{
                    minWidth: 2,
                    maxWidth: 5,
                    backgroundColor: 'white',
                    penColor: 'black',
                  }}
                  canvasProps={{
                    width: 400,
                    height: 150,
                    className: 'sigCanvas bg-white',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Clear
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Agreement'}
            </button>
          </>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full mt-4 border border-teal-500 text-teal-600 hover:bg-teal-50 rounded-lg py-2 font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Agreement;
