import { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // ✅ Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // ✅ Delete user with confirmation
  const handleDelete = (id) => {
    const userToDelete = users.find((u) => u.id === id);
    if (
      window.confirm(
        `Are you sure you want to delete "${userToDelete?.username}"?`
      )
    ) {
      const updated = users.filter((u) => u.id !== id);
      localStorage.setItem("users", JSON.stringify(updated));
      setUsers(updated);
      alert("User deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">👤 User Management</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-lg font-semibold">ID</th>
              <th className="border p-3 text-lg font-semibold">Username</th>
              <th className="border p-3 text-lg font-semibold">Role</th>
              <th className="border p-3 text-lg font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">{u.id}</td>
                  <td className="border p-3">{u.username}</td>
                  <td className="border p-3 capitalize">{u.role}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-3 text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Message if no users */}
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Add users through registration or admin panel to see them here.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
