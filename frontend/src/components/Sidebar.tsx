import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../features/auth/context/AuthContext";

export default function Sidebar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block rounded-lg px-4 py-3 transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
        }`;

    return (

        <aside className="w-72 bg-slate-900 text-white flex flex-col">

            <div className="p-6">

                <h1 className="text-3xl font-bold">
                    DocuMindAI
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    Enterprise AI Assistant
                </p>

            </div>

            <nav className="flex-1 px-4 space-y-2">

                <NavLink
                    to="/dashboard"
                    end
                    className={linkClass}
                >
                    🏠 Dashboard
                </NavLink>

                <NavLink
                    to="/dashboard/documents"
                    className={linkClass}
                >
                    📄 Documents
                </NavLink>

                <NavLink
                    to="/dashboard/chat"
                    className={linkClass}
                >
                    💬 Chat
                </NavLink>

                <NavLink
                    to="/dashboard/settings"
                    className={linkClass}
                >
                    ⚙️ Settings
                </NavLink>

            </nav>

            <div className="p-4 border-t border-slate-800">

                <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-600 py-3 hover:bg-red-700 transition"
                >
                    Logout
                </button>

            </div>

        </aside>

    );

}