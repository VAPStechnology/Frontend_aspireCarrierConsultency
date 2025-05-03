import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth"; // Import useAuth correctly
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod"; // Import zod

// Define the validation schema using zod
const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from useAuth hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" }); // State for validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form using the zod schema
    try {
      loginSchema.parse({ email, password }); // Will throw an error if validation fails
      setErrors({ email: "", password: "" }); // Clear previous errors

      const success = await login(email, password); // login() returns boolean

      if (success) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("Stored user:", storedUser);

        if (storedUser?.isAdmin) {
          navigate("/admin/dashboard"); // Admin dashboard if user is admin
          toast.success("Logged in as admin");
        } else {
          navigate("/dashboard"); // Regular user dashboard
          // toast.success("Logged in successfully");
        }
      } else {
        // toast.error("Invalid Credentials, please try again.");
      }
    } catch (err) {
      // Handle zod validation errors
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce((acc, { path, message }) => {
          acc[path[0]] = message; // Map the field name to the error message
          return acc;
        }, {});
        setErrors(newErrors); // Set errors state
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 text-black border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition`}
            required
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-8 relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full text-black px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition pr-12`}
            required
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[42px] text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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
