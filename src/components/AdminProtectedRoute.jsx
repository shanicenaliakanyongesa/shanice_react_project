import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    // Simulate checking if admin is logged in via localStorage or context
    const adminData = localStorage.getItem("admin");

    if (adminData) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin/signin" />;
};

export default AdminProtectedRoute;