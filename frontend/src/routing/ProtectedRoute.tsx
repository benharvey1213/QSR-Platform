import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
    redirectTo?: string;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ redirectTo = "/login" }) => {
    const authContext = useContext(AuthContext);

    console.log('authContext', authContext)

    if (authContext?.token) {
        return <Outlet />
    }
    else {
        return <Navigate to={redirectTo} />
    }
}

export default ProtectedRoute;