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

            toast.success("Welcome back 👋");

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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-10"
            >

                <div className="text-center mb-8">

                    <div className="text-5xl mb-4">
                        🤖
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900">
                        DocuMindAI
                    </h1>

                    <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                        AI-powered document intelligence platform.
                        Upload documents, search knowledge,
                        and chat with your private AI assistant.
                    </p>

                </div>

                <div className="space-y-5">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-100
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-100
                        "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-blue-600
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            hover:shadow-lg
                            disabled:bg-slate-300
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </div>

                <div className="mt-8 border-t pt-5 text-center">

                    <p className="text-xs text-slate-500">
                        Powered by
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                        FastAPI • React • PostgreSQL • pgvector • Ollama
                    </p>

                </div>

            </form>

        </div>
    );
}