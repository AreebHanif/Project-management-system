import { Outlet } from "react-router";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    // <Navigate to="/login" replace />
    <div className="text-center">You are not authorized to view this page.😒</div>
  );
}

export default AdminRoute;
