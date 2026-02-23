import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminHeader from "../../../Components/Admin/AdminHeader/AdminHeader";
import "./AdminLayout.css";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";

function AdminLayout() {
  const { user } = useContext(StoreContext);

  // Check if user is admin
  const isAdmin = user && (user.role === 'admin' || user.email === "admin@gmail.com");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

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
