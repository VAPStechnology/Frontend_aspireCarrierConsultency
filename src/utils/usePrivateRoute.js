import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth"; // Assuming useAuth hook is in the same directory

// Custom hook for private routes with role validation
const usePrivateRoute = (role, redirectTo = "/login") => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    // If no user is authenticated, redirect to the specified page (default: login)
    navigate(redirectTo);
    return { shouldRedirect: true, path: redirectTo };
  }

  // If the user has a role and it's different from the required role, redirect them
  if (role && user.role !== role) {
    navigate("/login");
    return { shouldRedirect: true, path: "/login" };
  }

  // If everything is okay (user is authenticated and has the right role)
  return { shouldRedirect: false };
};

export default usePrivateRoute;
