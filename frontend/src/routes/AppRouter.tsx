import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import HomeRedirect from "./HomeRedirect";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";
import ChatPage from "../features/chat/pages/ChatPage";
import SettingsPage from "../features/settings/pages/SettingsPage";


export default function AppRouter() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        index
                        element={<DashboardPage />}
                    />

                    <Route
                        path="documents"
                        element={<DocumentsPage />}
                    />

                    <Route
                        path="chat"
                        element={<ChatPage />}
                    />

                    <Route
                        path="settings"
                        element={<SettingsPage />}
                    />

                </Route>

                <Route
                    path="/"
                    element={<HomeRedirect />}
                />

            </Routes>

        </BrowserRouter>
    );

}