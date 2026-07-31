import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadDocument } from "../api/documentApi";

export function useUploadDocument() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: uploadDocument,

        onSuccess: () => {

            toast.success("Document uploaded.");

            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });

        },

        onError: () => {

            toast.error("Upload failed.");

        },

    });

}