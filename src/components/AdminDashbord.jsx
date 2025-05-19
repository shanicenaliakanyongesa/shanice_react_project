import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  // Load admin from localStorage
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      window.location.href = "/admin/signin";
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/signin";
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 rounded-3 p-4">
            <h2 className="text-center">Welcome, {admin?.username} 👋</h2>
            <p className="text-muted text-center">Manage your store below:</p>

            <div className="row mt-4 g-3">
              <div className="col-md-4">
                <Link to="/admin/products" className="btn btn-outline-dark w-100 py-4">
                  <i className="fas fa-boxes fs-4 d-block mb-2"></i>
                  Manage Products
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin/orders" className="btn btn-outline-secondary w-100 py-4">
                  <i className="fas fa-shopping-cart fs-4 d-block mb-2"></i>
                  View Orders
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin/users" className="btn btn-outline-info w-100 py-4">
                  <i className="fas fa-users fs-4 d-block mb-2"></i>
                  Manage Users
                </Link>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-end">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;