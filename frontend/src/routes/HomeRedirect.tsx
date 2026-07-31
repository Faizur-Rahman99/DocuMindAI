import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

export default function HomeRedirect() {

    const {
        isAuthenticated,
        loading,
    } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <Navigate
            to={isAuthenticated ? "/dashboard" : "/login"}
            replace
        />
    );
}