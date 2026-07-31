import { api } from "../../../api/api";

import type {
    ChatRequest,
    ChatResponse,
} from "../types/chat";

export async function askQuestion(
    data: ChatRequest,
) {

    const response =
        await api.post<ChatResponse>(
            "/chat",
            data,
        );

    return response.data;

}