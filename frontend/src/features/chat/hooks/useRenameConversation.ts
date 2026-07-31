import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    renameConversation,
} from "../api/conversationApi";

export function useRenameConversation() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            title,
        }: {
            id: number;
            title: string;
        }) =>
            renameConversation(
                id,
                title,
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["conversations"],
            });

        },

    });

}