import { Outlet } from "react-router";
import { useSelector } from "react-redux";

function UserRoute() {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo && !userInfo.isAdmin ? (
        <Outlet />
    ) : (
        // <Navigate to="/login" replace />
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-red-500">
                Access Denied! You are not authorized to view this page.
            </h1>
        </div>
    );
}

export default UserRoute;
