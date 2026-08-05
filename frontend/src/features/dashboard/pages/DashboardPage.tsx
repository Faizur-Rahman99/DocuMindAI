import { useDashboardDocuments } from "../hooks/useDashboardDocuments";
import { useDashboardConversations } from "../hooks/useDashboardConversations";
import StatusBadge from "../../../components/StatusBadge";

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

    const failedCount =
        documents.filter(
            (document) => document.status === "FAILED",
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
                    Your AI document intelligence workspace.
                    Upload documents, manage conversations,
                    and interact with your private knowledge base.
                </p>

            </div>

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-3">

                {/* Documents */}

                <div className="bg-white rounded-xl shadow border p-6 h-full">

                    <h3 className="text-gray-500 font-medium">
                        📄 Documents
                    </h3>

                    <p className="text-3xl font-bold mt-4">

                        {loadingDocuments
                            ? "..."
                            : documents.length}

                    </p>

                    <div className="mt-5 space-y-2 text-sm">

                        <div className="flex justify-between">

                            <span>
                                🟢 Ready
                            </span>

                            <span className="font-semibold">

                                {readyCount}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                🟡 Processing
                            </span>

                            <span className="font-semibold">

                                {processingCount}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                🔴 Failed
                            </span>

                            <span className="font-semibold">

                                {failedCount}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Conversations */}

                <div className="bg-white rounded-xl shadow border p-6 h-full">

                    <h3 className="text-gray-500 font-medium">
                        💬 Conversations
                    </h3>

                    <p className="text-3xl font-bold mt-4">

                        {loadingConversations
                            ? "..."
                            : conversations.length}

                    </p>

                    <p className="text-sm text-gray-500 mt-5">

                        AI conversations stored securely
                        in your workspace.

                    </p>

                </div>

                {/* AI */}

                <div className="bg-white rounded-xl shadow border p-6 h-full">

                    <h3 className="text-gray-500 font-medium">
                        🤖 AI Assistant
                    </h3>

                    <div className="mt-4 space-y-3">

                        <div className="flex justify-between">

                            <span>
                                Provider
                            </span>

                            <span className="font-medium">

                                Ollama

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                LLM Model
                            </span>

                            <span className="font-medium">

                                Llama 3.2

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                Embedding
                            </span>

                            <span className="font-medium">

                                MiniLM-L6-v2

                            </span>

                        </div>

                        <div className="flex justify-between items-center">

                            <span>
                                Status
                            </span>

                            <StatusBadge
                                status="READY"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Activity */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Documents */}

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-5">

                        Recent Documents

                    </h2>

                    {recentDocuments.length === 0 ? (

                        <div className="py-12 text-center text-gray-500">

                            <div className="text-5xl mb-4">

                                📂

                            </div>

                            <p className="font-medium">

                                No documents uploaded yet

                            </p>

                            <p className="text-sm mt-2">

                                Upload your first document
                                to build your AI knowledge base.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {recentDocuments.map((document) => (

                                <div
                                    key={document.id}
                                    className="flex justify-between items-center border-b pb-3"
                                >

                                    <div>

                                        <p className="font-medium">

                                            {document.original_filename}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            Uploaded{" "}
                                            {new Date(
                                                document.created_at,
                                            ).toLocaleDateString()}

                                        </p>

                                    </div>

                                    <StatusBadge
                                        status={document.status}
                                    />

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* Conversations */}

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-5">

                        Recent Conversations

                    </h2>

                    {recentConversations.length === 0 ? (

                        <div className="py-12 text-center text-gray-500">

                            <div className="text-5xl mb-4">

                                💬

                            </div>

                            <p className="font-medium">

                                No conversations yet

                            </p>

                            <p className="text-sm mt-2">

                                Start chatting with your documents.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {recentConversations.map((conversation) => (

                                <div
                                    key={conversation.id}
                                    className="border-b pb-3"
                                >

                                    <p className="font-medium">

                                        {conversation.title}

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {new Date(
                                            conversation.created_at,
                                        ).toLocaleDateString()}

                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}