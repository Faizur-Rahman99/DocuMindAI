import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type {
    ReactNode,
} from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [token, setToken] =
    useState<string | null>(null);

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        const savedToken =
            localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
        }

        setLoading(false);

    }, []);

    function login(token: string) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}