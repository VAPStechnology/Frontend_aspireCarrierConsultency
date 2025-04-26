import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

function Home() {
  return (
    <>
    <Navbar />
    <div className="hero min-h-screen bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white">

      <div className="hero-content text-center">
        <div>
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to Our Registration Portal
          </h1>
          <p className="mb-8">
            Easily register and track your document progress, all in one place.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/login" className="btn btn-outline btn-light px-6 py-3 text-lg font-semibold hover:bg-white hover:text-black">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-light px-6 py-3 text-lg font-semibold hover:bg-white hover:text-black">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
