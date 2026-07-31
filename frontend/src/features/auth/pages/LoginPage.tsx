import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../../../api/errorHandler";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const {
        login,
        isAuthenticated,
        loading: authLoading,
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        setLoading(true);


        try {
            const response = await loginApi({
                email,
                password,
            });

            login(response.access_token);

            toast.success("Welcome back!");

            navigate("/dashboard");

        } catch (err) {
            console.error(err);

            const message = getErrorMessage(err);

            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    if (authLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-lg p-8 w-96 space-y-5"
            >

                <h1 className="text-3xl font-bold text-center">
                    DocuMindAI
                </h1>

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="w-full border rounded-lg p-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                

                <button
                    className="bg-blue-600 text-white w-full rounded-lg p-3 hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>

        </div>
    );
}