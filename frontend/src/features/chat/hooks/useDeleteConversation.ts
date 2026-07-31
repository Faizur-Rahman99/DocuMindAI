import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    deleteConversation,
} from "../api/conversationApi";

export function useDeleteConversation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteConversation,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["conversations"],
            });

        },

    });

}