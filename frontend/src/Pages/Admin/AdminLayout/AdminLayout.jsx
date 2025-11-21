import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminHeader from "../../../Components/Admin/AdminHeader/AdminHeader";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
