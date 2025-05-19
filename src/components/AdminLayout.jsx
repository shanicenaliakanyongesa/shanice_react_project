import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="p-4 bg-light" style={{ marginLeft: "250px", width: "100%" }}>
        <Outlet /> {/* Dynamic content will be rendered here */}
      </div>
    </div>
  );
};

export default AdminLayout;