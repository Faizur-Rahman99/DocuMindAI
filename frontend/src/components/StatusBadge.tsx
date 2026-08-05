interface Props {
    status: string;
}

export default function StatusBadge({
    status,
}: Props) {

    const config = {

        READY: {
            label: "🟢 Ready",
            className:
                "bg-green-100 text-green-700",
        },

        PROCESSING: {
            label: "🟡 Processing",
            className:
                "bg-yellow-100 text-yellow-700",
        },

        FAILED: {
            label: "🔴 Failed",
            className:
                "bg-red-100 text-red-700",
        },

    };

    const current =
        config[status as keyof typeof config] ?? {

            label: status,

            className:
                "bg-gray-100 text-gray-600",

        };

    return (

        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${current.className}`}
        >

            {current.label}

        </span>

    );

}