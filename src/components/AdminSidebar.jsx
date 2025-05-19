import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar d-flex flex-column p-3 bg-dark text-white" style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      <h4 className="text-center mb-4">Admin Panel</h4>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin/dashboard" className="nav-link text-white rounded-3 py-2 px-3">
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/products" className="nav-link text-white rounded-3 py-2 px-3">
            <i className="fas fa-box-open me-2"></i>Manage Products
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/orders" className="nav-link text-white rounded-3 py-2 px-3">
            <i className="fas fa-shopping-cart me-2"></i>View Orders
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/users" className="nav-link text-white rounded-3 py-2 px-3">
            <i className="fas fa-users me-2"></i>Manage Users
          </Link>
        </li>
        <li className="nav-item mt-auto pt-4">
          <Link to="/profile" className="nav-link text-white rounded-3 py-2 px-3">
            <i className="fas fa-user-circle me-2"></i>Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/signin" className="nav-link text-danger rounded-3 py-2 px-3">
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;