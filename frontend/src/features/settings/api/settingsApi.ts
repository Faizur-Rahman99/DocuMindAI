import { api } from "../../../api/api";

export interface SettingsResponse {
    account: {
        email: string;
        username: string;
        active: boolean;
        member_since: string;
    };

    ai: {
        provider: string;
        model: string;
        embedding_model: string;
        retrieval: string;
        streaming: boolean;
        chunk_size: number;
        chunk_overlap: number;
    };

    system: {
        application: string;
        version: string;
        backend: string;
        frontend: string;
        database: string;
        vector_database: string;
    };
}

export async function getSettings() {

    const response =
        await api.get<SettingsResponse>(
            "/settings",
        );

    return response.data;

}