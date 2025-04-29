import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="btn btn-primary px-6 py-3 border-gray-600 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-200"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
