import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteDocument } from "../api/documentApi";

export function useDeleteDocument() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteDocument,

        onSuccess: () => {

            toast.success(
                "Document deleted."
            );

            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });

        },

        onError: () => {

            toast.error(
                "Delete failed."
            );

        },

    });

}