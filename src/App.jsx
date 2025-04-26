import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Agreement from "./pages/Agreement";
import Submit700Forms from "./pages/Submit700Forms";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/dashboard"
        element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/agreement"
        element={user ? <Agreement /> : <Navigate to="/login" />}
      />
      <Route
        path="/submit-700-forms"
        element={user ? <Submit700Forms /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
