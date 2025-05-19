import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // Redirect to sign-in if not logged in
      navigate("/signin");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-3 p-4 text-center">
            <h2 className="mb-4">Your Profile</h2>

            {/* User Info */}
            {user ? (
              <>
                <div className="mb-4">
                  <i className="fas fa-user-circle text-secondary" style={{ fontSize: "60px" }}></i>
                  <h4 className="mt-3">{user.username}</h4>
                  <p className="text-muted mb-1">{user.email}</p>
                </div>

                {/* Optional: Recent Orders Section */}
                <div className="mt-4 text-start">
                  <h6>Recent Activity:</h6>
                  <ul className="list-unstyled">
                    <li><small>You don't have any orders yet.</small></li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column gap-2 mt-4">
                  <Link to="/cart" className="btn btn-outline-dark">
                    View Cart
                  </Link>
                  <Link to="/orders" className="btn btn-outline-secondary">
                    My Orders
                  </Link>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;