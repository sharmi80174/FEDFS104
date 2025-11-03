import { useState, useEffect } from "react";

const ViewAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    // ✅ Safely load data from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // ✅ Update analytics data
    setAnalytics({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        📊 Analytics Dashboard
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-lg font-semibold">Category</th>
              <th className="border p-3 text-lg font-semibold">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border p-3">Total Products</td>
              <td className="border p-3">{analytics.totalProducts}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border p-3">Total Users</td>
              <td className="border p-3">{analytics.totalUsers}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border p-3">Total Orders</td>
              <td className="border p-3">{analytics.totalOrders}</td>
            </tr>
          </tbody>
        </table>

        {/* ✅ Optional empty state message */}
        {analytics.totalProducts === 0 &&
          analytics.totalUsers === 0 &&
          analytics.totalOrders === 0 && (
            <p className="text-center text-gray-600 mt-4">
              No data available yet. Add products, users, or orders to see analytics.
            </p>
          )}
      </div>
    </div>
  );
};

export default ViewAnalytics;
