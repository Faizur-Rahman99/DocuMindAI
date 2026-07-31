import { api } from "../../../api/api";

export interface Conversation {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

export async function getConversations() {
    const response = await api.get<Conversation[]>(
        "/conversations",
    );

    return response.data;
}

export async function renameConversation(
    id: number,
    title: string,
) {
    const response = await api.patch(
    `/conversations/${id}`,
        {
            title,
        },
    );

    return response.data;
}

export async function deleteConversation(
    id: number,
) {
    await api.delete(
    `/conversations/${id}`,
);
}

export interface ChatMessage {

    role: "user" | "assistant";

    content: string;

}

export async function getConversationMessages(
    conversationId: number,
) {

    const response = await api.get<ChatMessage[]>(
        `/chat/conversations/${conversationId}/messages`,
    );

    return response.data;

}

export async function createConversation() {

    const response = await api.post(
        "/conversations",
    );

    return response.data;

}