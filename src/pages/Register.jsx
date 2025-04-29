import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { uploadToCloudinary } from "../utils/cloudinaryUploader";
import { handleUniqueFileSelection } from "../utils/fileHandler";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  aadhaarFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Aadhaar must be < 150KB"),
  signatureFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Signature must be < 150KB"),
  photoFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Photo must be < 150KB"),
});

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [aadhaarUrl, setAadhaarUrl] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [aadhaarProgress, setAadhaarProgress] = useState(0);
  const [signatureProgress, setSignatureProgress] = useState(0);
  const [photoProgress, setPhotoProgress] = useState(0);

  useEffect(() => {
    if (aadhaarUrl) setAadhaarFile(null);
    if (signatureUrl) setSignatureFile(null);
    if (photoUrl) setPhotoFile(null);
  }, [aadhaarUrl, signatureUrl, photoUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = registerSchema.safeParse({
      name,
      email,
      phone,
      password,
      aadhaarFile,
      signatureFile,
      photoFile,
    });

    if (!validation.success) {
      validation.error.errors.forEach((error) => toast.error(error.message));
      return;
    }

    try {
      toast.loading("Uploading files...");

      const uploadPromises = [];
      if (!aadhaarUrl && aadhaarFile) {
        uploadPromises.push(uploadToCloudinary(aadhaarFile, setAadhaarProgress).then((url) => setAadhaarUrl(url)));
      }
      if (!signatureUrl && signatureFile) {
        uploadPromises.push(uploadToCloudinary(signatureFile, setSignatureProgress).then((url) => setSignatureUrl(url)));
      }
      if (!photoUrl && photoFile) {
        uploadPromises.push(uploadToCloudinary(photoFile, setPhotoProgress).then((url) => setPhotoUrl(url)));
      }

      const uploadedUrls = await Promise.all(uploadPromises);
      toast.dismiss();

      const payload = {
        name,
        email,
        phone,
        password,
        aadhaarUrl: aadhaarUrl || uploadedUrls[0],
        signatureUrl: signatureUrl || uploadedUrls[1],
        photoUrl: photoUrl || uploadedUrls[2],
      };

      await register(payload);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Registration failed");
    }
  };

  const renderProgress = (label, percent) => (
    <div className="mt-2">
      <div className="text-sm font-medium text-gray-600">{label}: {percent}%</div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        {/* Basic Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Upload Inputs */}
        <div className="space-y-4">
          {[
            { label: "Aadhaar", file: aadhaarFile, url: aadhaarUrl, setter: setAadhaarFile, progress: aadhaarProgress },
            { label: "Signature", file: signatureFile, url: signatureUrl, setter: setSignatureFile, progress: signatureProgress },
            { label: "Photo", file: photoFile, url: photoUrl, setter: setPhotoFile, progress: photoProgress },
          ].map(({ label, file, url, setter, progress }) => (
            <div key={label}>
              <label className="text-sm font-medium text-gray-700">{`Upload ${label} (max 150KB)`}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUniqueFileSelection(e.target.files[0], file, setter, label)}
                disabled={!!url}
                className="file-input file-input-bordered w-full mt-1"
                required={!url}
              />
              {progress > 0 && renderProgress(`${label} Upload`, progress)}
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Register
        </button>

        {/* Login and Home Redirects */}
        <div className="text-center text-sm text-gray-600 space-y-1">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 font-semibold hover:underline">
              Login here
            </Link>
          </p>
          <p>
            Or{" "}
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              Go to Home Page
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
