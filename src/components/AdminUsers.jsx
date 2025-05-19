import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://manuel254.pythonanywhere.com/api/admin/users ");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
    }
  };

  return (
    <div className="container py-5">
      <h2>Manage Users</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default AdminUsers;