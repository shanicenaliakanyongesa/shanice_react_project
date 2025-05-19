import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on load
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/"; // Reload to reflect changes immediately
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-3 text-danger">
          <span className="text-dark">Gym</span>
          <span className="text-danger">Extreme Essentials</span>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links & Buttons */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link fw-semibold text-dark">
                Products
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/aboutus" className="nav-link fw-semibold text-dark">
                About Us
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/addproduct" className="nav-link fw-semibold text-dark">
                Add Product
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/cart" className="nav-link fw-semibold text-dark">
                Cart
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          {!isLoggedIn ? (
            <div className="d-flex gap-2">
              <Link
                to="/signin"
                className="btn btn-outline-dark px-4 py-2 rounded-pill"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-danger px-4 py-2 text-white rounded-pill"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle px-4 py-2 rounded-pill"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.username || "Account"}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                {user?.isAdmin && (
                  <li className="nav-item me-3">
                    <Link
                      to="/admin/dashboard"
                      className="nav-link fw-semibold text-dark"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/orders">
                    My Orders
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
