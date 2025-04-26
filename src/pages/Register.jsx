import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

// Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  aadhaarFile: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, "File must be less than 5MB"),
  signatureFile: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, "File must be less than 5MB")
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data using Zod
    const validation = registerSchema.safeParse({
      name,
      email,
      phone,
      password,
      aadhaarFile,
      signatureFile
    });

    if (!validation.success) {
      validation.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("aadhaarFile", aadhaarFile);
      formData.append("signatureFile", signatureFile);

      await register(formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-8 rounded-lg">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
          <div className="form-control mb-4">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Upload Aadhaar</label>
            <input
              type="file"
              onChange={(e) => setAadhaarFile(e.target.files[0])}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Upload Signature</label>
            <input
              type="file"
              onChange={(e) => setSignatureFile(e.target.files[0])}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
