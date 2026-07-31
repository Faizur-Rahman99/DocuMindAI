import { streamChat } from "../api/chatStreamApi";

export function useChatStream() {

    return {

        mutateAsync: streamChat,

    };

}