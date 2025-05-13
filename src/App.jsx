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

// New Admin Feature Pages
import RegisterRequests from "./pages/RegisterRequests";
import ContactMessages from "./pages/ContactMessages";

function App() {
  const { user } = useAuth();

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
        <Route path="/register-alert" element={<UserRegisterAlert />} />

        {/* Protected User Routes */}
        <Route
          path="dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/agreement"
          element={user ? <Agreement /> : <Navigate to="/login" />}
        />
        <Route
          path="dashboard/submit-700-forms"
          element={user ? <Submit700Forms /> : <Navigate to="/login" />}
        />

        {/* Protected Admin Routes */}
        <Route
          path="admin/dashboard"
          element={user?.isAdmin === true ? <AdminDashboard /> : <Navigate to="/login" />}
        >
          {/* Nested Routes under AdminDashboard */}
          <Route path="register-requests" element={<RegisterRequests />} />
          <Route path="contact-messages" element={<ContactMessages />} />
        </Route>
      </Route>

      {/* Fallback Routes */}
      <Route path="/register-alert" element={UserRegisterAlert} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
