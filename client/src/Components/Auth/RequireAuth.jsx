import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Loader/> // Or return a loading spinner/component
    }

    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to="/denied" />
    ) : (
        <Navigate to="/login" />
    );
}

export default RequireAuth;
