import type { Document } from "../types/document";
import StatusBadge from "./StatusBadge";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

interface Props {
    document: Document;
}

export default function DocumentCard({
    document,
}: Props) {

    const deleteMutation = useDeleteDocument();

    return (

        <div className="bg-white rounded-xl shadow border p-5">

            <div className="flex justify-between items-center">

                <div>

                    <h3 className="font-semibold text-lg">
                        📄 {document.original_filename}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {Math.round(
                            document.file_size / 1024
                        )} KB
                    </p>

                </div>

                <StatusBadge
                    status={document.status}
                />

            </div>

            <div className="mt-5 flex gap-3">

                <button
                className="
                    border
                    border-red-300
                    text-red-600
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-50
                    transition
                "
                    disabled={deleteMutation.isPending}
                    onClick={() => {

                        const confirmed = window.confirm(
                            `Delete "${document.original_filename}"?`,
                        );

                        if (!confirmed) return;

                        deleteMutation.mutate(document.id);

                    }}
                >
                    {deleteMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                </button>

            </div>

        </div>

    );
}