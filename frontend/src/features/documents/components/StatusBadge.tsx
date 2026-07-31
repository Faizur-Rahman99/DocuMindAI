interface Props {
    status: string;
}

export default function StatusBadge({
    status,
}: Props) {

    const colors: Record<string, string> = {
        READY: "bg-green-100 text-green-700",
        PROCESSING: "bg-yellow-100 text-yellow-700",
        FAILED: "bg-red-100 text-red-700",
        UPLOADED: "bg-blue-100 text-blue-700",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
                colors[status] ??
                "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>
    );
}