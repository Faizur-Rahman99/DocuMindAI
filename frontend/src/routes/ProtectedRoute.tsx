import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "../features/auth/context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const {
        isAuthenticated,
        loading,
    } = useAuth();

    if (loading) {

        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}