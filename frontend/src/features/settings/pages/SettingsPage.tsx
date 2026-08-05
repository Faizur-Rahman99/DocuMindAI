import { useSettings } from "../hooks/useSettings";

export default function SettingsPage() {

    const {
        data,
        isLoading,
    } = useSettings();

    if (isLoading) {

        return (
            <div className="p-6">
                Loading...
            </div>
        );

    }

    if (!data) return null;

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your account and AI configuration.
                </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Account */}

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        👤 Account
                    </h2>

                    <div className="space-y-4">

                        <SettingRow
                            label="Email"
                            value={data.account.email}
                        />

                        <SettingRow
                            label="Username"
                            value={data.account.username}
                        />

                        <SettingRow
                            label="Status"
                            value={
                                data.account.active
                                    ? "Active"
                                    : "Inactive"
                            }
                        />

                        <SettingRow
                            label="Member Since"
                            value={
                                new Date(
                                    data.account.member_since,
                                ).toLocaleDateString()
                            }
                        />

                    </div>

                </div>

                {/* AI */}

                <div className="bg-white rounded-xl shadow border p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        🤖 AI Configuration
                    </h2>

                    <div className="space-y-4">

                        <SettingRow
                            label="Provider"
                            value={data.ai.provider}
                        />

                        <SettingRow
                            label="LLM"
                            value={data.ai.model}
                        />

                        <SettingRow
                            label="Embedding Model"
                            value={data.ai.embedding_model}
                        />

                        <SettingRow
                            label="Retrieval"
                            value={data.ai.retrieval}
                        />

                        <SettingRow
                            label="Streaming"
                            value={
                                data.ai.streaming
                                    ? "Enabled"
                                    : "Disabled"
                            }
                        />

                    </div>

                </div>

            </div>

            {/* System */}

            <div className="bg-white rounded-xl shadow border p-6">

                <h2 className="text-xl font-semibold mb-5">
                    📚 Project Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    <SettingRow
                        label="Application"
                        value={data.system.application}
                    />

                    <SettingRow
                        label="Version"
                        value={data.system.version}
                    />

                    <SettingRow
                        label="Backend"
                        value={data.system.backend}
                    />

                    <SettingRow
                        label="Frontend"
                        value={data.system.frontend}
                    />

                    <SettingRow
                        label="Database"
                        value={data.system.database}
                    />

                    <SettingRow
                        label="Vector Database"
                        value={data.system.vector_database}
                    />

                </div>

            </div>

        </div>

    );

}

interface RowProps {

    label: string;

    value: string;

}

function SettingRow({

    label,

    value,

}: RowProps) {

    return (

        <div className="flex justify-between border-b pb-2">

            <span className="text-gray-500">

                {label}

            </span>

            <span className="font-medium">

                {value}

            </span>

        </div>

    );

}