import { api } from "../../../api/api";

import type { Document } from "../types/document";

export async function getDocuments() {
    const response = await api.get<Document[]>("/documents");

    return response.data;
}

export async function uploadDocument(
    file: File,
) {
    const formData = new FormData();

    formData.append(
        "file",
        file,
    );

    const response = await api.post<Document>(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        },
    );

    return response.data;
}

export async function deleteDocument(
    documentId: number,
) {

    await api.delete(
        `/documents/${documentId}`
    );

}