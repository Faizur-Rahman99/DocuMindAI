import { useMutation } from "@tanstack/react-query";

import { askQuestion } from "../api/chatApi";

export function useChat() {

    return useMutation({

        mutationFn: askQuestion,

    });

}