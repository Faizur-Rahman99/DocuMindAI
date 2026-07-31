import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/context/AuthContext";

import "./index.css";
// import "github-markdown-css/github-markdown.css";
import App from "./App";
import { queryClient } from "./api/queryClient";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>

                <App />

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                    }}
                />

            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);