import { useQuery } from "@tanstack/react-query";

import { getDocuments } from "../api/documentApi";

export function useDocuments() {

    return useQuery({

        queryKey: ["documents"],

        queryFn: getDocuments,

        refetchInterval: (query) => {

            const documents = query.state.data;

            if (!documents) return false;

            const hasProcessingDocuments =
                documents.some(
                    (document) =>
                        document.status === "PROCESSING",
                );

            return hasProcessingDocuments
                ? 2000
                : false;

        },

    });

}