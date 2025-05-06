import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function UserRegisterAlert() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-lg rounded-xl p-8 text-center space-y-6">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />

        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          🎉 Congratulations!
        </h2>

        <p className="text-base text-base-content">
          Your data has been sent to the admin for <span className="font-semibold">registration and verification</span>.
          If your information is valid, you'll receive <span className="font-medium text-teal-600 dark:text-teal-400">email and password </span> on your email shortly.
        </p>

        <div className="mt-6 space-y-2">
          <Link
            to="/"
            className="btn btn-outline btn-primary w-full"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="btn btn-primary w-full"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegisterAlert;
