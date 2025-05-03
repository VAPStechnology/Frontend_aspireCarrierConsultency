import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Agreement from "./pages/Agreement";
import Submit700Forms from "./pages/Submit700Forms";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Layout from "./Layout";
import { useAuth } from "./hooks/useAuth.js";
import UserRegisterAlert from "./pages/UserRegisterAlert.jsx";

function App() {
  const { user } = useAuth();
  // console.log ("User in App:", user); // Check if user is correctly set
  // console.log ("User role in App:", user?.role); // Check if user role is correctly set
  // console.log ("User ID in App:", user?._id); // Check if user ID is correctly set
  // console.log ("User accessToken in App:", user?.accessToken); // Check if user accessToken is correctly set
  // console.log ("User refreshToken in App:", user?.refreshToken); // Check if user refreshToken is correctly set
  // console.log ("User isAdmin in App:", user?.isAdmin); // Check if user isAdmin is correctly set  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/register-alert" element={<UserRegisterAlert/>}/>

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={user ? <Dashboard/> : <Navigate to="/login" />}
        />
        <Route
          path="admin/dashboard"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="agreement"
          element={user ? <Agreement /> : <Navigate to="/login" />}
        />
        <Route
          path="submit-700-forms"
          element={user ? <Submit700Forms /> : <Navigate to="/login" />}
        />

      </Route>

      {/* Fallback Route */}
      <Route path="/register-alert" element={UserRegisterAlert}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
