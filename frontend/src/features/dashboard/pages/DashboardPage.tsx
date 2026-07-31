export default function DashboardPage() {

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Welcome back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your documents and chat with your AI assistant.
                </p>

            </div>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        Documents
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        📄
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        Conversations
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        💬
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <h3 className="text-gray-500">
                        AI Model
                    </h3>

                    <p className="text-xl font-semibold mt-3">
                        Llama 3.2
                    </p>

                </div>

            </div>

        </div>

    );

}