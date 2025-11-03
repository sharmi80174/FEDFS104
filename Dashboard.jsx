import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  // ✅ Redirect to login if no user session found
  useEffect(() => {
    if (!user) {
      alert("⚠️ Please log in to access the dashboard.");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center bg-pink-500 p-4 text-white shadow-md">
        <h1 className="text-2xl font-bold">Product Management System</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/logout")}
            className="hover:underline"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Dashboard Content */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {user?.username || "User"} 👋
        </h2>
        <p className="mb-8 text-gray-600">
          Manage products, users, and view analytics from your dashboard.
        </p>

        {/* ✅ Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 hover:shadow-xl transition"
            onClick={() => navigate("/manage-products")}
          >
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Manage Products
            </h3>
            <p className="text-gray-600">Add, edit, and delete product listings.</p>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 hover:shadow-xl transition"
            onClick={() => navigate("/usermanagement")}
          >
            <h3 className="text-xl font-semibold text-green-500 mb-2">
              User Management
            </h3>
            <p className="text-gray-600">Manage user accounts and permissions.</p>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 hover:shadow-xl transition"
            onClick={() => navigate("/analytics")}
          >
            <h3 className="text-xl font-semibold text-purple-500 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600">View system reports and insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
