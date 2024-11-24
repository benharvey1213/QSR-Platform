import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/login" }) => {
    const { token } = useContext(AuthContext);

    console.log("tokennnn", token)

    if (!token) {
        return <Navigate to={redirectTo} />
    }

    return <Outlet />
}

export default ProtectedRoute;