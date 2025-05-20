import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://sokotrial.pythonanywhere.com/api/admin/users "
      );
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to load user data.");
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `https://sokotrial.pythonanywhere.com/api/admin/user/ ${userId}`
      );
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Could not delete user. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="mt-2">Fetching user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-secondary" onClick={fetchUsers}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <Link to="/admin/users/add" className="btn btn-success">
          Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td>
                  <Link
                    to={`/admin/users/edit/${user.user_id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;