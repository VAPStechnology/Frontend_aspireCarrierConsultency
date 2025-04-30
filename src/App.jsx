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
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth(); // Ensure useAuth returns a valid user object and role

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Protected Routes */}
        // Nested routes under Layout can be written here and will be protected

      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/agreement" element={<Agreement />} />
      <Route path="/submit-700-forms" element={<Submit700Forms />} />


      {/* Protected Routes */}
      <Route
        path="dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
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

      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
