import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            required
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
        >
          Login
        </button>
        
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Register here
            </Link>
          </p>
          <p className="text-gray-600">
            Or{" "}
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Go to Home Page
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
