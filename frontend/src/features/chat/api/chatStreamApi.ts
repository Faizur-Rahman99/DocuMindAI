import { api } from "../../../api/api";

import type { ChatRequest } from "../types/chat";

export async function streamChat(
    data: ChatRequest,
    onChunk: (chunk: string) => void,
) {

    const response = await fetch(
        `${api.defaults.baseURL}/chat/stream`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

            body: JSON.stringify(data),
        },
    );

    if (!response.body) {
        throw new Error("Streaming not supported.");
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    while (true) {

        const { done, value } =
            await reader.read();

        if (done) break;

        onChunk(
            decoder.decode(value, { stream: true }),
        );

    }

    const remaining = decoder.decode();

    if (remaining) {
        onChunk(remaining);
}

}