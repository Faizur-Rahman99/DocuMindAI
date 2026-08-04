import { Link } from "react-router-dom";

import { useDashboardDocuments } from "../hooks/useDashboardDocuments";
import { useDashboardConversations } from "../hooks/useDashboardConversations";

export default function DashboardPage() {

    const {
        data: documents = [],
        isLoading: loadingDocuments,
    } = useDashboardDocuments();

    const {
        data: conversations = [],
        isLoading: loadingConversations,
    } = useDashboardConversations();

    const readyCount =
        documents.filter(
            (document) => document.status === "READY",
        ).length;

    const processingCount =
        documents.filter(
            (document) => document.status === "PROCESSING",
        ).length;

    const recentDocuments =
        [...documents].slice(0, 5);

    const recentConversations =
        [...conversations].slice(0, 5);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Welcome back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your AI knowledge base.
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        Documents
                    </h3>

                    <p className="text-3xl font-bold mt-4">
                        {loadingDocuments
                            ? "..."
                            : documents.length}
                    </p>

                    <div className="mt-4 text-sm space-y-1">

                        <p>
                            ✅ Ready: {readyCount}
                        </p>

                        <p>
                            ⏳ Processing: {processingCount}
                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        Conversations
                    </h3>

                    <p className="text-3xl font-bold mt-4">
                        {loadingConversations
                            ? "..."
                            : conversations.length}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        AI Model
                    </h3>

                    <p className="text-xl font-semibold mt-4">
                        Llama 3.2
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Hybrid Search Enabled
                    </p>

                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Documents
                    </h2>

                    <div className="space-y-3">

                        {recentDocuments.length === 0 && (
                            <p className="text-gray-500">
                                No documents uploaded.
                            </p>
                        )}

                        {recentDocuments.map((document) => (

                            <div
                                key={document.id}
                                className="flex justify-between items-center"
                            >

                                <span>
                                    📄 {document.original_filename}
                                </span>

                                <span
                                    className={
                                        document.status === "READY"
                                            ? "text-green-600 text-sm font-medium"
                                            : "text-yellow-600 text-sm font-medium"
                                    }
                                >
                                    {document.status}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Conversations
                    </h2>

                    <div className="space-y-3">

                        {recentConversations.length === 0 && (
                            <p className="text-gray-500">
                                No conversations yet.
                            </p>
                        )}

                        {recentConversations.map((conversation) => (

                            <div
                                key={conversation.id}
                            >
                                💬 {conversation.title}
                            </div>

                        ))}

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow border p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Quick Actions
                </h2>

                <div className="flex gap-4">

                    <Link
                        to="/documents"
                        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
                    >
                        Upload Document
                    </Link>

                    <Link
                        to="/chat"
                        className="rounded-lg border px-5 py-3 hover:bg-gray-50 transition"
                    >
                        New Chat
                    </Link>

                </div>

            </div>

        </div>

    );

}