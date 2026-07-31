import { useDocuments } from "../hooks/useDocuments";
import DocumentCard from "./DocumentCard";

export default function DocumentList() {
    const {
        data,
        isLoading,
    } = useDocuments();

    if (isLoading) {
        return <p>Loading documents...</p>;
    }

    if (!data || data.length === 0) {

        return (

            <div className="text-center py-12">

                <div className="text-6xl mb-4">
                    📄
                </div>

                <h3 className="text-xl font-semibold">
                    No documents yet
                </h3>

                <p className="text-gray-500 mt-2">
                    Upload a PDF or TXT file to start chatting with your documents.
                </p>

            </div>

        );

    }

    return (
        <div className="space-y-4">

            {data.map((document) => (

                <DocumentCard
                    key={document.id}
                    document={document}
                />

            ))}

        </div>
    );
}