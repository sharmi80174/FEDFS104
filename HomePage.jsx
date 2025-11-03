import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center bg-pink-500 px-6 py-4 text-white shadow-md">
        <div className="flex items-center">
          <img
            src="kllogo.jpeg"
            alt="KL Logo"
            className="w-16 h-16 object-contain mr-3 rounded-full bg-white"
          />
          <h1 className="text-2xl font-bold">
            Product Management System
          </h1>
        </div>
        <div className="flex gap-6 text-lg">
          <Link to="/signin" className="hover:text-gray-200 transition">
            Sign In
          </Link>
          <Link to="/signup" className="hover:text-gray-200 transition">
            Sign Up
          </Link>
          <Link to="/aboutus" className="hover:text-gray-200 transition">
            About Us
          </Link>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Product Management System
        </h2>
        <p className="text-gray-700 text-lg mb-2">
          Manage your products, users, and orders with ease.
        </p>
        <p className="text-gray-600 text-base mb-6">
          Sign up as an <span className="font-semibold">Admin</span> or{" "}
          <span className="font-semibold">User</span> to get started.
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            to="/signup"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Get Started
          </Link>
          <Link
            to="/aboutus"
            className="border border-pink-500 text-pink-500 px-6 py-2 rounded-lg hover:bg-pink-50 transition"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-pink-500 text-white text-center py-3">
        © {new Date().getFullYear()} Product Management System | All Rights Reserved
      </footer>
    </div>
  );
};

export default HomePage;
