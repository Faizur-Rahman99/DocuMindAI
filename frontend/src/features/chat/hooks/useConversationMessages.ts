import { useQuery } from "@tanstack/react-query";

import {
    getConversationMessages,
} from "../api/conversationApi";

export function useConversationMessages(
    conversationId?: number,
) {

    return useQuery({

        queryKey: [
            "conversation",
            conversationId,
        ],

        queryFn: () =>
            getConversationMessages(
                conversationId!,
            ),

        enabled:
            conversationId !== undefined,

    });

}