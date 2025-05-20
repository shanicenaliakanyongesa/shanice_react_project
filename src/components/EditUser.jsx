import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://sokotrial.pythonanywhere.com/api/admin/users `);
        const allUsers = response.data;
        const selectedUser = allUsers.find(u => u.user_id === parseInt(user_id));

        if (selectedUser) {
          setUsername(selectedUser.username);
          setEmail(selectedUser.email);
          setPhone(selectedUser.phone || "");
          setUser(selectedUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
  
    try {
      const userIdInt = parseInt(user_id, 10); // Ensure user_id is an integer
  
      await axios.post(
        `https://sokotrial.pythonanywhere.com/api/admin/user/${userIdInt}`,
        {
          username,
          email,
          phone
        }
      );
  
      setSuccess("User updated successfully!");
      setTimeout(() => {
        navigate("/admin/users");
      }, 1500);
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error("Update Error:", err);
    }
  };
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/admin/users")}>
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="text-center mb-4">Edit User</h3>

            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-dark w-100 mt-3">
                Update User
              </button>
            </form>

            <div className="mt-3 text-center">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => navigate("/admin/users")}
              >
                ← Back to Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;