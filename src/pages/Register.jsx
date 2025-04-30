/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { uploadToCloudinary } from "../utils/cloudinaryUploader";
import { handleUniqueFileSelection } from "../utils/fileHandler";

// Allowed domains for registration
const allowedDomains = ["gmail.com", "yahoo.com", "domain.com"];

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((value) => {
      const domain = value.split("@")[1];
      return allowedDomains.includes(domain);
    }, {
      message: `Email must be one of: ${allowedDomains.join(", ")}`,
    }),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  aadhaarFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Aadhaar must be < 150KB"),
  signatureFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Signature must be < 150KB"),
  photoFile: z.instanceof(File).refine((file) => file.size < 150 * 1024, "Photo must be < 150KB"),
});

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [name, setName] = useState("");
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

  const handleSendOtp = async () => {
    if (!email) return toast.error("Email is required");
    try {
      const res = await axios.post("/api/v1/auth/send-otp", { email });
      toast.success(res.data.message || "OTP sent to your email");
      setStep("otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("/api/v1/auth/verify-otp", { email, otp });
      toast.success(res.data.message || "Email verified!");
      setIsOtpVerified(true);
      setStep("register");
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    }
  };

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

      if (!aadhaarUrl && aadhaarFile)
        uploadPromises.push(uploadToCloudinary(aadhaarFile, setAadhaarProgress).then(setAadhaarUrl));
      if (!signatureUrl && signatureFile)
        uploadPromises.push(uploadToCloudinary(signatureFile, setSignatureProgress).then(setSignatureUrl));
      if (!photoUrl && photoFile)
        uploadPromises.push(uploadToCloudinary(photoFile, setPhotoProgress).then(setPhotoUrl));

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
    <div className="mt-1">
      <div className="text-xs text-gray-600">{label}: {percent}%</div>
      <div className="w-full bg-gray-200 rounded h-1">
        <div
          className="bg-teal-500 h-1 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        {step === "email" && (
          <>
            <h2 className="text-2xl text-green-400 font-bold text-center">Verify Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="input  input-bordered w-full mt-4"
            />
            <button onClick={handleSendOtp} className="btn btn-primary w-full mt-4">Send OTP</button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl text-green-400 font-bold text-center">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="input input-bordered w-full mt-4"
            />
            <button onClick={handleVerifyOtp} className="btn btn-primary w-full mt-4">Verify OTP</button>
            <p className="text-sm text-gray-600 text-center mt-2">
              Didn't get it?{" "}
              <button onClick={handleSendOtp} className="text-blue-600 font-semibold hover:underline">
                Resend OTP
              </button>
            </p>
          </>
        )}

        {step === "register" && (
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <h2 className="text-2xl font-bold text-center  text-gray-700">Create Account</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label dark:text-orange-600">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label dark:text-orange-600">Email</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label dark:text-orange-600">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label dark:text-orange-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {[{ label: "Aadhaar", file: aadhaarFile, url: aadhaarUrl, setter: setAadhaarFile, progress: aadhaarProgress },
              { label: "Signature", file: signatureFile, url: signatureUrl, setter: setSignatureFile, progress: signatureProgress },
              { label: "Photo", file: photoFile, url: photoUrl, setter: setPhotoFile, progress: photoProgress }
            ].map(({ label, file, url, setter, progress }) => (
              <div key={label}>
                <label className="label dark:text-orange-600">{`Upload ${label} (max 150KB)`}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUniqueFileSelection(e.target.files[0], file, setter, label)}
                  disabled={!!url}
                  className="file-input file-input-bordered w-full"
                  required={!url}
                />
                {url && <div className="text-xs text-green-600 mt-1">{label} Uploaded ✓</div>}
                {progress > 0 && renderProgress(`${label} Upload`, progress)}
              </div>
            ))}

            <button type="submit" className="btn btn-primary w-full mt-2">Register</button>

            <div className="text-center text-sm text-gray-600 mt-2 space-y-1">
              <p>
                Already registered?{" "}
                <Link to="/login" className="text-teal-700 font-semibold hover:underline">Login here</Link>
              </p>
              <p>
                Or{" "}
                <Link to="/" className="text-blue-600 font-semibold hover:underline">Return to Home</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
